/* =========================================================
   La Trampa — motor
   Vanilla JS. Sin dependencias, sin build, sin fetch().
   Las lecciones se cargan inyectando <script>, para que la web
   funcione también abriendo index.html con doble clic (file://).
   ========================================================= */

(function () {
'use strict';

/* =========================================================
   0. Acceso
   Vive en assets/auth.js. Lee la cabecera de ese archivo antes
   de dar por hecho que esto protege algo: es una cerradura para
   separar perfiles, no seguridad.
   ========================================================= */

var Auth = window.LT_AUTH;

/* =========================================================
   1. Almacenamiento: localStorage con fallback a memoria
   ========================================================= */

/* El progreso de cada cuenta vive en su propia clave:
   latrampa.v1.adm1, latrampa.v1.adm2… KEY se fija al abrir sesión.
   latrampa.v1 a secas es la clave antigua, de antes del login. */
var LEGACY_KEY = 'latrampa.v1';
var KEY = null;

var DEFAULTS = { done:{}, xp:0, streak:0, last:null, missed:[], trophies:[] };

/* Version del esquema del progreso.
   REGLA QUE NO SE ROMPE: la clave de localStorage NO cambia nunca.
   Si el esquema evoluciona, se sube SCHEMA y se anade un paso en
   migrate(), que solo puede anadir campos o corregirlos. Nunca borrar.
   Cambiar la clave equivaldria a borrarle el progreso a todo el mundo. */
var SCHEMA = 3;

var storageOK = (function () {
  try {
    var probe = '__lt_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return true;
  } catch (e) {
    return false;
  }
})();

var memory = null;          /* fallback cuando localStorage está bloqueado */
var warnedStorage = false;

function normalizeState(raw) {
  var s = {};
  raw = (raw && typeof raw === 'object') ? raw : {};
  s.v       = typeof raw.v === 'number' ? raw.v : 1;
  s.done    = (raw.done && typeof raw.done === 'object') ? raw.done : {};
  s.xp      = typeof raw.xp === 'number' && isFinite(raw.xp) ? raw.xp : 0;
  s.streak  = typeof raw.streak === 'number' && isFinite(raw.streak) ? raw.streak : 0;
  s.last    = typeof raw.last === 'string' ? raw.last : null;
  s.missed  = Object.prototype.toString.call(raw.missed) === '[object Array]' ? raw.missed : [];
  s.trophies = Object.prototype.toString.call(raw.trophies) === '[object Array]' ? raw.trophies : [];
  s.exams   = (raw.exams && typeof raw.exams === 'object') ? raw.exams : {};
  return migrate(s);
}

/* Sube un progreso viejo al esquema actual sin perder nada.
   Cada paso solo anade o corrige; ninguno borra. */
function migrate(s) {
  if (s.v < 2) {
    /* v1 no guardaba la version. No hay nada que convertir: solo se sella. */
    s.v = 2;
  }
  if (s.v < 3) {
    /* v3 anade los simulacros. Los dias no se tocan. */
    if (!s.exams) s.exams = {};
    s.v = 3;
  }
  /* futuros pasos: if (s.v < 4) { ...; s.v = 4; } */
  s.v = SCHEMA;
  return s;
}

/* ---------- copia de seguridad ---------- */

/* Une dos progresos quedandose con lo mejor de cada uno.
   Sirve para restaurar una copia sin machacar lo que ya hay,
   y para juntar el progreso del movil con el del ordenador. */
function mergeState(a, b) {
  a = normalizeState(a);
  b = normalizeState(b);
  var out = normalizeState(null);

  var dias = {}, k;
  for (k in a.done) if (a.done.hasOwnProperty(k)) dias[k] = 1;
  for (k in b.done) if (b.done.hasOwnProperty(k)) dias[k] = 1;
  for (k in dias) {
    var da = a.done[k], db = b.done[k];
    if (!da) { out.done[k] = db; continue; }
    if (!db) { out.done[k] = da; continue; }
    out.done[k] = {
      score: Math.max(da.score || 0, db.score || 0),
      xp: Math.max(da.xp || 0, db.xp || 0),
      date: (da.date || '') > (db.date || '') ? da.date : db.date
    };
  }

  /* el XP no se suma: duplicaria lo ganado en los dias comunes */
  out.xp = Math.max(a.xp, b.xp);
  out.streak = Math.max(a.streak, b.streak);
  out.last = (a.last || '') > (b.last || '') ? a.last : b.last;

  var vistos = {};
  out.missed = [];
  [].concat(b.missed, a.missed).forEach(function (m) {
    if (!m || !m.id || vistos[m.id]) return;
    vistos[m.id] = 1;
    out.missed.push(m);
  });
  if (out.missed.length > MISSED_CAP) out.missed = out.missed.slice(0, MISSED_CAP);

  out.trophies = [];
  [].concat(a.trophies, b.trophies).forEach(function (t) {
    if (out.trophies.indexOf(t) === -1) out.trophies.push(t);
  });

  /* simulacros: por examen y por parte, gana la mejor nota */
  out.exams = {};
  [a.exams, b.exams].forEach(function (src) {
    for (var ex in src) {
      if (!src.hasOwnProperty(ex)) continue;
      if (!out.exams[ex]) out.exams[ex] = {};
      for (var p in src[ex]) {
        if (!src[ex].hasOwnProperty(p)) continue;
        var prev = out.exams[ex][p];
        if (!prev || (src[ex][p].score || 0) > (prev.score || 0)) out.exams[ex][p] = src[ex][p];
      }
    }
  });

  return out;
}

function exportProgress() {
  var user = Auth.current();
  var payload = {
    app: 'la-trampa',
    schema: SCHEMA,
    user: user ? user.id : null,
    exported: todayISO(),
    progress: S
  };
  var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'la-trampa-' + (user ? user.id : 'progreso') + '-' + todayISO() + '.json';
  document.body.appendChild(a);
  a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); a.parentNode.removeChild(a); }, 1000);
}

function importProgress(file, done) {
  var reader = new FileReader();
  reader.onload = function () {
    var data;
    try { data = JSON.parse(reader.result); }
    catch (e) { done('El archivo no es una copia válida de La Trampa.'); return; }

    var prog = data && (data.progress || data);
    if (!prog || typeof prog !== 'object' || !prog.done) {
      done('El archivo no contiene ningún progreso reconocible.');
      return;
    }

    var antes = doneCount();
    S = mergeState(S, prog);
    commit();
    var despues = doneCount();
    done(null, {
      dias: despues,
      nuevos: despues - antes,
      de: data.user || 'otra cuenta'
    });
  };
  reader.onerror = function () { done('No se pudo leer el archivo.'); };
  reader.readAsText(file);
}

function loadState() {
  if (storageOK && KEY) {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) return normalizeState(JSON.parse(raw));
    } catch (e) {
      console.warn('[La Trampa] No se pudo leer el progreso guardado:', e);
    }
  }
  if (memory) return normalizeState(memory);
  return normalizeState(null);
}

function saveState(s) {
  memory = s;
  if (!storageOK || !KEY) return false;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
    return true;
  } catch (e) {
    if (!warnedStorage) {
      warnedStorage = true;
      console.warn('[La Trampa] El progreso no se puede guardar en este navegador. Se mantiene solo en memoria.', e);
    }
    return false;
  }
}

var S = normalizeState(null);   /* vacío hasta que se abre sesión */

function commit() { saveState(S); paintStats(); }

/* Progreso de antes de que hubiera login: lo adopta la primera
   cuenta que entre, y después se retira la clave vieja para que
   no vuelva a aplicarse a la segunda. */
function adoptLegacyProgress() {
  if (!storageOK || !KEY) return;
  try {
    var legacy = window.localStorage.getItem(LEGACY_KEY);
    if (!legacy) return;
    if (!window.localStorage.getItem(KEY)) window.localStorage.setItem(KEY, legacy);
    window.localStorage.removeItem(LEGACY_KEY);
  } catch (e) {}
}

function openSession(user) {
  KEY = 'latrampa.v1.' + user.id;
  memory = null;
  adoptLegacyProgress();
  S = loadState();
  /* loadState ya ha migrado en memoria; esto deja la migración
     escrita, para no repetirla en cada arranque */
  saveState(S);
  paintSession();
  paintStats();
}

function closeSession() {
  Auth.logout();
  KEY = null;
  memory = null;
  S = normalizeState(null);
  run = null;
  review = null;
  dayCache = {};
  paintSession();
}

/* =========================================================
   2. Utilidades
   ========================================================= */

function el(tag, cls, text) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function frag() { return document.createDocumentFragment(); }

function isArr(x) { return Object.prototype.toString.call(x) === '[object Array]'; }

function pad2(n) { return (n < 10 ? '0' : '') + n; }

/* normaliza una respuesta escrita: minúsculas, sin puntuación, espacios colapsados */
function norm(s) {
  return String(s == null ? '' : s)
    .toLowerCase()
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[.,!?;:"()\[\]¡¿…]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function words(s) { var t = norm(s); return t ? t.split(' ') : []; }

/* Cuenta como cuenta Cambridge en las transformaciones: una
   contracción son DOS palabras. "didn't" = did + not, así que
   "didn't need to wait" son cinco, no cuatro. */
function palabrasExamen(s) {
  var t = norm(s);
  if (!t) return 0;
  t = t.replace(/n't\b/g, ' not').replace(/'(s|re|ve|ll|d|m)\b/g, ' $1');
  return t.split(/\s+/).filter(function (w) { return !!w; }).length;
}

function todayISO() { return isoOf(new Date()); }

function isoOf(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }

function yesterdayISO() {
  var d = new Date();
  d.setDate(d.getDate() - 1);
  return isoOf(d);
}

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

/* =========================================================
   3. Currículo
   ========================================================= */

var DAYS     = (window.CURRICULUM && window.CURRICULUM.days)     || [];
var WEEKS    = (window.CURRICULUM && window.CURRICULUM.weeks)    || [];
var TROPHIES = (window.CURRICULUM && window.CURRICULUM.trophies) || [];
var TOTAL    = DAYS.length || 60;

function dayMeta(n) {
  for (var i = 0; i < DAYS.length; i++) if (DAYS[i].n === n) return DAYS[i];
  return null;
}

function weekOf(n) {
  for (var i = 0; i < WEEKS.length; i++) if (n >= WEEKS[i].from && n <= WEEKS[i].to) return WEEKS[i];
  return null;
}

function trophyFor(n) {
  for (var i = 0; i < TROPHIES.length; i++) if (TROPHIES[i].day === n) return TROPHIES[i];
  return null;
}

function isUnlocked(n) { return n === 1 || !!S.done[n - 1]; }

function doneCount() { var c = 0; for (var k in S.done) if (S.done.hasOwnProperty(k)) c++; return c; }

function nextOpenDay() {
  for (var n = 1; n <= TOTAL; n++) if (!S.done[n]) return n;
  return TOTAL;
}

/* =========================================================
   4. Carga de lecciones por inyección de <script>
   ========================================================= */

window.REGISTER_DAY = function (d) { window.__DAY = d; };

var dayCache = {};
var dayPending = {};

function loadDay(n, cb) {
  if (dayCache.hasOwnProperty(n)) { cb(dayCache[n]); return; }
  if (dayPending[n]) { dayPending[n].push(cb); return; }
  dayPending[n] = [cb];

  function settle(day) {
    dayCache[n] = day;
    var list = dayPending[n] || [];
    delete dayPending[n];
    for (var i = 0; i < list.length; i++) list[i](day);
  }

  window.__DAY = null;
  var s = document.createElement('script');
  s.src = 'data/day-' + pad2(n) + '.js';
  s.async = false;
  s.onload = function () {
    var d = window.__DAY;
    window.__DAY = null;
    if (!d || !isArr(d.blocks)) {
      console.warn('[La Trampa] data/day-' + pad2(n) + '.js se cargó pero no registró una lección válida.');
      settle(null);
      return;
    }
    settle(d);
  };
  s.onerror = function () { settle(null); };
  document.head.appendChild(s);
}

/* =========================================================
   4b. Simulacros de examen

   Van por libre: no dependen del recorrido de 60 días ni se
   desbloquean con nada. Se registran igual que las lecciones,
   creando un archivo en data/ y nada más.
   ========================================================= */

var EXAMS = [];
window.REGISTER_EXAM = function (e) {
  if (!e || !e.id) return;
  for (var i = 0; i < EXAMS.length; i++) if (EXAMS[i].id === e.id) { EXAMS[i] = e; return; }
  EXAMS.push(e);
};

function examById(id) {
  for (var i = 0; i < EXAMS.length; i++) if (EXAMS[i].id === id) return EXAMS[i];
  return null;
}

function examScore(examId, partN) {
  return (S.exams && S.exams[examId] && S.exams[examId][partN]) || null;
}

function saveExamPart(examId, partN, score, right, total) {
  if (!S.exams) S.exams = {};
  if (!S.exams[examId]) S.exams[examId] = {};
  var prev = S.exams[examId][partN];
  S.exams[examId][partN] = {
    score: prev ? Math.max(prev.score, score) : score,
    right: right, total: total, date: todayISO()
  };
  commit();
}

/* =========================================================
   5. Voz del navegador (listening y modelos de speaking)
   ========================================================= */

/* Tener la API no significa poder hablar: en muchos equipos
   speechSynthesis existe pero la lista de voces está vacía, y en
   Chrome llega vacía en la primera llamada y se rellena después.
   Por eso hay tres estados y no dos: 'checking', 'ready' y 'none'. */
var Voice = {

  hasApi: ('speechSynthesis' in window) && typeof window.SpeechSynthesisUtterance === 'function',
  state: 'checking',
  voice: null,
  listeners: [],

  pick: function () {
    if (!Voice.hasApi) { Voice.settle('none'); return; }

    var vs = [];
    try { vs = window.speechSynthesis.getVoices() || []; } catch (e) { vs = []; }
    if (!vs.length) return;                 /* aún no han cargado: seguimos esperando */

    var gb = null, en = null, any = null;
    for (var i = 0; i < vs.length; i++) {
      var lang = (vs[i].lang || '').replace('_', '-');
      if (!gb && /^en-GB/i.test(lang)) gb = vs[i];
      if (!en && /^en/i.test(lang)) en = vs[i];
      if (!any) any = vs[i];
    }

    /* Preferimos británico, luego cualquier inglés. Si el equipo no
       tiene ninguna voz inglesa no forzamos otra: leer inglés con una
       voz española no sirve para entrenar el oído. */
    Voice.voice = gb || en || null;
    Voice.accent = gb ? 'británico' : (en ? acentoDe(en.lang) : null);
    Voice.settle(Voice.voice ? 'ready' : 'none');
  },

  settle: function (s) {
    if (Voice.state === s) return;
    Voice.state = s;
    var l = Voice.listeners;
    Voice.listeners = [];
    for (var i = 0; i < l.length; i++) { try { l[i](s); } catch (e) {} }
  },

  /* llama a cb en cuanto se sepa si hay voz o no */
  whenReady: function (cb) {
    if (Voice.state !== 'checking') { cb(Voice.state); return; }
    Voice.listeners.push(cb);
  },

  speak: function (text, rate, onStart, onEnd, onFail) {
    if (Voice.state !== 'ready') { if (onFail) onFail('sin-voz'); if (onEnd) onEnd(); return null; }
    try {
      window.speechSynthesis.cancel();
      var u = new window.SpeechSynthesisUtterance(String(text));
      /* El idioma se toma de la voz elegida. Forzar en-GB en un equipo
         que no tiene voz británica hace que algunos navegadores no
         reproduzcan nada, sin avisar. */
      u.lang = Voice.voice.lang || 'en-GB';
      u.voice = Voice.voice;
      u.rate = rate || 1;
      u.pitch = 1;
      var arrancó = false;
      u.onstart = function () { arrancó = true; if (onStart) onStart(); };
      u.onend = function () { if (onEnd) onEnd(); };
      u.onerror = function (e) {
        /* 'interrupted' y 'canceled' los provocamos nosotros al cambiar de paso */
        var motivo = e && e.error;
        if (motivo !== 'interrupted' && motivo !== 'canceled' && onFail) onFail(motivo || 'error');
        if (onEnd) onEnd();
      };
      window.speechSynthesis.speak(u);

      /* Si en dos segundos no ha arrancado, damos el audio por fallido
         y enseñamos la transcripción: es preferible a un botón mudo. */
      setTimeout(function () {
        if (!arrancó && !window.speechSynthesis.speaking && onFail) onFail('sin-arrancar');
      }, 2000);

      return u;
    } catch (e) {
      console.warn('[La Trampa] speechSynthesis falló:', e);
      if (onFail) onFail('excepción');
      if (onEnd) onEnd();
      return null;
    }
  },

  stop: function () { if (Voice.hasApi) { try { window.speechSynthesis.cancel(); } catch (e) {} } }
};

function acentoDe(lang) {
  lang = String(lang || '').toLowerCase();
  if (lang.indexOf('en-us') === 0) return 'americano';
  if (lang.indexOf('en-au') === 0) return 'australiano';
  if (lang.indexOf('en-ie') === 0) return 'irlandés';
  if (lang.indexOf('en-in') === 0) return 'indio';
  if (lang.indexOf('en-za') === 0) return 'sudafricano';
  if (lang.indexOf('en-ca') === 0) return 'canadiense';
  if (lang.indexOf('en-nz') === 0) return 'neozelandés';
  return 'inglés';
}

if (Voice.hasApi) {
  Voice.pick();
  try { window.speechSynthesis.onvoiceschanged = Voice.pick; } catch (e) {}
  /* Chrome devuelve la lista vacía al principio y a veces no dispara
     onvoiceschanged. Reintentamos un rato y nos rendimos a los 3 s. */
  var intentos = 0;
  var reintento = setInterval(function () {
    if (Voice.state !== 'checking') { clearInterval(reintento); return; }
    Voice.pick();
    if (++intentos >= 12) { clearInterval(reintento); Voice.settle('none'); }
  }, 250);
} else {
  Voice.settle('none');
}

/* =========================================================
   6. Piezas de interfaz reutilizables
   ========================================================= */

var app = document.getElementById('app');

function view(cls) {
  var v = el('div', 'view' + (cls ? ' ' + cls : ''));
  return v;
}

function mount(node) {
  Keys.set(null);
  Voice.stop();
  app.innerHTML = '';
  app.appendChild(node);
  window.scrollTo(0, 0);
}

function paintSession() {
  var user = Auth ? Auth.current() : null;
  var stats = document.getElementById('stats');
  var box = document.getElementById('session');
  var who = document.getElementById('session-who');
  var out = document.getElementById('session-out');

  if (stats) stats.hidden = !user;
  if (box) box.hidden = !user;
  if (who) who.textContent = user ? user.name : '';

  var snd = document.getElementById('session-sound');
  if (snd) {
    var pinta = function () {
      snd.textContent = Sound.on ? '♪' : '✕';
      snd.className = 'session__sound' + (Sound.on ? '' : ' is-off');
      snd.setAttribute('aria-pressed', Sound.on ? 'true' : 'false');
      snd.title = Sound.on ? 'Sonido activado' : 'Sonido desactivado';
      snd.setAttribute('aria-label', snd.title);
    };
    if (!snd.__wired) {
      snd.__wired = true;
      snd.addEventListener('click', function () { Sound.toggle(); pinta(); });
    }
    pinta();
  }
  if (out && !out.__wired) {
    out.__wired = true;
    out.addEventListener('click', function () {
      var u = Auth.current();
      if (!u) return;
      if (!window.confirm('¿Cerrar la sesión de ' + u.name + '?\n\nEl progreso se queda guardado en este dispositivo y vuelve al entrar otra vez.')) return;
      closeSession();
      if (location.hash && location.hash !== '#') location.hash = '';
      else viewLogin();
    });
  }
}

function paintStats() {
  var xp = document.getElementById('stat-xp');
  var st = document.getElementById('stat-streak');
  var dn = document.getElementById('stat-done');
  /* durante una lección el contador sube en vivo, para que el +10
     que vuela hacia él aterrice en un número que de verdad cambia */
  if (xp) xp.textContent = S.xp + ((run && run.xp) ? run.xp : 0);
  if (st) {
    st.textContent = S.streak;
    st.parentNode.className = 'stat' + (S.streak > 0 ? ' stat--fire' : '');
  }
  if (dn) dn.innerHTML = doneCount() + '<span class="stat__of">/' + TOTAL + '</span>';
}

function tagFor(skill) {
  var t = el('span', 'tag tag--' + String(skill).replace(/[^a-z]/gi, '').toLowerCase(), skill);
  return t;
}

function tagRow(skills) {
  var row = el('div', 'tags');
  (skills || []).forEach(function (s) { row.appendChild(tagFor(s)); });
  return row;
}

function button(label, cls, fn) {
  var b = el('button', 'btn ' + (cls || ''), label);
  b.type = 'button';
  b.addEventListener('click', fn);
  return b;
}

function goto(hash) {
  if (location.hash === hash) route();
  else location.hash = hash;
}

/* El panel de la trampa: el elemento firma de la web. */
function trapPanel(opts) {
  var wrap = el('div', 'trap' + (opts.trap ? '' : ' trap--clean'));

  if (opts.trap) {
    var bad = el('div', 'trap__row trap__row--bad');
    bad.appendChild(el('span', 'trap__label', 'La trampa'));
    var badText = el('span', 'trap__text');
    badText.innerHTML = '<span class="strike">' + esc(opts.trap) + '</span>';
    bad.appendChild(badText);
    wrap.appendChild(bad);
  }

  if (opts.ok) {
    var good = el('div', 'trap__row trap__row--good');
    good.appendChild(el('span', 'trap__label', opts.okLabel || 'En inglés real'));
    good.appendChild(el('span', 'trap__text', opts.ok));
    wrap.appendChild(good);
  }

  if (opts.why) {
    var why = el('p', 'trap__why');
    why.innerHTML = esc(opts.why)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.+?)_/g, '<em>$1</em>');
    wrap.appendChild(why);
  }

  return wrap;
}

/* =========================================================
   6b. Reacción inmediata
   XP que vuela hacia el contador, latido y sonido corto.
   El sonido se genera con osciladores: ni un archivo de audio.
   ========================================================= */

var SOUND_KEY = 'latrampa.sound';

var Sound = {
  on: (function () { try { return window.localStorage.getItem(SOUND_KEY) !== 'off'; } catch (e) { return true; } })(),
  ac: null,

  toggle: function () {
    Sound.on = !Sound.on;
    try { window.localStorage.setItem(SOUND_KEY, Sound.on ? 'on' : 'off'); } catch (e) {}
    if (Sound.on) Sound.play(true);
    return Sound.on;
  },

  play: function (ok) {
    if (!Sound.on) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!Sound.ac) Sound.ac = new AC();
      var c = Sound.ac;
      if (c.state === 'suspended') c.resume();
      var t0 = c.currentTime;
      /* acierto: dos notas que suben. fallo: dos que bajan, más graves */
      var notas = ok ? [659.25, 987.77] : [233.08, 174.61];
      notas.forEach(function (f, i) {
        var t = t0 + i * 0.075;
        var o = c.createOscillator(), g = c.createGain();
        o.type = ok ? 'sine' : 'triangle';
        o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(ok ? 0.07 : 0.05, t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.17);
        o.connect(g); g.connect(c.destination);
        o.start(t); o.stop(t + 0.19);
      });
    } catch (e) {}
  }
};

function feedback(ok, xp) {
  Sound.play(ok);

  var stat = document.getElementById('stat-xp');
  var fly = el('div', 'xpfly' + (ok ? '' : ' xpfly--low'), '+' + xp);
  if (stat) {
    var r = stat.getBoundingClientRect();
    fly.style.left = (r.left + r.width / 2) + 'px';
    fly.style.top = (r.bottom + 2) + 'px';
  } else {
    fly.style.left = '50%';
    fly.style.top = '4.5rem';
  }
  document.body.appendChild(fly);
  setTimeout(function () { if (fly.parentNode) fly.parentNode.removeChild(fly); }, 1200);

  if (stat) {
    stat.classList.remove('is-bump');
    void stat.offsetWidth;          /* reinicia la animación */
    stat.classList.add('is-bump');
  }
}

/* =========================================================
   7. Teclado
   ========================================================= */

var Keys = {
  handler: null,
  set: function (fn) { Keys.handler = fn; }
};

document.addEventListener('keydown', function (e) {
  if (!Keys.handler) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  var tag = e.target && e.target.tagName;
  if (tag === 'TEXTAREA') return;                       /* nunca robamos teclas al textarea */
  if (tag === 'INPUT' && e.key !== 'Enter') return;     /* en un input solo escuchamos Enter */

  Keys.handler(e);
});

/* devuelve 0..3 si la tecla es A-D o 1-4, o -1 */
function optionIndexFromKey(e) {
  var k = String(e.key || '').toLowerCase();
  if (/^[abcd]$/.test(k)) return k.charCodeAt(0) - 97;
  if (/^[1-4]$/.test(k)) return parseInt(k, 10) - 1;
  return -1;
}

/* =========================================================
   8. Cuaderno de fallos
   ========================================================= */

var MISSED_CAP = 40;

function missedId(day, ex) {
  var seed = [ex.es, ex.question, ex.text, ex.audio, ex.prompt, ex.title, ex.type]
    .filter(function (x) { return typeof x === 'string' && x; }).join('|');
  var h = 0;
  for (var i = 0; i < seed.length; i++) { h = ((h << 5) - h + seed.charCodeAt(i)) | 0; }
  return day + ':' + h;
}

function addMissed(day, ex, label) {
  var id = missedId(day, ex);
  for (var i = 0; i < S.missed.length; i++) if (S.missed[i].id === id) return;
  S.missed.push({ id: id, day: day, label: label || null, ex: ex });
  if (S.missed.length > MISSED_CAP) S.missed = S.missed.slice(S.missed.length - MISSED_CAP);
}

function dropMissed(id) {
  var out = [];
  for (var i = 0; i < S.missed.length; i++) if (S.missed[i].id !== id) out.push(S.missed[i]);
  S.missed = out;
}

/* =========================================================
   9. Renderizadores: un tipo de ejercicio, un renderizador
   ========================================================= */

var RENDER = {};

/* ---- note: explicación previa, no puntúa ---- */
RENDER.note = function (ex, ctx) {
  var wrap = el('div');
  var box = el('div', 'note');
  if (ex.title) box.appendChild(el('h3', null, ex.title));
  var body = el('div');
  body.innerHTML = ex.html || '';
  box.appendChild(body);
  wrap.appendChild(box);

  var row = el('div', 'btn-row');
  row.appendChild(button('Entendido', 'btn--primary', ctx.next));
  wrap.appendChild(row);

  ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
  return wrap;
};

/* ---- mcq: opción múltiple con panel de la trampa ---- */
RENDER.mcq = function (ex, ctx) {
  var wrap = el('div');

  if (ex.instruction) wrap.appendChild(el('p', 'instruction', ex.instruction));
  if (ex.es) wrap.appendChild(el('p', 'prompt-es', ex.es));
  if (ex.question) wrap.appendChild(el('p', 'question', ex.question));

  var list = el('div', 'opts');
  var buttons = [];
  var answered = false;

  (ex.opts || []).forEach(function (text, i) {
    var b = el('button', 'opt');
    b.type = 'button';
    b.appendChild(el('span', 'opt__key', String.fromCharCode(65 + i)));
    b.appendChild(el('span', 'opt__t', text));
    b.addEventListener('click', function () { answer(i); });
    buttons.push(b);
    list.appendChild(b);
  });
  wrap.appendChild(list);

  var after = el('div');
  wrap.appendChild(after);

  function answer(i) {
    if (answered) return;
    answered = true;
    var ok = (i === ex.ok);

    buttons.forEach(function (b, j) {
      b.disabled = true;
      if (j === ex.ok) b.className = 'opt opt--ok';
      else if (j === i) b.className = 'opt opt--bad';
      else b.className = 'opt opt--dim';
    });

    after.appendChild(trapPanel({
      trap: ok ? null : (ex.trap || (ex.opts ? ex.opts[i] : null)),
      ok: ex.opts ? ex.opts[ex.ok] : null,
      why: ex.why
    }));

    var row = el('div', 'btn-row');
    var next = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
    row.appendChild(next);
    after.appendChild(row);
    next.focus();

    ctx.score(ok, ex);
    ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
  }

  ctx.keys = function (e) {
    var i = optionIndexFromKey(e);
    if (i >= 0 && i < buttons.length) { e.preventDefault(); answer(i); }
  };

  return wrap;
};

/* ---- gap: rellenar hueco escribiendo ---- */
RENDER.gap = function (ex, ctx) {
  var wrap = el('div');

  if (ex.instruction) wrap.appendChild(el('p', 'instruction', ex.instruction));
  if (ex.es) wrap.appendChild(el('p', 'prompt-es', ex.es));

  var answers = isArr(ex.answer) ? ex.answer : [ex.answer];
  var line = el('p', 'gap-line');
  var parts = String(ex.text || '___').split('___');
  var input = el('input', 'gap-input');
  input.type = 'text';
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('autocorrect', 'off');
  input.setAttribute('autocapitalize', 'off');
  input.setAttribute('spellcheck', 'false');
  input.setAttribute('aria-label', 'Completa el hueco');
  input.size = Math.max(10, String(answers[0] || '').length + 4);

  line.appendChild(document.createTextNode(parts[0] || ''));
  line.appendChild(input);
  line.appendChild(document.createTextNode(parts.slice(1).join('___') || ''));
  wrap.appendChild(line);

  var after = el('div');
  wrap.appendChild(after);

  var row = el('div', 'btn-row');
  var check = button('Comprobar', 'btn--primary', submit);
  row.appendChild(check);
  wrap.appendChild(row);

  var answered = false;

  function submit() {
    if (answered) return;
    var typed = norm(input.value);
    if (!typed) { input.focus(); return; }
    answered = true;

    var ok = false;
    for (var i = 0; i < answers.length; i++) if (norm(answers[i]) === typed) { ok = true; break; }

    input.disabled = true;
    input.className = 'gap-input ' + (ok ? 'gap-input--ok' : 'gap-input--bad');
    row.innerHTML = '';

    after.appendChild(trapPanel({
      trap: ok ? null : input.value,
      ok: (parts[0] || '') + answers[0] + (parts.slice(1).join('___') || ''),
      okLabel: ok ? 'Bien' : 'La forma correcta',
      why: ex.why
    }));

    if (answers.length > 1) {
      var alt = el('p', 'answers');
      alt.innerHTML = 'También vale: ' + answers.slice(1).map(function (a) { return '<b>' + esc(a) + '</b>'; }).join(' · ');
      after.appendChild(alt);
    }

    var row2 = el('div', 'btn-row');
    var next = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
    row2.appendChild(next);
    after.appendChild(row2);
    next.focus();

    ctx.score(ok, ex);
    ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
  }

  ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); answered ? ctx.next() : submit(); } };
  ctx.focus = function () { input.focus(); };

  return wrap;
};

/* ---- reading: texto + glosario + preguntas encadenadas ---- */
RENDER.reading = function (ex, ctx) {
  var wrap = el('div');

  if (ex.title) wrap.appendChild(el('h2', 'reading__title', ex.title));

  var box = el('div', 'reading__text');
  (ex.text || []).forEach(function (p) { box.appendChild(el('p', null, p)); });
  wrap.appendChild(box);

  if (isArr(ex.glossary) && ex.glossary.length) {
    var gl = el('div', 'glossary');
    ex.glossary.forEach(function (g) {
      var it = el('div', 'glossary__item');
      it.appendChild(el('span', 'glossary__w', g.w));
      it.appendChild(el('span', 'glossary__d', g.d));
      gl.appendChild(it);
    });
    wrap.appendChild(gl);
  }

  var zone = el('div');
  wrap.appendChild(zone);

  var qs = isArr(ex.questions) ? ex.questions : [];
  var qi = 0;

  function renderQuestion() {
    zone.innerHTML = '';
    if (qi >= qs.length) {
      var rowEnd = el('div', 'btn-row');
      var nx = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
      rowEnd.appendChild(nx);
      zone.appendChild(rowEnd);
      nx.focus();
      ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
      return;
    }

    var q = qs[qi];
    zone.appendChild(el('p', 'qnum', 'Pregunta ' + (qi + 1) + ' de ' + qs.length));
    zone.appendChild(el('p', 'question', q.q));

    var list = el('div', 'opts');
    var buttons = [];
    var answered = false;

    (q.opts || []).forEach(function (text, i) {
      var b = el('button', 'opt');
      b.type = 'button';
      b.appendChild(el('span', 'opt__key', String.fromCharCode(65 + i)));
      b.appendChild(el('span', 'opt__t', text));
      b.addEventListener('click', function () { answer(i); });
      buttons.push(b);
      list.appendChild(b);
    });
    zone.appendChild(list);

    var after = el('div');
    zone.appendChild(after);

    function answer(i) {
      if (answered) return;
      answered = true;
      var ok = (i === q.ok);

      buttons.forEach(function (b, j) {
        b.disabled = true;
        if (j === q.ok) b.className = 'opt opt--ok';
        else if (j === i) b.className = 'opt opt--bad';
        else b.className = 'opt opt--dim';
      });

      after.appendChild(trapPanel({
        trap: null,
        ok: q.opts ? q.opts[q.ok] : null,
        okLabel: ok ? 'Correcta' : 'La respuesta era',
        why: q.why
      }));

      /* una pregunta de reading que falla entra en el cuaderno como mcq suelto */
      ctx.score(ok, {
        type: 'mcq',
        es: null,
        question: q.q,
        opts: q.opts,
        ok: q.ok,
        why: q.why,
        instruction: 'Del texto: ' + (ex.title || 'lectura')
      });

      var row = el('div', 'btn-row');
      var next = button(qi + 1 < qs.length ? 'Siguiente pregunta' : (ctx.lastStep ? 'Terminar' : 'Continuar'), 'btn--primary', function () {
        qi++;
        if (qi < qs.length) { renderQuestion(); box.scrollTop = 0; }
        else ctx.next();
      });
      row.appendChild(next);
      after.appendChild(row);
      next.focus();

      ctx.keys = function (e) {
        if (e.key === 'Enter') { e.preventDefault(); next.click(); }
      };
    }

    ctx.keys = function (e) {
      var i = optionIndexFromKey(e);
      if (i >= 0 && i < buttons.length) { e.preventDefault(); answer(i); }
    };
  }

  renderQuestion();
  return wrap;
};

/* ---- listening: audio del sintetizador del navegador ---- */
function playerBox(text, opts) {
  opts = opts || {};
  var outer = el('div');
  var aviso = el('div');
  var box = el('div', 'player');
  outer.appendChild(aviso);
  outer.appendChild(box);

  var play = el('button', 'player__play');
  play.type = 'button';
  play.setAttribute('aria-label', 'Reproducir el audio');
  play.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  var meta = el('div', 'player__meta');
  var mainLabel = el('span', 'player__label', opts.label || 'Audio · voz del navegador');
  var rateLabel = el('span', 'player__rate', 'Preparando el audio…');
  meta.appendChild(mainLabel);
  meta.appendChild(rateLabel);

  var wave = el('div', 'wave');
  for (var i = 0; i < 7; i++) wave.appendChild(el('i'));

  var slow = el('button', 'btn btn--sm btn--ghost', '0.7×');
  slow.type = 'button';

  box.appendChild(play);
  box.appendChild(meta);
  box.appendChild(wave);
  box.appendChild(slow);

  var caido = false;

  function normal() { return Voice.accent && Voice.accent !== 'británico'
    ? 'Velocidad normal · acento ' + Voice.accent
    : 'Velocidad normal'; }

  function run(rate) {
    if (Voice.state !== 'ready') return;
    rateLabel.textContent = rate < 1 ? 'Velocidad lenta · 0.7×' : normal();
    Voice.speak(text, rate,
      function () { play.className = 'player__play is-playing'; wave.className = 'wave is-on'; },
      function () { play.className = 'player__play'; wave.className = 'wave'; },
      caer
    );
  }

  /* El audio no se puede reproducir: lo decimos claro, explicamos cómo
     arreglarlo y damos paso a la transcripción para no bloquear el paso. */
  function caer(motivo) {
    if (caido) return;
    caido = true;
    box.style.display = 'none';
    aviso.innerHTML = '';

    var n = el('div', 'notice');
    var titulo = el('p');
    titulo.style.margin = '0 0 .5rem';
    titulo.innerHTML = '<b>Este dispositivo no puede reproducir el audio.</b>';
    n.appendChild(titulo);

    var p = el('p');
    p.style.margin = '0';
    p.innerHTML = Voice.hasApi
      ? 'El navegador tiene sintetizador de voz, pero no hay ninguna <b>voz en inglés</b> instalada en el sistema. ' +
        'En Windows se añaden en <em>Configuración → Hora e idioma → Idioma y región → Añadir idioma → English</em>, ' +
        'marcando «Voz». En Android, en <em>Ajustes → Accesibilidad → Salida de texto a voz</em>.'
      : 'Este navegador no incluye sintetizador de voz. Prueba con Chrome, Edge o Safari.';
    n.appendChild(p);
    aviso.appendChild(n);

    if (opts.onUnavailable) opts.onUnavailable(motivo);
  }

  play.addEventListener('click', function () { run(1); });
  slow.addEventListener('click', function () { run(0.7); });

  /* Hasta saber si hay voz, el botón no promete nada que no pueda cumplir. */
  play.disabled = true;
  slow.disabled = true;

  Voice.whenReady(function (estado) {
    if (estado === 'ready') {
      play.disabled = false;
      slow.disabled = false;
      rateLabel.textContent = normal();
      if (opts.autoplay) run(1);
    } else {
      caer('sin-voz');
    }
  });

  return {
    node: outer,
    play: function () { run(1); },
    disponible: function () { return !caido && Voice.state === 'ready'; }
  };
}

RENDER.listening = function (ex, ctx) {
  var wrap = el('div');
  wrap.appendChild(el('p', 'instruction', ex.mode === 'dictation'
    ? 'Escucha y escribe exactamente lo que oyes'
    : 'Escucha y elige la respuesta correcta'));

  /* Si el audio no se puede reproducir, enseñamos la transcripción:
     el ejercicio pierde el oído pero no se queda bloqueado. */
  var respaldo = el('div');

  var player = playerBox(ex.audio, {
    label: 'Audio · escúchalo las veces que quieras',
    autoplay: true,
    onUnavailable: function () {
      respaldo.innerHTML = '';
      var caja = el('div', 'note');
      caja.appendChild(el('p', 'instruction', 'Sin audio · lee la frase en su lugar'));
      caja.appendChild(el('p', null, ex.audio));
      respaldo.appendChild(caja);
    }
  });

  wrap.appendChild(player.node);
  wrap.appendChild(respaldo);

  var after = el('div');

  if (ex.mode === 'dictation') {
    var ta = el('textarea', 'dictation');
    ta.setAttribute('aria-label', 'Escribe lo que oyes');
    ta.rows = 3;
    wrap.appendChild(ta);

    var row = el('div', 'btn-row');
    var check = button('Comprobar', 'btn--primary', submit);
    row.appendChild(check);
    wrap.appendChild(row);
    wrap.appendChild(after);

    var answered = false;

    function submit() {
      if (answered) return;
      var typed = ta.value;
      if (!norm(typed)) { ta.focus(); return; }
      answered = true;
      var ok = norm(typed) === norm(ex.audio);

      ta.disabled = true;
      row.innerHTML = '';

      var diff = el('p', 'diff');
      var target = words(ex.audio);
      var mine = words(typed);
      var raw = String(ex.audio).split(/\s+/);
      target.forEach(function (w, i) {
        var span = el('span', mine[i] === w ? 'w-ok' : 'w-bad', raw[i] || w);
        diff.appendChild(span);
        diff.appendChild(document.createTextNode(' '));
      });

      var panel = trapPanel({
        trap: ok ? null : typed.trim(),
        ok: ex.audio,
        okLabel: ok ? 'Exacto' : 'Lo que se decía',
        why: ex.why
      });
      after.appendChild(panel);

      var dwrap = el('div', 'note');
      dwrap.appendChild(el('p', 'instruction', 'Palabra por palabra'));
      dwrap.appendChild(diff);
      after.appendChild(dwrap);

      var row2 = el('div', 'btn-row');
      var next = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
      row2.appendChild(next);
      after.appendChild(row2);
      next.focus();

      ctx.score(ok, ex);
      ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
    }

    /* el dictado es una sola frase, así que Enter envía.
       Shift+Enter sigue haciendo salto de línea. */
    ta.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (answered) ctx.next(); else submit();
      }
    });

    ctx.keys = function (e) {
      if (e.key === 'Enter' && !answered) { e.preventDefault(); submit(); }
      else if (e.key === 'Enter') { e.preventDefault(); ctx.next(); }
    };
    return wrap;
  }

  /* modo mcq */
  if (ex.question) wrap.appendChild(el('p', 'question', ex.question));

  var list = el('div', 'opts');
  var buttons = [];
  var done = false;

  (ex.opts || []).forEach(function (text, i) {
    var b = el('button', 'opt');
    b.type = 'button';
    b.appendChild(el('span', 'opt__key', String.fromCharCode(65 + i)));
    b.appendChild(el('span', 'opt__t', text));
    b.addEventListener('click', function () { answer(i); });
    buttons.push(b);
    list.appendChild(b);
  });
  wrap.appendChild(list);
  wrap.appendChild(after);

  function answer(i) {
    if (done) return;
    done = true;
    var ok = (i === ex.ok);

    buttons.forEach(function (b, j) {
      b.disabled = true;
      if (j === ex.ok) b.className = 'opt opt--ok';
      else if (j === i) b.className = 'opt opt--bad';
      else b.className = 'opt opt--dim';
    });

    after.appendChild(trapPanel({
      trap: null,
      ok: ex.opts ? ex.opts[ex.ok] : null,
      okLabel: ok ? 'Correcta' : 'La respuesta era',
      why: ex.why
    }));

    var tr = el('div', 'note');
    tr.appendChild(el('p', 'instruction', 'Transcripción'));
    tr.appendChild(el('p', null, ex.audio));
    after.appendChild(tr);

    var row = el('div', 'btn-row');
    var next = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
    row.appendChild(next);
    after.appendChild(row);
    next.focus();

    ctx.score(ok, ex);
    ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
  }

  ctx.keys = function (e) {
    var i = optionIndexFromKey(e);
    if (i >= 0 && i < buttons.length) { e.preventDefault(); answer(i); }
  };

  return wrap;
};

/* ---- order: montar la frase palabra a palabra ---- */
/* El ejercicio que ataca de frente el calco de orden: te damos las
   piezas y tienes que colocarlas como las colocaría un inglés. */
RENDER.order = function (ex, ctx) {
  var wrap = el('div');
  var correcta = (ex.words || []).slice(0);

  wrap.appendChild(el('p', 'instruction', ex.instruction || 'Monta la frase en inglés'));
  if (ex.es) wrap.appendChild(el('p', 'prompt-es', ex.es));

  var linea = el('div', 'order__line');
  linea.setAttribute('aria-label', 'Tu frase');
  var vacio = el('span', 'order__empty', 'Pulsa las palabras en el orden correcto');
  linea.appendChild(vacio);

  var banco = el('div', 'order__bank');
  wrap.appendChild(linea);
  wrap.appendChild(banco);

  var after = el('div');
  var row = el('div', 'btn-row');
  var check = button('Comprobar', 'btn--primary', submit);
  check.disabled = true;
  var deshacer = button('Deshacer', 'btn--ghost btn--sm', function () {
    var ult = linea.querySelectorAll('.chip');
    if (ult.length) devolver(ult[ult.length - 1]);
  });
  row.appendChild(check);
  row.appendChild(deshacer);
  wrap.appendChild(row);
  wrap.appendChild(after);

  var respondido = false;

  /* barajar asegurando que no salga ya ordenada */
  function barajar(arr) {
    var out = arr.slice(0), i, j, t;
    for (var intento = 0; intento < 12; intento++) {
      for (i = out.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        t = out[i]; out[i] = out[j]; out[j] = t;
      }
      if (out.join(' ') !== arr.join(' ')) break;
    }
    return out;
  }

  function chip(texto, enBanco) {
    var b = el('button', 'chip');
    b.type = 'button';
    b.textContent = texto;
    b.setAttribute('draggable', 'true');
    b.addEventListener('click', function () {
      if (respondido) return;
      if (b.parentNode === banco) colocar(b); else devolver(b);
    });
    /* arrastrar para reordenar dentro de la línea (escritorio) */
    b.addEventListener('dragstart', function (e) {
      if (respondido) { e.preventDefault(); return; }
      arrastrando = b;
      b.classList.add('is-drag');
      try { e.dataTransfer.setData('text/plain', texto); e.dataTransfer.effectAllowed = 'move'; } catch (err) {}
    });
    b.addEventListener('dragend', function () { b.classList.remove('is-drag'); arrastrando = null; });
    return b;
  }

  var arrastrando = null;

  function zonaSoltar(zona) {
    zona.addEventListener('dragover', function (e) {
      if (!arrastrando || respondido) return;
      e.preventDefault();
      var tras = despuesDe(zona, e.clientX, e.clientY);
      if (tras == null) zona.appendChild(arrastrando);
      else zona.insertBefore(arrastrando, tras);
    });
    zona.addEventListener('drop', function (e) { if (arrastrando) { e.preventDefault(); pintar(); } });
  }

  function despuesDe(zona, x, y) {
    var chips = [].slice.call(zona.querySelectorAll('.chip:not(.is-drag)'));
    for (var i = 0; i < chips.length; i++) {
      var r = chips[i].getBoundingClientRect();
      if (y < r.bottom - r.height / 2 && x < r.left + r.width / 2) return chips[i];
    }
    return null;
  }

  zonaSoltar(linea);
  zonaSoltar(banco);

  function colocar(b) { linea.appendChild(b); pintar(); }
  function devolver(b) { banco.appendChild(b); pintar(); }

  function pintar() {
    var enLinea = linea.querySelectorAll('.chip').length;
    vacio.style.display = enLinea ? 'none' : '';
    if (!linea.contains(vacio)) linea.insertBefore(vacio, linea.firstChild);
    check.disabled = respondido || banco.querySelectorAll('.chip').length > 0;
  }

  barajar(correcta).forEach(function (w) { banco.appendChild(chip(w, true)); });
  pintar();

  function leerLinea() {
    return [].map.call(linea.querySelectorAll('.chip'), function (c) { return c.textContent; }).join(' ');
  }

  function submit() {
    if (respondido) return;
    var mia = leerLinea();
    if (!norm(mia)) return;
    respondido = true;

    var ok = norm(mia) === norm(correcta.join(' '));
    check.disabled = true;
    row.innerHTML = '';

    /* marcar palabra a palabra en qué posición fallaste */
    [].forEach.call(linea.querySelectorAll('.chip'), function (c, i) {
      c.classList.add(norm(c.textContent) === norm(correcta[i] || '') ? 'chip--ok' : 'chip--bad');
      c.setAttribute('draggable', 'false');
    });

    after.appendChild(trapPanel({
      trap: ok ? null : (ex.trap || mia),
      ok: correcta.join(' '),
      okLabel: ok ? 'Exacto' : 'El orden correcto',
      why: ex.why
    }));

    var row2 = el('div', 'btn-row');
    var next = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
    row2.appendChild(next);
    after.appendChild(row2);
    next.focus();

    ctx.score(ok, ex);
    ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
  }

  ctx.keys = function (e) {
    if (e.key === 'Enter') { e.preventDefault(); if (respondido) ctx.next(); else if (!check.disabled) submit(); }
    else if (e.key === 'Backspace') {
      var c = linea.querySelectorAll('.chip');
      if (c.length && !respondido) { e.preventDefault(); devolver(c[c.length - 1]); }
    }
  };

  return wrap;
};

/* ---- match: clasificar en columnas o unir parejas ---- */
RENDER.match = function (ex, ctx) {
  var wrap = el('div');
  var modo = ex.mode === 'pairs' ? 'pairs' : 'classify';

  wrap.appendChild(el('p', 'instruction', ex.instruction ||
    (modo === 'pairs' ? 'Une cada pareja' : 'Coloca cada uno en su columna')));
  if (ex.es) wrap.appendChild(el('p', 'prompt-es', ex.es));

  var after = el('div');
  var row = el('div', 'btn-row');
  var check = button('Comprobar', 'btn--primary', submit);
  check.disabled = true;
  row.appendChild(check);

  var respondido = false;
  var seleccion = null;
  var colocados = 0, total = 0;

  if (modo === 'classify') {
    var items = (ex.items || []).slice(0);
    total = items.length;

    var bandeja = el('div', 'order__bank match__tray');
    var cols = el('div', 'match__cols');
    var zonas = [];

    (ex.groups || []).forEach(function (g, gi) {
      var col = el('div', 'match__col');
      col.appendChild(el('p', 'match__head', g));
      var zona = el('div', 'match__drop');
      zona.__g = gi;
      col.appendChild(zona);
      cols.appendChild(col);
      zonas.push(zona);
      zona.addEventListener('click', function () {
        if (respondido || !seleccion) return;
        zona.appendChild(seleccion);
        seleccion.classList.remove('is-sel');
        seleccion = null;
        recuento();
      });
    });

    /* orden aleatorio para que no se resuelva por posición */
    items.sort(function () { return Math.random() - 0.5; });
    items.forEach(function (it) {
      var c = el('button', 'chip');
      c.type = 'button';
      c.textContent = it.t;
      c.__g = it.g;
      c.addEventListener('click', function () {
        if (respondido) return;
        if (c.parentNode !== bandeja) { bandeja.appendChild(c); c.classList.remove('is-sel'); seleccion = null; recuento(); return; }
        if (seleccion) seleccion.classList.remove('is-sel');
        seleccion = (seleccion === c) ? null : c;
        if (seleccion) c.classList.add('is-sel');
      });
      bandeja.appendChild(c);
    });

    wrap.appendChild(bandeja);
    wrap.appendChild(cols);

    var recuento = function () {
      colocados = total - bandeja.querySelectorAll('.chip').length;
      check.disabled = respondido || colocados < total;
    };

    var evaluar = function () {
      var aciertos = 0;
      zonas.forEach(function (z) {
        [].forEach.call(z.querySelectorAll('.chip'), function (c) {
          var bien = c.__g === z.__g;
          c.classList.add(bien ? 'chip--ok' : 'chip--bad');
          if (bien) aciertos++;
        });
      });
      return { aciertos: aciertos, total: total };
    };
    var solucion = function () {
      return (ex.groups || []).map(function (g, gi) {
        return g + ': ' + (ex.items || []).filter(function (i) { return i.g === gi; })
          .map(function (i) { return i.t; }).join(', ');
      }).join(' · ');
    };
    wrap.__evaluar = evaluar;
    wrap.__solucion = solucion;

  } else {
    var pares = (ex.pairs || []).slice(0);
    total = pares.length;

    var tabla = el('div', 'match__pairs');
    var izq = el('div', 'match__side');
    var der = el('div', 'match__side');
    tabla.appendChild(izq);
    tabla.appendChild(der);
    wrap.appendChild(tabla);

    var derechas = pares.map(function (p, i) { return { t: p.r, i: i }; });
    derechas.sort(function () { return Math.random() - 0.5; });

    var elegidoIzq = null;

    /* Deshace un enlace dejando las dos fichas como estaban.
       Si no se limpian las dos, una queda con pinta de enlazada
       sin estarlo, y el contador deja de cuadrar. */
    function desenlazar(chip) {
      if (!chip || !chip.__par) return;
      var otro = chip.__par;
      chip.__par = null;
      otro.__par = null;
      chip.classList.remove('is-linked');
      otro.classList.remove('is-linked');
    }

    pares.forEach(function (p, i) {
      var b = el('button', 'chip chip--wide');
      b.type = 'button';
      b.textContent = p.l;
      b.__i = i;
      b.addEventListener('click', function () {
        if (respondido) return;
        /* pulsar una ficha ya enlazada la suelta */
        if (b.__par) { desenlazar(b); pintarEnlaces(); return; }
        if (elegidoIzq) elegidoIzq.classList.remove('is-sel');
        elegidoIzq = (elegidoIzq === b) ? null : b;
        if (elegidoIzq) b.classList.add('is-sel');
      });
      izq.appendChild(b);
    });

    derechas.forEach(function (d) {
      var b = el('button', 'chip chip--wide');
      b.type = 'button';
      b.textContent = d.t;
      b.__i = d.i;
      b.addEventListener('click', function () {
        if (respondido) return;
        if (!elegidoIzq) { if (b.__par) { desenlazar(b); pintarEnlaces(); } return; }
        desenlazar(elegidoIzq);   /* por si el izquierdo ya tenía pareja */
        desenlazar(b);            /* y por si el derecho la tenía */
        elegidoIzq.__par = b;
        b.__par = elegidoIzq;
        elegidoIzq.classList.remove('is-sel');
        elegidoIzq.classList.add('is-linked');
        b.classList.add('is-linked');
        elegidoIzq = null;
        pintarEnlaces();
      });
      der.appendChild(b);
    });

    function pintarEnlaces() {
      colocados = [].filter.call(izq.querySelectorAll('.chip'), function (b) { return !!b.__par; }).length;
      check.disabled = respondido || colocados < total;
    }

    wrap.__evaluar = function () {
      var aciertos = 0;
      [].forEach.call(izq.querySelectorAll('.chip'), function (b) {
        var bien = !!b.__par && b.__par.__i === b.__i;
        b.classList.remove('is-linked');
        b.classList.add(bien ? 'chip--ok' : 'chip--bad');
        if (b.__par) {
          b.__par.classList.remove('is-linked');
          b.__par.classList.add(bien ? 'chip--ok' : 'chip--bad');
        }
        if (bien) aciertos++;
      });
      return { aciertos: aciertos, total: total };
    };
    wrap.__solucion = function () {
      return pares.map(function (p) { return p.l + ' → ' + p.r; }).join(' · ');
    };
  }

  wrap.appendChild(row);
  wrap.appendChild(after);

  function submit() {
    if (respondido) return;
    respondido = true;
    check.disabled = true;
    row.innerHTML = '';

    var r = wrap.__evaluar();
    var ok = r.aciertos === r.total;

    after.appendChild(trapPanel({
      trap: null,
      ok: wrap.__solucion(),
      okLabel: ok ? 'Todo correcto' : r.aciertos + ' de ' + r.total + ' · la solución',
      why: ex.why
    }));

    var row2 = el('div', 'btn-row');
    var next = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
    row2.appendChild(next);
    after.appendChild(row2);
    next.focus();

    ctx.score(ok, ex);
    ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
  }

  ctx.keys = function (e) {
    if (e.key === 'Enter') { e.preventDefault(); if (respondido) ctx.next(); else if (!check.disabled) submit(); }
  };

  return wrap;
};

/* =========================================================
   Formatos del examen: partes 1 a 4 del Use of English

   Las tres primeras comparten forma: un texto con huecos
   numerados y las preguntas debajo, de una en una. Según
   aciertas, el hueco se rellena en el texto, así que el texto
   se va volviendo legible mientras trabajas.
   ========================================================= */

/* Pinta el texto partiéndolo por los marcadores {1} {2} … */
function textoConHuecos(box, texto, slots) {
  var trozos = String(texto).split(/(\{\d+\})/);
  var p = el('p');
  trozos.forEach(function (t) {
    var m = /^\{(\d+)\}$/.exec(t);
    if (m) {
      var n = parseInt(m[1], 10);
      var s = el('span', 'gapslot', '(' + n + ') ' + '……');
      s.setAttribute('data-n', n);
      slots[n - 1] = s;
      p.appendChild(s);
      return;
    }
    /* los saltos de párrafo del original se respetan */
    var partes = t.split('\n\n');
    partes.forEach(function (frag, i) {
      if (i > 0) { box.appendChild(p); p = el('p'); }
      p.appendChild(document.createTextNode(frag));
    });
  });
  box.appendChild(p);
}

function rellenaHueco(slot, palabra, ok) {
  if (!slot) return;
  slot.textContent = palabra;
  slot.className = 'gapslot ' + (ok ? 'gapslot--ok' : 'gapslot--bad');
}

/* Núcleo compartido por cloze, opencloze y wordform. */
function correPartePorHuecos(ex, ctx, pinta) {
  var wrap = el('div');
  if (ex.instructions) wrap.appendChild(el('p', 'instruction', ex.instructions));
  if (ex.heading) wrap.appendChild(el('h2', 'reading__title', ex.heading));

  if (ex.example) {
    var eg = el('p', 'examex');
    eg.innerHTML = '<b>Ejemplo (0):</b> ' + esc(ex.example);
    wrap.appendChild(eg);
  }

  var box = el('div', 'reading__text examtext');
  var slots = [];
  textoConHuecos(box, ex.text, slots);
  wrap.appendChild(box);

  var zone = el('div');
  wrap.appendChild(zone);

  var gaps = ex.gaps || [];
  var i = 0;

  function paso() {
    zone.innerHTML = '';

    if (i >= gaps.length) {
      var fin = el('div', 'btn-row');
      var b = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
      fin.appendChild(b);
      zone.appendChild(fin);
      b.focus();
      ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
      return;
    }

    slots.forEach(function (s, k) { if (s && k === i) s.classList.add('is-now'); else if (s) s.classList.remove('is-now'); });
    if (slots[i] && slots[i].scrollIntoView) {
      try { slots[i].scrollIntoView({ block: 'nearest' }); } catch (e) {}
    }

    zone.appendChild(el('p', 'qnum', 'Hueco ' + (i + 1) + ' de ' + gaps.length));
    pinta(gaps[i], i, zone, function (ok, palabra) {
      rellenaHueco(slots[i], palabra, ok);
      ctx.score(ok, {
        type: 'mcq',
        question: 'Hueco ' + (i + 1) + ' · ' + (ex.heading || 'Use of English'),
        opts: gaps[i].opts || null,
        ok: gaps[i].ok,
        why: gaps[i].why,
        instruction: ex.title || 'Use of English'
      });
      var row = el('div', 'btn-row');
      var next = button(i + 1 < gaps.length ? 'Siguiente hueco' : 'Ver el resultado', 'btn--primary', function () { i++; paso(); });
      row.appendChild(next);
      zone.appendChild(row);
      next.focus();
      ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); next.click(); } };
    });
  }

  paso();
  return wrap;
}

/* ---- Part 1: multiple-choice cloze ---- */
RENDER.cloze = function (ex, ctx) {
  return correPartePorHuecos(ex, ctx, function (gap, idx, zone, done) {
    var list = el('div', 'opts');
    var botones = [];
    var hecho = false;

    (gap.opts || []).forEach(function (t, k) {
      var b = el('button', 'opt');
      b.type = 'button';
      b.appendChild(el('span', 'opt__key', String.fromCharCode(65 + k)));
      b.appendChild(el('span', 'opt__t', t));
      b.addEventListener('click', function () { responde(k); });
      botones.push(b);
      list.appendChild(b);
    });
    zone.appendChild(list);
    var after = el('div');
    zone.appendChild(after);

    function responde(k) {
      if (hecho) return;
      hecho = true;
      var ok = k === gap.ok;
      botones.forEach(function (b, j) {
        b.disabled = true;
        b.className = 'opt ' + (j === gap.ok ? 'opt--ok' : (j === k ? 'opt--bad' : 'opt--dim'));
      });
      after.appendChild(trapPanel({
        trap: null,
        ok: gap.opts[gap.ok],
        okLabel: ok ? 'Correcta' : 'La respuesta era',
        why: gap.why
      }));
      done(ok, gap.opts[gap.ok]);
    }

    ctx.keys = function (e) {
      var k = optionIndexFromKey(e);
      if (k >= 0 && k < botones.length) { e.preventDefault(); responde(k); }
    };
  });
};

/* ---- Part 2: open cloze (una palabra, sin opciones) ---- */
RENDER.opencloze = function (ex, ctx) {
  return correPartePorHuecos(ex, ctx, function (gap, idx, zone, done) {
    var resp = isArr(gap.answer) ? gap.answer : [gap.answer];
    var linea = el('div', 'gap-line');
    var input = el('input', 'gap-input');
    input.type = 'text';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('aria-label', 'Escribe la palabra que falta');
    input.size = 14;
    linea.appendChild(document.createTextNode('Hueco (' + (idx + 1) + '): '));
    linea.appendChild(input);
    zone.appendChild(linea);

    var after = el('div');
    var row = el('div', 'btn-row');
    var check = button('Comprobar', 'btn--primary', envia);
    row.appendChild(check);
    zone.appendChild(row);
    zone.appendChild(after);
    setTimeout(function () { input.focus(); }, 40);

    var hecho = false;
    function envia() {
      if (hecho) return;
      var t = norm(input.value);
      if (!t) { input.focus(); return; }
      hecho = true;
      var ok = false;
      for (var j = 0; j < resp.length; j++) if (norm(resp[j]) === t) { ok = true; break; }
      input.disabled = true;
      input.className = 'gap-input ' + (ok ? 'gap-input--ok' : 'gap-input--bad');
      row.innerHTML = '';
      after.appendChild(trapPanel({
        trap: ok ? null : input.value,
        ok: resp[0],
        okLabel: ok ? 'Bien' : 'La palabra era',
        why: gap.why
      }));
      if (resp.length > 1) {
        var alt = el('p', 'answers');
        alt.innerHTML = 'También vale: ' + resp.slice(1).map(function (a) { return '<b>' + esc(a) + '</b>'; }).join(' · ');
        after.appendChild(alt);
      }
      done(ok, resp[0]);
    }

    ctx.keys = function (e) { if (e.key === 'Enter' && !hecho) { e.preventDefault(); envia(); } };
  });
};

/* ---- Part 3: word formation ---- */
RENDER.wordform = function (ex, ctx) {
  return correPartePorHuecos(ex, ctx, function (gap, idx, zone, done) {
    var resp = isArr(gap.answer) ? gap.answer : [gap.answer];

    var raiz = el('p', 'wordroot');
    raiz.innerHTML = 'Palabra base: <b>' + esc(gap.root) + '</b>';
    zone.appendChild(raiz);

    var linea = el('div', 'gap-line');
    var input = el('input', 'gap-input');
    input.type = 'text';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('aria-label', 'Escribe la palabra transformada');
    input.size = 16;
    linea.appendChild(document.createTextNode('Hueco (' + (idx + 1) + '): '));
    linea.appendChild(input);
    zone.appendChild(linea);

    var after = el('div');
    var row = el('div', 'btn-row');
    row.appendChild(button('Comprobar', 'btn--primary', envia));
    zone.appendChild(row);
    zone.appendChild(after);
    setTimeout(function () { input.focus(); }, 40);

    var hecho = false;
    function envia() {
      if (hecho) return;
      var t = norm(input.value);
      if (!t) { input.focus(); return; }
      hecho = true;
      var ok = false;
      for (var j = 0; j < resp.length; j++) if (norm(resp[j]) === t) { ok = true; break; }
      input.disabled = true;
      input.className = 'gap-input ' + (ok ? 'gap-input--ok' : 'gap-input--bad');
      row.innerHTML = '';
      after.appendChild(trapPanel({
        trap: ok ? null : input.value,
        ok: gap.root + ' → ' + resp[0],
        okLabel: ok ? 'Bien' : 'La transformación era',
        why: gap.why
      }));
      done(ok, resp[0]);
    }

    ctx.keys = function (e) { if (e.key === 'Enter' && !hecho) { e.preventDefault(); envia(); } };
  });
};

/* ---- Part 4: key word transformations ---- */
RENDER.transform = function (ex, ctx) {
  var wrap = el('div');
  if (ex.instructions) wrap.appendChild(el('p', 'instruction', ex.instructions));

  var zone = el('div');
  wrap.appendChild(zone);

  var items = ex.items || [];
  var i = 0;

  function paso() {
    zone.innerHTML = '';
    if (i >= items.length) {
      var fin = el('div', 'btn-row');
      var b = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
      fin.appendChild(b);
      zone.appendChild(fin);
      b.focus();
      ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
      return;
    }

    var it = items[i];
    var resp = isArr(it.answer) ? it.answer : [it.answer];
    var maxPal = it.max || 5;

    zone.appendChild(el('p', 'qnum', 'Frase ' + (i + 1) + ' de ' + items.length));
    zone.appendChild(el('p', 'question', it.from));

    var clave = el('p', 'keyword');
    clave.innerHTML = '<b>' + esc(it.key) + '</b>';
    zone.appendChild(clave);

    var linea = el('div', 'gap-line transform__line');
    linea.appendChild(document.createTextNode(it.before || ''));
    var input = el('input', 'gap-input gap-input--wide');
    input.type = 'text';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('aria-label', 'Completa con entre dos y cinco palabras');
    input.size = 26;
    linea.appendChild(input);
    linea.appendChild(document.createTextNode(it.after || ''));
    zone.appendChild(linea);

    var cuenta = el('p', 'answers', '0 palabras · entre 2 y ' + maxPal + ', y tiene que incluir ' + it.key);
    zone.appendChild(cuenta);
    input.addEventListener('input', function () {
      var n = palabrasExamen(input.value);
      var aviso = (n > maxPal) ? ' · te has pasado' : '';
      cuenta.textContent = n + (n === 1 ? ' palabra' : ' palabras') + ' · entre 2 y ' + maxPal +
                           ', y tiene que incluir ' + it.key + aviso;
      cuenta.style.color = n > maxPal ? 'var(--coral)' : '';
    });

    var after = el('div');
    var row = el('div', 'btn-row');
    row.appendChild(button('Comprobar', 'btn--primary', envia));
    zone.appendChild(row);
    zone.appendChild(after);
    setTimeout(function () { input.focus(); }, 40);

    var hecho = false;
    function envia() {
      if (hecho) return;
      var t = norm(input.value);
      if (!t) { input.focus(); return; }
      hecho = true;

      var ok = false;
      for (var j = 0; j < resp.length; j++) if (norm(resp[j]) === t) { ok = true; break; }

      /* pistas concretas cuando falla, como haría un profesor */
      var pistas = [];
      var n = palabrasExamen(input.value);
      if (n > maxPal) pistas.push('Te has pasado: ' + n + ' palabras, y el máximo es ' + maxPal +
        '. Recuerda que una contracción cuenta como dos: <em>didn\'t</em> son <em>did</em> y <em>not</em>.');
      if (n < 2) pistas.push('Hacen falta al menos dos palabras.');
      if (t.indexOf(norm(it.key)) === -1) pistas.push('No has usado la palabra clave <b>' + esc(it.key) + '</b>, y es obligatoria.');

      input.disabled = true;
      input.className = 'gap-input gap-input--wide ' + (ok ? 'gap-input--ok' : 'gap-input--bad');
      row.innerHTML = '';

      after.appendChild(trapPanel({
        trap: ok ? null : input.value,
        ok: (it.before || '') + resp[0] + (it.after || ''),
        okLabel: ok ? 'Exacto' : 'La respuesta era',
        why: it.why
      }));

      if (!ok && pistas.length) {
        var p = el('div', 'notice');
        p.innerHTML = pistas.join('<br>');
        after.appendChild(p);
      }
      if (resp.length > 1) {
        var alt = el('p', 'answers');
        alt.innerHTML = 'También vale: ' + resp.slice(1).map(function (a) { return '<b>' + esc(a) + '</b>'; }).join(' · ');
        after.appendChild(alt);
      }

      ctx.score(ok, {
        type: 'gap',
        es: it.from,
        text: (it.before || '') + '___' + (it.after || ''),
        answer: resp,
        why: it.why
      });

      var row2 = el('div', 'btn-row');
      var next = button(i + 1 < items.length ? 'Siguiente frase' : 'Ver el resultado', 'btn--primary', function () { i++; paso(); });
      row2.appendChild(next);
      after.appendChild(row2);
      next.focus();
      ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); next.click(); } };
    }

    ctx.keys = function (e) { if (e.key === 'Enter' && !hecho) { e.preventDefault(); envia(); } };
  }

  paso();
  return wrap;
};

/* ---- Part 6: gapped text ----
   Seis huecos en el texto y siete frases para colocar: sobra una.
   Las pistas son de costura: pronombres, conectores y referencias
   que tienen que encajar con lo de antes y con lo de después. */
RENDER.gappedtext = function (ex, ctx) {
  var wrap = el('div');
  if (ex.instructions) wrap.appendChild(el('p', 'instruction', ex.instructions));
  if (ex.heading) wrap.appendChild(el('h2', 'reading__title', ex.heading));

  var box = el('div', 'reading__text examtext');
  var slots = [];
  textoConHuecos(box, ex.text, slots);
  wrap.appendChild(box);

  var zone = el('div');
  wrap.appendChild(zone);

  var gaps = ex.gaps || [];
  var opciones = ex.options || [];
  var usadas = {};
  var i = 0;

  function paso() {
    zone.innerHTML = '';

    if (i >= gaps.length) {
      /* al acabar se dice cuál sobraba: es media pregunta del examen */
      var sobra = null;
      for (var k = 0; k < opciones.length; k++) if (!usadas[opciones[k].id]) sobra = opciones[k];
      if (sobra) {
        var n = el('div', 'note');
        n.appendChild(el('p', 'instruction', 'La frase que sobraba'));
        var p = el('p');
        p.innerHTML = '<b>' + esc(sobra.id) + '</b> — ' + esc(sobra.t);
        n.appendChild(p);
        if (ex.extraWhy) {
          var w = el('p', 'muted');
          w.style.marginTop = '.6rem';
          w.innerHTML = esc(ex.extraWhy).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/_(.+?)_/g, '<em>$1</em>');
          n.appendChild(w);
        }
        zone.appendChild(n);
      }
      var fin = el('div', 'btn-row');
      var b = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
      fin.appendChild(b);
      zone.appendChild(fin);
      b.focus();
      ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
      return;
    }

    slots.forEach(function (s, k) { if (s) s.classList[k === i ? 'add' : 'remove']('is-now'); });
    if (slots[i] && slots[i].scrollIntoView) { try { slots[i].scrollIntoView({ block: 'nearest' }); } catch (e) {} }

    var gap = gaps[i];
    zone.appendChild(el('p', 'qnum', 'Hueco ' + (i + 1) + ' de ' + gaps.length + ' · quedan ' + (opciones.length - i) + ' frases'));

    var lista = el('div', 'opts');
    var botones = [];
    var hecho = false;

    opciones.forEach(function (o) {
      if (usadas[o.id]) return;         /* cada frase se usa una sola vez */
      var b = el('button', 'opt opt--sentence');
      b.type = 'button';
      b.appendChild(el('span', 'opt__key', o.id));
      b.appendChild(el('span', 'opt__t', o.t));
      b.addEventListener('click', function () { responde(o, b); });
      botones.push({ o: o, el: b });
      lista.appendChild(b);
    });
    zone.appendChild(lista);

    var after = el('div');
    zone.appendChild(after);

    function responde(elegida, boton) {
      if (hecho) return;
      hecho = true;
      var ok = elegida.id === gap.ok;

      botones.forEach(function (x) {
        x.el.disabled = true;
        if (x.o.id === gap.ok) x.el.className = 'opt opt--sentence opt--ok';
        else if (x.o.id === elegida.id) x.el.className = 'opt opt--sentence opt--bad';
        else x.el.className = 'opt opt--sentence opt--dim';
      });

      /* la correcta se coloca en el texto, acierte o no: así el texto
         sigue teniendo sentido para resolver los huecos siguientes */
      usadas[gap.ok] = true;
      var buena = null;
      for (var k = 0; k < opciones.length; k++) if (opciones[k].id === gap.ok) buena = opciones[k];
      if (slots[i]) {
        slots[i].textContent = (buena ? buena.t : '');
        slots[i].className = 'gapslot gapslot--sentence ' + (ok ? 'gapslot--ok' : 'gapslot--bad');
      }

      after.appendChild(trapPanel({
        trap: null,
        ok: (buena ? gap.ok + ' — ' + buena.t : gap.ok),
        okLabel: ok ? 'Correcta' : 'Encajaba la ' + gap.ok,
        why: gap.why
      }));

      ctx.score(ok, {
        type: 'mcq',
        question: 'Hueco ' + (i + 1) + ' · ' + (ex.heading || 'Gapped text'),
        opts: botones.map(function (x) { return x.o.id + ' — ' + x.o.t; }),
        ok: (function () { for (var z = 0; z < botones.length; z++) if (botones[z].o.id === gap.ok) return z; return 0; })(),
        why: gap.why,
        instruction: 'Gapped text'
      });

      var row = el('div', 'btn-row');
      var next = button(i + 1 < gaps.length ? 'Siguiente hueco' : 'Ver el resultado', 'btn--primary', function () { i++; paso(); });
      row.appendChild(next);
      after.appendChild(row);
      next.focus();
      ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); next.click(); } };
    }

    ctx.keys = function (e) {
      var k = String(e.key || '').toUpperCase();
      for (var z = 0; z < botones.length; z++) {
        if (botones[z].o.id === k) { e.preventDefault(); responde(botones[z].o, botones[z].el); return; }
      }
    };
  }

  paso();
  return wrap;
};

/* ---- Part 7: multiple matching ----
   Varias secciones y diez preguntas. Lo que se busca no es la
   palabra repetida sino la reformulación: por eso el distractor
   suele contener literalmente las palabras de la pregunta. */
RENDER.matching = function (ex, ctx) {
  var wrap = el('div');
  if (ex.instructions) wrap.appendChild(el('p', 'instruction', ex.instructions));
  if (ex.heading) wrap.appendChild(el('h2', 'reading__title', ex.heading));

  var secciones = ex.sections || [];
  var box = el('div', 'reading__text examtext sections');
  secciones.forEach(function (s) {
    var art = el('div', 'section');
    var h = el('p', 'section__id');
    h.innerHTML = '<b>' + esc(s.id) + '</b>' + (s.title ? ' · ' + esc(s.title) : '');
    art.appendChild(h);
    (isArr(s.text) ? s.text : [s.text]).forEach(function (p) { art.appendChild(el('p', null, p)); });
    box.appendChild(art);
  });
  wrap.appendChild(box);

  if (isArr(ex.glossary) && ex.glossary.length) {
    var gl = el('div', 'glossary');
    ex.glossary.forEach(function (g) {
      var it = el('div', 'glossary__item');
      it.appendChild(el('span', 'glossary__w', g.w));
      it.appendChild(el('span', 'glossary__d', g.d));
      gl.appendChild(it);
    });
    wrap.appendChild(gl);
  }

  var zone = el('div');
  wrap.appendChild(zone);

  var qs = ex.questions || [];
  var i = 0;

  function paso() {
    zone.innerHTML = '';
    if (i >= qs.length) {
      var fin = el('div', 'btn-row');
      var b = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
      fin.appendChild(b);
      zone.appendChild(fin);
      b.focus();
      ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
      return;
    }

    var q = qs[i];
    zone.appendChild(el('p', 'qnum', 'Pregunta ' + (i + 1) + ' de ' + qs.length));
    zone.appendChild(el('p', 'question', q.q));

    var lista = el('div', 'opts opts--row');
    var botones = [];
    var hecho = false;

    secciones.forEach(function (s) {
      var b = el('button', 'opt opt--letter');
      b.type = 'button';
      b.appendChild(el('span', 'opt__key', s.id));
      if (s.title) b.appendChild(el('span', 'opt__t', s.title));
      b.addEventListener('click', function () { responde(s.id); });
      botones.push({ id: s.id, el: b });
      lista.appendChild(b);
    });
    zone.appendChild(lista);

    var after = el('div');
    zone.appendChild(after);

    function responde(id) {
      if (hecho) return;
      hecho = true;
      var ok = id === q.ok;
      botones.forEach(function (x) {
        x.el.disabled = true;
        if (x.id === q.ok) x.el.className = 'opt opt--letter opt--ok';
        else if (x.id === id) x.el.className = 'opt opt--letter opt--bad';
        else x.el.className = 'opt opt--letter opt--dim';
      });

      after.appendChild(trapPanel({
        trap: null,
        ok: 'Sección ' + q.ok + (q.quote ? ' — «' + q.quote + '»' : ''),
        okLabel: ok ? 'Correcta' : 'Estaba en la ' + q.ok,
        why: q.why
      }));

      ctx.score(ok, {
        type: 'mcq',
        question: q.q,
        opts: secciones.map(function (s) { return s.id + (s.title ? ' · ' + s.title : ''); }),
        ok: (function () { for (var z = 0; z < secciones.length; z++) if (secciones[z].id === q.ok) return z; return 0; })(),
        why: q.why,
        instruction: 'Multiple matching'
      });

      var row = el('div', 'btn-row');
      var next = button(i + 1 < qs.length ? 'Siguiente pregunta' : 'Ver el resultado', 'btn--primary', function () { i++; paso(); box.scrollTop = 0; });
      row.appendChild(next);
      after.appendChild(row);
      next.focus();
      ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); next.click(); } };
    }

    ctx.keys = function (e) {
      var k = String(e.key || '').toUpperCase();
      for (var z = 0; z < botones.length; z++) {
        if (botones[z].id === k) { e.preventDefault(); responde(botones[z].id); return; }
      }
    };
  }

  paso();
  return wrap;
};

/* ---- speaking: cronómetro + MediaRecorder + respuesta modelo ---- */
RENDER.speaking = function (ex, ctx) {
  var wrap = el('div');
  var secs = ex.seconds || 60;

  wrap.appendChild(el('p', 'instruction', 'Habla ' + secs + ' segundos sin parar'));
  wrap.appendChild(el('p', 'prompt-es', ex.prompt));

  if (isArr(ex.useful) && ex.useful.length) {
    var u = el('div', 'useful');
    ex.useful.forEach(function (s) { u.appendChild(el('span', null, s)); });
    wrap.appendChild(u);
  }

  var box = el('div', 'rec');
  var btn = el('button', 'rec__btn');
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Empezar a grabar');
  btn.appendChild(el('span'));

  var clockWrap = el('div');
  var clock = el('div', 'rec__clock', fmt(secs));
  var hint = el('div', 'rec__hint', 'Pulsa para grabar');
  clockWrap.appendChild(clock);
  clockWrap.appendChild(hint);

  box.appendChild(btn);
  box.appendChild(clockWrap);
  wrap.appendChild(box);

  var notices = el('div');
  wrap.appendChild(notices);

  var after = el('div');
  wrap.appendChild(after);

  var row = el('div', 'btn-row');
  row.appendChild(button('Ver la respuesta modelo', 'btn--primary', reveal));
  wrap.appendChild(row);

  var rec = null, stream = null, timer = null, left = secs, recording = false;

  function fmt(s) { return '0:' + pad2(Math.max(0, s)); }

  function tick() {
    left--;
    clock.textContent = fmt(left);
    if (left <= 10) clock.className = 'rec__clock is-low';
    if (left <= 0) stop();
  }

  function start() {
    if (recording) { stop(); return; }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof window.MediaRecorder !== 'function') {
      timedOnly('Este navegador no permite grabar aquí (o la página no se sirve por https). El ejercicio sigue: usa el cronómetro y habla en voz alta.');
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (st) {
      stream = st;
      var chunks = [];
      try { rec = new window.MediaRecorder(st); }
      catch (e) { timedOnly('No se pudo iniciar la grabación. Habla igualmente con el cronómetro.'); return; }

      rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
      rec.onstop = function () {
        if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; }
        if (!chunks.length) return;
        var blob = new Blob(chunks, { type: chunks[0].type || 'audio/webm' });
        var audio = document.createElement('audio');
        audio.controls = true;
        audio.src = URL.createObjectURL(blob);
        box.appendChild(audio);
      };
      rec.start();
      began();
    }).catch(function () {
      timedOnly('No has dado permiso al micrófono. No pasa nada: el ejercicio sigue igual, habla en voz alta con el cronómetro.');
    });
  }

  function began() {
    recording = true;
    btn.className = 'rec__btn is-rec';
    btn.setAttribute('aria-label', 'Parar la grabación');
    hint.textContent = 'Grabando · pulsa para parar';
    timer = setInterval(tick, 1000);
  }

  /* sin micrófono: el cronómetro corre igual y el ejercicio no se bloquea */
  function timedOnly(msg) {
    notices.innerHTML = '';
    var n = el('p', 'notice', msg);
    notices.appendChild(n);
    recording = true;
    btn.className = 'rec__btn is-rec';
    hint.textContent = 'Cronómetro en marcha';
    timer = setInterval(tick, 1000);
  }

  function stop() {
    recording = false;
    if (timer) { clearInterval(timer); timer = null; }
    btn.className = 'rec__btn';
    hint.textContent = 'Listo';
    if (rec && rec.state !== 'inactive') { try { rec.stop(); } catch (e) {} }
    if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; }
  }

  btn.addEventListener('click', start);

  var revealed = false;
  function reveal() {
    if (revealed) return;
    revealed = true;
    stop();
    row.innerHTML = '';

    var m = el('div', 'model');
    m.appendChild(el('p', 'model__label', 'Respuesta modelo'));
    m.appendChild(el('p', 'model__text', ex.model));
    var listen = button('Escucharla', 'btn--sm btn--ghost', function () {
      Voice.speak(ex.model, 1, null, null, function () {
        listen.disabled = true;
        listen.textContent = 'Sin voz en inglés en este equipo';
      });
    });
    Voice.whenReady(function (estado) {
      if (estado !== 'ready') {
        listen.disabled = true;
        listen.textContent = 'Sin voz en inglés en este equipo';
      }
    });
    m.appendChild(listen);
    after.appendChild(m);

    var row2 = el('div', 'btn-row');
    var next = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
    row2.appendChild(next);
    after.appendChild(row2);
    next.focus();

    ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
  }

  ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); revealed ? ctx.next() : reveal(); } };
  ctx.cleanup = stop;

  return wrap;
};

/* ---- writing: contador + checklist + texto modelo ---- */
RENDER.writing = function (ex, ctx) {
  var wrap = el('div');
  var min = ex.min || 140, max = ex.max || 190;

  wrap.appendChild(el('p', 'instruction', (ex.kind || 'writing') + ' · ' + min + '–' + max + ' palabras'));
  if (ex.title) wrap.appendChild(el('h2', 'reading__title', ex.title));
  wrap.appendChild(el('p', 'prompt-es', ex.prompt));

  var ta = el('textarea', 'writer');
  ta.setAttribute('aria-label', 'Escribe aquí tu texto');
  ta.placeholder = 'Escribe aquí, en inglés…';
  wrap.appendChild(ta);

  var counter = el('div', 'counter');
  var n = el('b', null, '0');
  var left = el('span', null, 'palabras · objetivo ' + min + '–' + max);
  counter.appendChild(n);
  counter.appendChild(left);
  wrap.appendChild(counter);

  ta.addEventListener('input', function () {
    var c = words(ta.value).length;
    n.textContent = c;
    counter.className = 'counter' + (c > max ? ' is-over' : (c >= min ? ' is-ok' : ''));
  });

  var after = el('div');
  wrap.appendChild(after);

  var row = el('div', 'btn-row');
  row.appendChild(button('He terminado', 'btn--primary', finish));
  wrap.appendChild(row);

  var finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    row.innerHTML = '';

    var box = el('div', 'note');
    box.appendChild(el('h3', null, 'Corrígete tú'));
    box.appendChild(el('p', 'muted', 'Relee tu texto y marca solo lo que de verdad cumple. Aquí no hay corrección automática: mirar tu propio texto con esta lista es el ejercicio.'));
    var ul = el('ul', 'checklist');
    (ex.checklist || []).forEach(function (item, i) {
      var li = el('li');
      var lab = el('label');
      var cb = el('input');
      cb.type = 'checkbox';
      lab.appendChild(cb);
      lab.appendChild(el('span', null, item));
      li.appendChild(lab);
      ul.appendChild(li);
    });
    box.appendChild(ul);
    after.appendChild(box);

    var m = el('div', 'model');
    m.appendChild(el('p', 'model__label', 'Texto modelo · compáralo con el tuyo'));
    var mt = el('div', 'model__text');
    String(ex.model || '').split('\n\n').forEach(function (p) { mt.appendChild(el('p', null, p)); });
    m.appendChild(mt);
    after.appendChild(m);

    var row2 = el('div', 'btn-row');
    var next = button(ctx.lastStep ? 'Terminar' : 'Continuar', 'btn--primary', ctx.next);
    row2.appendChild(next);
    after.appendChild(row2);
    next.focus();

    ctx.keys = function (e) { if (e.key === 'Enter') { e.preventDefault(); ctx.next(); } };
  }

  ctx.keys = function (e) { if (e.key === 'Enter' && finished) { e.preventDefault(); ctx.next(); } };
  return wrap;
};

/* =========================================================
   9b. Pantalla: acceso
   ========================================================= */

function viewLogin(prefill) {
  var v = view('login');
  var card = el('div', 'login');

  card.appendChild(el('p', 'eyebrow', 'Acceso'));
  card.appendChild(el('h1', 'login__title', 'La Trampa'));
  card.appendChild(el('p', 'login__lede', 'Cada cuenta guarda su propio progreso, su XP y su racha.'));

  var form = document.createElement('form');
  form.className = 'login__form';
  form.setAttribute('novalidate', 'novalidate');

  function field(id, label, type, autocomplete) {
    var wrap = el('div', 'field');
    var l = el('label', 'field__l', label);
    l.setAttribute('for', id);
    var i = el('input', 'field__i');
    i.type = type;
    i.id = id;
    i.name = autocomplete;
    i.setAttribute('autocomplete', autocomplete);
    i.setAttribute('autocapitalize', 'off');
    i.setAttribute('autocorrect', 'off');
    i.setAttribute('spellcheck', 'false');
    wrap.appendChild(l);
    wrap.appendChild(i);
    form.appendChild(wrap);
    return i;
  }

  var userInput = field('login-user', 'Usuario', 'text', 'username');
  var passInput = field('login-pass', 'Contraseña', 'password', 'current-password');
  if (prefill) userInput.value = prefill;

  var msg = el('p', 'login__msg');
  msg.setAttribute('role', 'alert');
  form.appendChild(msg);

  var go = el('button', 'btn btn--primary login__go', 'Entrar');
  go.type = 'submit';
  form.appendChild(go);

  card.appendChild(form);
  card.appendChild(el('p', 'login__note',
    'Acceso local, sin servidor: separa perfiles en este dispositivo. El progreso se guarda en este navegador, así que desde otro equipo se empieza de cero.'));

  v.appendChild(card);

  function fail(text) {
    msg.textContent = text;
    msg.className = 'login__msg is-bad';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.textContent = '';
    msg.className = 'login__msg';

    if (!userInput.value.trim() || !passInput.value) {
      fail('Rellena usuario y contraseña.');
      (userInput.value.trim() ? passInput : userInput).focus();
      return;
    }

    /* Derivar la contraseña bloquea el hilo unas décimas de segundo,
       así que dejamos que el navegador pinte el estado antes. */
    go.disabled = true;
    go.textContent = 'Comprobando…';

    setTimeout(function () {
      var r = Auth.login(userInput.value, passInput.value);
      go.disabled = false;
      go.textContent = 'Entrar';

      if (!r.ok) {
        /* mismo mensaje para usuario inexistente y contraseña mala */
        fail('Usuario o contraseña incorrectos.');
        passInput.value = '';
        passInput.focus();
        return;
      }

      openSession(r.user);
      route();
    }, 30);
  });

  mount(v);
  paintSession();
  setTimeout(function () { (prefill ? passInput : userInput).focus(); }, 60);
}

/* =========================================================
   10. Pantalla: mapa
   ========================================================= */

function viewMap() {
  var v = view('map');

  var head = el('div', 'map__head');
  var left = el('div');
  left.appendChild(el('p', 'eyebrow', 'Programa de 60 días'));
  var h1 = el('h1', 'map__title');
  h1.innerHTML = 'Deja de traducir. <em>Empieza a hablar.</em>';
  left.appendChild(h1);
  head.appendChild(left);

  var right = el('div', 'btn-row');
  if (S.missed.length) {
    right.appendChild(button('Repasar fallos (' + Math.min(20, S.missed.length) + ')', 'btn--ghost', function () { goto('#/review'); }));
  }
  head.appendChild(right);
  v.appendChild(head);

  v.appendChild(el('p', 'lede', 'Cada ejercicio te enseña la frase que dirías traduciendo del español, tachada, junto a la que se dice de verdad. Al final del recorrido, cuatro simulacros del Cambridge B2 First.'));

  if (EXAM_PLAN.length) v.appendChild(bannerSimulacros());

  var dn = doneCount();
  var prog = el('div', 'progress');
  var meta = el('div', 'progress__meta');
  meta.innerHTML = '<span>Progreso</span><span><strong>' + dn + '</strong> / ' + TOTAL + ' días</span>';
  var track = el('div', 'progress__track');
  var fill = el('div', 'progress__fill');
  fill.style.width = (dn / TOTAL * 100) + '%';
  track.appendChild(fill);
  prog.appendChild(meta);
  prog.appendChild(track);
  v.appendChild(prog);

  var today = nextOpenDay();

  WEEKS.forEach(function (w) {
    var sec = el('section', 'week');
    var wh = el('div', 'week__head');
    wh.appendChild(el('span', 'week__n', 'Semana ' + w.n));
    wh.appendChild(el('span', 'week__name', w.name));
    wh.appendChild(el('span', 'week__goal', w.goal));
    sec.appendChild(wh);

    var grid = el('div', 'grid');
    for (var n = w.from; n <= w.to; n++) grid.appendChild(cellFor(n, today));
    sec.appendChild(grid);
    v.appendChild(sec);
  });

  /* estantería de trofeos */
  var shelf = el('section', 'shelf');
  shelf.appendChild(el('p', 'eyebrow', 'Trofeos · ' + S.trophies.length + ' de ' + TROPHIES.length));
  var sg = el('div', 'shelf__grid');
  TROPHIES.forEach(function (t) {
    var got = S.trophies.indexOf(t.day) !== -1;
    var card = el('div', 'trophy' + (got ? '' : ' trophy--locked'));
    card.appendChild(el('p', 'trophy__day', 'Día ' + t.day));
    card.appendChild(el('p', 'trophy__name', got ? t.name : 'Bloqueado'));
    card.appendChild(el('p', 'trophy__text', got ? t.text : 'Cierra el día ' + t.day + ' para desbloquearlo.'));
    sg.appendChild(card);
  });
  shelf.appendChild(sg);
  v.appendChild(shelf);

  if (!storageOK) {
    var warn = el('p', 'notice');
    warn.style.marginTop = '2rem';
    warn.textContent = 'Este navegador tiene el almacenamiento bloqueado. Puedes practicar igual, pero el progreso se perderá al cerrar la pestaña.';
    v.appendChild(warn);
  }

  v.appendChild(bloqueDatos());
  mount(v);
}

/* Los simulacros no dependen del recorrido de 60 días, así que van
   arriba del todo y con su propio bloque: metidos en un botón de la
   esquina pasaban desapercibidos. */
function bannerSimulacros() {
  var total = 0, hechas = 0, suma = 0;
  EXAM_PLAN.forEach(function (p) {
    total += p.parts;
    var reg = S.exams && S.exams[p.id];
    if (reg) for (var k in reg) if (reg.hasOwnProperty(k)) { hechas++; suma += reg[k].score || 0; }
  });
  var media = hechas ? Math.round(suma / hechas) : null;

  var b = el('button', 'banner');
  b.type = 'button';

  var izq = el('div', 'banner__body');
  izq.appendChild(el('p', 'banner__eyebrow', 'Simulacros de examen'));
  izq.appendChild(el('p', 'banner__title', 'Haz el examen sin esperar a los 60 días'));
  izq.appendChild(el('p', 'banner__text',
    'Los formatos exactos del Cambridge B2 First, con corrección inmediata pregunta a pregunta. Entras cuando quieras: no hace falta tener días hechos.'));

  var meta = el('p', 'banner__meta');
  if (hechas === 0) meta.textContent = EXAM_PLAN.length + (EXAM_PLAN.length === 1 ? ' prueba disponible · ' : ' pruebas disponibles · ') + total + ' partes · sin empezar';
  else if (hechas < total) meta.textContent = hechas + ' de ' + total + ' partes hechas · media ' + media + '%';
  else meta.textContent = 'Todas las partes hechas · media ' + media + '%';
  izq.appendChild(meta);

  b.appendChild(izq);
  b.appendChild(el('span', 'banner__go', 'Abrir →'));

  b.addEventListener('click', function () { goto('#/exams'); });
  return b;
}

/* Copia de seguridad. El progreso vive en el navegador, así que esta
   es la única forma de moverlo de dispositivo o de recuperarlo si se
   borran los datos del navegador. Las actualizaciones de la web no lo
   tocan: la clave de almacenamiento no cambia nunca. */
function bloqueDatos() {
  var sec = el('section', 'shelf datos');
  sec.appendChild(el('p', 'eyebrow', 'Tus datos'));

  var texto = el('p', 'muted');
  texto.style.maxWidth = '52ch';
  texto.style.marginBottom = '1rem';
  texto.textContent = 'El progreso se guarda en este navegador. Actualizar la web no lo borra, pero limpiar los datos del navegador sí. Guarda una copia si quieres llevártelo a otro dispositivo.';
  sec.appendChild(texto);

  var msg = el('p', 'datos__msg');

  var row = el('div', 'btn-row');
  row.appendChild(button('Guardar copia', 'btn--ghost', function () {
    exportProgress();
    msg.className = 'datos__msg is-ok';
    msg.textContent = 'Copia descargada. Guárdala donde no se te pierda.';
  }));

  var input = el('input');
  input.type = 'file';
  input.accept = 'application/json,.json';
  input.style.display = 'none';
  input.addEventListener('change', function () {
    if (!input.files || !input.files[0]) return;
    var f = input.files[0];
    input.value = '';
    importProgress(f, function (err, res) {
      if (err) { msg.className = 'datos__msg is-bad'; msg.textContent = err; return; }
      msg.className = 'datos__msg is-ok';
      msg.textContent = 'Copia restaurada: ahora tienes ' + res.dias + ' días hechos' +
        (res.nuevos > 0 ? ' (' + res.nuevos + ' nuevos desde la copia).' : '. No había nada nuevo que añadir.');
      setTimeout(function () { viewMap(); }, 1600);
    });
  });
  sec.appendChild(input);

  row.appendChild(button('Restaurar copia', 'btn--ghost', function () { input.click(); }));
  row.appendChild(button('Reiniciar', 'btn--ghost btn--danger btn--sm', resetAll));

  sec.appendChild(row);
  sec.appendChild(msg);
  return sec;
}

function cellFor(n, today) {
  var meta = dayMeta(n) || { n: n, title: 'Día ' + n };
  var done = S.done[n];
  var unlocked = isUnlocked(n);

  var cls = 'cell';
  if (done) cls += ' cell--done';
  else if (!unlocked) cls += ' cell--locked';
  if (n === today && !done) cls += ' cell--today';
  if (meta.rest) cls += ' cell--rest';

  var c = el('button', cls);
  c.type = 'button';
  c.setAttribute('aria-label', 'Día ' + n + ': ' + meta.title + (done ? ' (completado)' : (unlocked ? '' : ' (bloqueado)')));
  if (!unlocked) { c.disabled = true; c.title = 'Termina el día ' + (n - 1) + ' para abrir este.'; }
  else c.title = meta.title;

  c.appendChild(el('span', 'cell__n', pad2(n)));
  c.appendChild(el('span', 'cell__meta', done ? done.score + '%' : (meta.rest ? 'repaso' : (unlocked ? (n === today ? 'hoy' : 'abierto') : ''))));
  if (n === today && !done) c.appendChild(el('span', 'cell__pulse'));

  if (unlocked) c.addEventListener('click', function () { goto('#/day/' + n); });
  return c;
}

function resetAll() {
  if (!window.confirm('Esto borra el progreso, el XP, la racha y los trofeos. ¿Seguro?')) return;
  S = normalizeState(null);
  memory = null;
  if (storageOK) { try { window.localStorage.removeItem(KEY); } catch (e) {} }
  commit();
  goto('#/map');
}

/* =========================================================
   10b. Pantallas: simulacros
   ========================================================= */

var EXAM_PLAN = (window.CURRICULUM && window.CURRICULUM.exams) || [];
var examPending = {};

function loadExam(id, cb) {
  var ya = examById(id);
  if (ya) { cb(ya); return; }
  if (examPending[id]) { examPending[id].push(cb); return; }
  examPending[id] = [cb];

  var plan = null;
  for (var i = 0; i < EXAM_PLAN.length; i++) if (EXAM_PLAN[i].id === id) plan = EXAM_PLAN[i];
  if (!plan) { cerrar(null); return; }

  function cerrar(ex) {
    var l = examPending[id] || [];
    delete examPending[id];
    for (var k = 0; k < l.length; k++) l[k](ex);
  }

  var s = document.createElement('script');
  s.src = 'data/' + plan.file;
  s.async = false;
  s.onload = function () { cerrar(examById(id)); };
  s.onerror = function () { cerrar(null); };
  document.head.appendChild(s);
}

function viewExams() {
  var v = view('exams');
  v.appendChild(el('p', 'eyebrow', 'Simulacros'));
  var h = el('h1', 'map__title');
  h.innerHTML = 'El examen, <em>parte por parte.</em>';
  v.appendChild(h);
  v.appendChild(el('p', 'lede', 'Los formatos exactos del Cambridge B2 First, con el mismo número de preguntas y el mismo tipo de trampa que el examen real. Se corrigen sobre la marcha: cada respuesta te explica por qué. No hacen falta días completados para entrar.'));

  if (!EXAM_PLAN.length) {
    var e = el('div', 'empty');
    e.appendChild(el('h3', null, 'Todavía no hay simulacros'));
    e.appendChild(el('p', null, 'Añade uno en la lista exams de data/curriculum.js y crea su archivo en data/.'));
    v.appendChild(e);
  }

  var lista = el('div', 'exams');
  EXAM_PLAN.forEach(function (p) {
    var hechas = 0, suma = 0;
    var reg = S.exams && S.exams[p.id];
    if (reg) for (var k in reg) if (reg.hasOwnProperty(k)) { hechas++; suma += reg[k].score || 0; }
    var media = hechas ? Math.round(suma / hechas) : null;

    var card = el('button', 'examcard');
    card.type = 'button';
    card.appendChild(el('p', 'examcard__paper', p.paper));
    card.appendChild(el('p', 'examcard__title', p.title));
    card.appendChild(el('p', 'examcard__meta',
      p.parts + ' partes · ' + p.questions + ' preguntas · ' + p.minutes + ' min en el examen real'));

    var estado = el('p', 'examcard__state');
    if (hechas === 0) estado.textContent = 'Sin empezar';
    else if (hechas < p.parts) { estado.textContent = hechas + ' de ' + p.parts + ' partes · media ' + media + '%'; estado.className = 'examcard__state is-part'; }
    else { estado.textContent = 'Completo · media ' + media + '%'; estado.className = 'examcard__state is-done'; }
    card.appendChild(estado);

    card.addEventListener('click', function () { goto('#/exam/' + p.id); });
    lista.appendChild(card);
  });
  v.appendChild(lista);

  var row = el('div', 'btn-row');
  row.style.marginTop = '2rem';
  row.appendChild(button('Volver al mapa', 'btn--ghost', function () { goto('#/map'); }));
  v.appendChild(row);

  mount(v);
}

function viewExam(id) {
  var plan = null;
  for (var i = 0; i < EXAM_PLAN.length; i++) if (EXAM_PLAN[i].id === id) plan = EXAM_PLAN[i];
  if (!plan) { goto('#/exams'); return; }

  var v = view('exam');
  v.appendChild(el('p', 'eyebrow', plan.paper));
  v.appendChild(el('h1', 'cover__title', plan.title));
  v.appendChild(el('p', 'cover__focus', plan.focus || ''));

  var slot = el('div');
  v.appendChild(slot);
  mount(v);

  loadExam(id, function (ex) {
    if (!ex) {
      var e = el('div', 'empty');
      e.appendChild(el('h3', null, 'Este simulacro aún no tiene contenido'));
      var p = el('p');
      p.innerHTML = 'Crea <code>data/' + esc(plan.file) + '</code> con <code>REGISTER_EXAM({…})</code>.';
      e.appendChild(p);
      slot.appendChild(e);
      var r0 = el('div', 'btn-row');
      r0.appendChild(button('Volver', 'btn--ghost', function () { goto('#/exams'); }));
      slot.appendChild(r0);
      return;
    }

    var lista = el('ul', 'blocklist');
    ex.parts.forEach(function (part, idx) {
      var reg = examScore(id, part.n);
      var li = el('li');
      li.style.cursor = 'pointer';
      li.appendChild(el('span', 'blocklist__n', 'P' + part.n));
      var t = el('span', 'blocklist__t', part.title);
      li.appendChild(t);
      var c = el('span', 'blocklist__c', reg ? reg.right + '/' + reg.total + ' · ' + reg.score + '%' : (part.count + ' preguntas'));
      if (reg) c.style.color = reg.score >= 60 ? 'var(--mint)' : 'var(--coral)';
      li.appendChild(c);
      li.addEventListener('click', function () { goto('#/exam/' + id + '/' + idx); });
      lista.appendChild(li);
    });
    slot.appendChild(lista);

    var siguiente = 0;
    for (var k = 0; k < ex.parts.length; k++) if (!examScore(id, ex.parts[k].n)) { siguiente = k; break; }

    var row = el('div', 'btn-row');
    row.style.marginTop = '1.6rem';
    row.appendChild(button('Empezar por la parte ' + ex.parts[siguiente].n, 'btn--primary', function () { goto('#/exam/' + id + '/' + siguiente); }));
    row.appendChild(button('Todos los simulacros', 'btn--ghost', function () { goto('#/exams'); }));
    slot.appendChild(row);
  });
}

function viewExamPart(id, idx) {
  loadExam(id, function (ex) {
    if (!ex || !ex.parts[idx]) { goto('#/exam/' + id); return; }
    var part = ex.parts[idx];
    var acc = { right: 0, total: 0 };

    var v = view('lesson');
    var bar = el('div', 'lesson__bar');
    bar.appendChild(el('span', 'lesson__count', ex.paper || 'Simulacro'));
    var marcador = el('span', 'lesson__count exam__live', '0 / ' + part.count);
    bar.appendChild(marcador);
    bar.appendChild(button('Salir', 'btn--sm btn--ghost lesson__quit', function () {
      if (window.confirm('Si sales ahora, esta parte no se guarda. ¿Salir?')) goto('#/exam/' + id);
    }));
    v.appendChild(bar);

    var host = el('div', 'step');
    host.appendChild(el('p', 'step__block', 'Parte ' + part.n + ' · ' + part.title));
    v.appendChild(host);

    var ctx = {
      lastStep: true,
      keys: null, focus: null, cleanup: null,
      score: function (ok, exNotebook) {
        acc.total++;
        if (ok) acc.right++;
        marcador.textContent = acc.right + ' / ' + part.count;
        marcador.className = 'lesson__count exam__live' + (ok ? ' is-hit' : ' is-miss');
        var gan = ok ? 10 : 2;
        S.xp += gan;
        if (!ok && exNotebook) addMissed(0, exNotebook, (ex.paper || 'Simulacro') + ' · parte ' + part.n);
        commit();
        feedback(ok, gan);
      },
      next: function () {
        var score = acc.total ? Math.round(acc.right / acc.total * 100) : 100;
        saveExamPart(id, part.n, score, acc.right, acc.total);
        viewExamPartEnd(id, idx, score, acc);
      }
    };

    var node;
    try { node = RENDER[part.type](part, ctx); }
    catch (e) {
      console.error('[La Trampa] Error en la parte ' + part.n + ':', e);
      node = el('p', 'notice notice--bad', 'Esta parte tiene un problema. Mira la consola.');
    }
    host.appendChild(node);

    mount(v);
    Keys.set(function (e) { if (ctx.keys) ctx.keys(e); });
  });
}

function viewExamPartEnd(id, idx, score, acc) {
  loadExam(id, function (ex) {
    var part = ex.parts[idx];
    var v = view('end');
    v.appendChild(el('p', 'eyebrow', (ex.paper || 'Simulacro') + ' · parte ' + part.n + ' terminada'));
    v.appendChild(el('p', 'end__xp', score + '%'));
    v.appendChild(el('p', 'end__xpl', acc.right + ' de ' + acc.total + ' correctas'));
    v.appendChild(el('h1', 'end__title', tituloExamen(score)));

    var hay = idx + 1 < ex.parts.length;
    var row = el('div', 'btn-row');
    if (hay) row.appendChild(button('Parte ' + ex.parts[idx + 1].n, 'btn--primary', function () { goto('#/exam/' + id + '/' + (idx + 1)); }));
    row.appendChild(button('Ver el simulacro', hay ? 'btn--ghost' : 'btn--primary', function () { goto('#/exam/' + id); }));
    v.appendChild(row);
    mount(v);
    Keys.set(function (e) {
      if (e.key === 'Enter') { e.preventDefault(); goto(hay ? '#/exam/' + id + '/' + (idx + 1) : '#/exam/' + id); }
    });
  });
}

/* El B2 First se aprueba a partir de 60%. Por debajo de 50 no hay nivel. */
function tituloExamen(s) {
  if (s >= 90) return 'Nivel de sobra.';
  if (s >= 75) return 'Aprobado con margen.';
  if (s >= 60) return 'Aprobado, pero justo.';
  if (s >= 45) return 'Todavía no llega.';
  return 'Esta parte hay que trabajarla entera.';
}

/* =========================================================
   11. Pantalla: portada de la lección
   ========================================================= */

function viewCover(n) {
  var meta = dayMeta(n);
  if (!meta) { goto('#/map'); return; }

  var v = view('cover');
  var w = weekOf(n);

  v.appendChild(el('p', 'eyebrow', (w ? 'Semana ' + w.n + ' · ' + w.name : 'Programa') + (meta.rest ? ' · día de repaso' : '')));
  v.appendChild(el('p', 'cover__num', pad2(n)));
  v.appendChild(el('h1', 'cover__title', meta.title));
  v.appendChild(el('p', 'cover__focus', meta.focus));
  v.appendChild(tagRow(meta.skills));

  var slot = el('div');
  v.appendChild(slot);
  mount(v);

  loadDay(n, function (day) {
    if (!day) {
      var box = el('div', 'empty');
      box.appendChild(el('h3', null, 'Este día está planificado pero aún no tiene ejercicios'));
      var p = el('p');
      p.innerHTML = 'Crea el archivo <code>data/day-' + pad2(n) + '.js</code>' +
                    (n === 1 ? ' con el formato que describe el README' : ' siguiendo el modelo de <code>data/day-01.js</code>') + '. ' +
                    'El motor lo recogerá solo: no hay que tocar <code>app.js</code> ni <code>index.html</code>.';
      box.appendChild(p);
      slot.appendChild(box);

      var row0 = el('div', 'btn-row');
      row0.appendChild(button('Volver al mapa', 'btn--ghost', function () { goto('#/map'); }));
      slot.appendChild(row0);
      return;
    }

    var steps = flatten(day);
    var list = el('ul', 'blocklist');
    (day.blocks || []).forEach(function (b, i) {
      var count = (b.items || []).filter(function (it) { return it && RENDER[it.type]; }).length;
      var li = el('li');
      li.appendChild(el('span', 'blocklist__n', pad2(i + 1)));
      li.appendChild(el('span', 'blocklist__t', b.title));
      li.appendChild(el('span', 'blocklist__c', count + (count === 1 ? ' paso' : ' pasos')));
      list.appendChild(li);
    });
    slot.appendChild(list);

    var mins = day.minutes || Math.max(15, Math.round(steps.length * 1.8));
    slot.appendChild(el('p', 'muted mono', steps.length + ' pasos · unos ' + mins + ' minutos'));

    var row = el('div', 'btn-row');
    row.style.marginTop = '1.6rem';
    row.appendChild(button(S.done[n] ? 'Repetir el día' : 'Empezar', 'btn--primary', function () { goto('#/lesson/' + n); }));
    row.appendChild(button('Volver al mapa', 'btn--ghost', function () { goto('#/map'); }));
    slot.appendChild(row);
  });
}

function flatten(day) {
  var steps = [];
  (day.blocks || []).forEach(function (b) {
    (b.items || []).forEach(function (it) {
      if (!it || !it.type || !RENDER[it.type]) {
        console.warn('[La Trampa] Tipo de ejercicio desconocido, se omite este paso:', it && it.type, it);
        return;
      }
      steps.push({ block: b.title, ex: it });
    });
  });
  return steps;
}

/* =========================================================
   12. Pantalla: lección
   ========================================================= */

var run = null;

function viewLesson(n) {
  loadDay(n, function (day) {
    if (!day) { goto('#/day/' + n); return; }
    var steps = flatten(day);
    if (!steps.length) { goto('#/day/' + n); return; }

    run = {
      day: n,
      title: day.title || (dayMeta(n) || {}).title || ('Día ' + n),
      steps: steps,
      i: 0,
      right: 0,
      wrong: 0,
      xp: 0,
      marks: [],
      missed: []
    };
    renderStep();
  });
}

function renderStep() {
  if (!run) { goto('#/map'); return; }
  if (run.i >= run.steps.length) { finishDay(); return; }

  var step = run.steps[run.i];
  var v = view('lesson');

  /* barra de pasos */
  var bar = el('div', 'lesson__bar');
  var dots = el('div', 'dots');
  for (var i = 0; i < run.steps.length; i++) {
    var cls = 'dot';
    if (i === run.i) cls += ' dot--now';
    else if (run.marks[i] === true) cls += ' dot--done';
    else if (run.marks[i] === false) cls += ' dot--fail';
    dots.appendChild(el('span', cls));
  }
  bar.appendChild(dots);
  bar.appendChild(el('span', 'lesson__count', pad2(run.i + 1) + ' / ' + pad2(run.steps.length)));
  var quit = button('Salir', 'btn--sm btn--ghost lesson__quit', function () {
    if (window.confirm('Si sales ahora, este día no se guarda. ¿Salir?')) { run = null; goto('#/map'); }
  });
  bar.appendChild(quit);
  v.appendChild(bar);

  var host = el('div', 'step');
  host.appendChild(el('p', 'step__block', step.block || run.title));
  v.appendChild(host);

  var ctx = {
    lastStep: run.i === run.steps.length - 1,
    keys: null,
    focus: null,
    cleanup: null,
    score: function (ok, exForNotebook) {
      if (ok) { run.right++; run.xp += 10; }
      else {
        run.wrong++;
        run.xp += 2;
        var target = exForNotebook || step.ex;
        run.missed.push(target);
        addMissed(run.day, target, run.title);
      }
      if (run.marks[run.i] !== false) run.marks[run.i] = ok;
      /* repinta el punto actual sin volver a montar la pantalla */
      var d = dots.children[run.i];
      if (d) d.className = 'dot dot--now ' + (ok ? 'dot--hit' : 'dot--miss');
      feedback(ok, ok ? 10 : 2);
      paintStats();
    },
    next: function () {
      if (ctx.cleanup) { try { ctx.cleanup(); } catch (e) {} }
      if (run.marks[run.i] === undefined) run.marks[run.i] = true;
      run.i++;
      renderStep();
    }
  };

  var node;
  try {
    node = RENDER[step.ex.type](step.ex, ctx);
  } catch (e) {
    console.error('[La Trampa] Error al renderizar el paso ' + (run.i + 1) + ':', e);
    node = el('p', 'notice notice--bad', 'Este paso tiene un problema y se ha saltado. Mira la consola para el detalle.');
    var skipRow = el('div', 'btn-row');
    skipRow.appendChild(button('Continuar', 'btn--primary', ctx.next));
    var holder = el('div');
    holder.appendChild(node);
    holder.appendChild(skipRow);
    node = holder;
  }
  host.appendChild(node);

  mount(v);
  Keys.set(function (e) { if (ctx.keys) ctx.keys(e); });
  if (ctx.focus) setTimeout(ctx.focus, 60);
}

/* =========================================================
   13. Cierre del día y fin de pantalla
   ========================================================= */

function finishDay() {
  var n = run.day;
  var total = run.right + run.wrong;
  var score = total ? Math.round(run.right / total * 100) : 100;
  var first = !S.done[n];
  var gained = run.xp + (first ? 25 : 0);

  /* racha: ayer suma, hoy no cambia, antes reinicia */
  var today = todayISO();
  var streakEvent = 'same';
  if (S.last !== today) {
    if (S.last === yesterdayISO()) { S.streak = S.streak + 1; streakEvent = 'up'; }
    else { S.streak = 1; streakEvent = (S.last ? 'reset' : 'start'); }
    S.last = today;
  }

  var prev = S.done[n];
  S.done[n] = {
    score: prev ? Math.max(prev.score, score) : score,
    xp: (prev ? prev.xp : 0) + gained,
    date: today
  };
  S.xp += gained;

  var trophy = trophyFor(n);
  var newTrophy = null;
  if (trophy && S.trophies.indexOf(n) === -1) { S.trophies.push(n); newTrophy = trophy; }

  commit();

  var summary = {
    n: n, score: score, gained: gained, first: first,
    right: run.right, wrong: run.wrong,
    missed: run.missed.slice(0),
    trophy: newTrophy, streakEvent: streakEvent
  };
  run = null;
  viewEnd(summary);
}

function viewEnd(r) {
  var v = view('end');

  v.appendChild(el('p', 'eyebrow', 'Día ' + pad2(r.n) + ' cerrado'));
  v.appendChild(el('p', 'end__xp', '+' + r.gained));
  v.appendChild(el('p', 'end__xpl', 'XP' + (r.first ? ' · incluye +25 por cerrarlo' : '')));

  v.appendChild(el('h1', 'end__title', headline(r.score)));

  var line = el('div', 'scoreline');
  line.appendChild(scorebox(r.score + '%', 'Aciertos', 'scorebox--mint'));
  line.appendChild(scorebox(r.right + '/' + (r.right + r.wrong), 'Respuestas', ''));
  line.appendChild(scorebox(String(S.streak), streakLabel(r.streakEvent), 'scorebox--fire'));
  v.appendChild(line);

  if (r.trophy) {
    var t = el('div', 'trophy trophy--big');
    t.appendChild(el('p', 'trophy__day', 'Trofeo desbloqueado · día ' + r.trophy.day));
    t.appendChild(el('p', 'trophy__name', r.trophy.name));
    t.appendChild(el('p', 'trophy__text', r.trophy.text));
    v.appendChild(t);
  }

  if (r.missed.length) {
    var box = el('div', 'misslist');
    box.appendChild(el('h3', null, 'Lo que se te escapó hoy'));
    var ul = el('ul');
    r.missed.forEach(function (ex) {
      var txt = ex.es || ex.question || ex.audio || ex.text || 'Ejercicio';
      if (ex.type === 'gap' && ex.text) txt = ex.text.replace('___', '…');
      ul.appendChild(el('li', null, txt));
    });
    box.appendChild(ul);
    var p = el('p', 'muted');
    p.style.marginTop = '.9rem';
    p.textContent = 'Están guardados en el cuaderno de fallos. Los tienes en el mapa, en «Repasar fallos».';
    box.appendChild(p);
    v.appendChild(box);
  }

  var row = el('div', 'btn-row');
  var nextDay = r.n + 1;
  if (nextDay <= TOTAL) row.appendChild(button('Ir al día ' + pad2(nextDay), 'btn--primary', function () { goto('#/day/' + nextDay); }));
  row.appendChild(button('Volver al mapa', 'btn--ghost', function () { goto('#/map'); }));
  v.appendChild(row);

  mount(v);
  Keys.set(function (e) { if (e.key === 'Enter') { e.preventDefault(); goto(nextDay <= TOTAL ? '#/day/' + nextDay : '#/map'); } });
}

function scorebox(n, label, cls) {
  var b = el('div', 'scorebox ' + (cls || ''));
  b.appendChild(el('div', 'scorebox__n', n));
  b.appendChild(el('div', 'scorebox__l', label));
  return b;
}

function headline(score) {
  if (score >= 95) return 'Limpio de calcos.';
  if (score >= 80) return 'Sólido. Quedan flecos.';
  if (score >= 60) return 'El español todavía se te cuela.';
  return 'Hoy ha ganado la traducción literal.';
}

function streakLabel(ev) {
  if (ev === 'up') return 'días seguidos';
  if (ev === 'start') return 'racha iniciada';
  if (ev === 'reset') return 'racha reiniciada';
  return 'días seguidos';
}

/* =========================================================
   14. Pantalla: repaso del cuaderno de fallos
   ========================================================= */

var review = null;

function viewReview() {
  if (!S.missed.length) {
    var v0 = view();
    v0.appendChild(el('p', 'eyebrow', 'Cuaderno de fallos'));
    v0.appendChild(el('h1', 'cover__title', 'No tienes nada pendiente de repasar.'));
    v0.appendChild(el('p', 'lede', 'Cada ejercicio que falles se guarda aquí hasta que lo repases.'));
    var r0 = el('div', 'btn-row');
    r0.style.marginTop = '1.6rem';
    r0.appendChild(button('Volver al mapa', 'btn--primary', function () { goto('#/map'); }));
    v0.appendChild(r0);
    mount(v0);
    return;
  }

  if (!review) {
    var batch = S.missed.slice(Math.max(0, S.missed.length - 20));
    review = { items: batch, i: 0, right: 0, wrong: 0, xp: 0 };
  }
  renderReviewStep();
}

function renderReviewStep() {
  if (review.i >= review.items.length) { finishReview(); return; }

  var item = review.items[review.i];
  var v = view('lesson');

  var bar = el('div', 'lesson__bar');
  var dots = el('div', 'dots');
  for (var i = 0; i < review.items.length; i++) {
    dots.appendChild(el('span', 'dot' + (i === review.i ? ' dot--now' : (i < review.i ? ' dot--done' : ''))));
  }
  bar.appendChild(dots);
  bar.appendChild(el('span', 'lesson__count', pad2(review.i + 1) + ' / ' + pad2(review.items.length)));
  bar.appendChild(button('Salir', 'btn--sm btn--ghost lesson__quit', function () { review = null; goto('#/map'); }));
  v.appendChild(bar);

  var host = el('div', 'step');
  host.appendChild(el('p', 'step__block', 'Cuaderno de fallos · ' +
    (item.day ? 'del día ' + pad2(item.day) : (item.label || 'simulacro'))));
  v.appendChild(host);

  /* El repaso guarda paso a paso: si sales a la mitad, lo repasado
     se queda repasado y el XP ganado no se pierde. */
  var ctx = {
    lastStep: review.i === review.items.length - 1,
    keys: null, focus: null, cleanup: null,
    score: function (ok) {
      var gained = ok ? 10 : 2;
      if (ok) review.right++; else review.wrong++;
      review.xp += gained;
      S.xp += gained;
      dropMissed(item.id);
      commit();
      feedback(ok, gained);
    },
    next: function () {
      if (ctx.cleanup) { try { ctx.cleanup(); } catch (e) {} }
      dropMissed(item.id);
      commit();
      review.i++;
      renderReviewStep();
    }
  };

  var renderer = RENDER[item.ex && item.ex.type];
  if (!renderer) { ctx.next(); return; }
  host.appendChild(renderer(item.ex, ctx));

  mount(v);
  Keys.set(function (e) { if (ctx.keys) ctx.keys(e); });
  if (ctx.focus) setTimeout(ctx.focus, 60);
}

function finishReview() {
  var total = review.right + review.wrong;
  var score = total ? Math.round(review.right / total * 100) : 100;
  commit();

  var v = view('end');
  v.appendChild(el('p', 'eyebrow', 'Repaso terminado'));
  v.appendChild(el('p', 'end__xp', '+' + review.xp));
  v.appendChild(el('p', 'end__xpl', 'XP'));
  v.appendChild(el('h1', 'end__title', score >= 80 ? 'Eso ya no se te escapa.' : 'Sigue estando verde. Vuelve mañana.'));

  var line = el('div', 'scoreline');
  line.appendChild(scorebox(score + '%', 'Aciertos', 'scorebox--mint'));
  line.appendChild(scorebox(String(total), 'Repasados', ''));
  line.appendChild(scorebox(String(S.missed.length), 'Siguen pendientes', S.missed.length ? '' : 'scorebox--mint'));
  v.appendChild(line);

  var row = el('div', 'btn-row');
  row.appendChild(button('Volver al mapa', 'btn--primary', function () { goto('#/map'); }));
  v.appendChild(row);

  review = null;
  mount(v);
}

/* =========================================================
   15. Router
   ========================================================= */

function route() {
  /* sin sesión no se llega a ninguna pantalla */
  if (!Auth || !Auth.current()) { viewLogin(); return; }
  if (!KEY) openSession(Auth.current());

  var h = String(location.hash || '').replace(/^#\/?/, '');
  var parts = h.split('/');
  var what = parts[0] || 'map';
  var n = parseInt(parts[1], 10);

  if (what === 'day' && n >= 1 && n <= TOTAL) {
    if (!isUnlocked(n)) { goto('#/map'); return; }
    run = null;
    viewCover(n);
    return;
  }
  if (what === 'lesson' && n >= 1 && n <= TOTAL) {
    if (!isUnlocked(n)) { goto('#/map'); return; }
    viewLesson(n);
    return;
  }
  if (what === 'review') { viewReview(); return; }
  if (what === 'exams') { viewExams(); return; }
  if (what === 'exam' && parts[1]) {
    if (parts[2] !== undefined && parts[2] !== '') viewExamPart(parts[1], parseInt(parts[2], 10) || 0);
    else viewExam(parts[1]);
    return;
  }

  run = null;
  review = null;
  viewMap();
}

window.addEventListener('hashchange', route);

/* =========================================================
   16. Arranque
   ========================================================= */

if (!DAYS.length) {
  app.innerHTML = '<div class="empty"><h3>Falta el currículo</h3>' +
    '<p>No se ha podido cargar <code>data/curriculum.js</code>. ' +
    'Comprueba que el archivo existe y que <code>index.html</code> lo carga antes que <code>assets/app.js</code>.</p></div>';
} else if (!Auth || !Auth.count()) {
  app.innerHTML = '<div class="empty"><h3>Faltan las cuentas</h3>' +
    '<p>No se ha podido cargar <code>data/users.js</code> o <code>assets/auth.js</code>, ' +
    'o la lista de cuentas está vacía. <code>index.html</code> tiene que cargar los dos ' +
    'antes que <code>assets/app.js</code>.</p></div>';
} else {
  var session = Auth.current();
  if (session) openSession(session);
  else paintSession();
  route();
}

})();
