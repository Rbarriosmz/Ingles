/* =========================================================
   La Trampa — motor
   Vanilla JS. Sin dependencias, sin build, sin fetch().
   Las lecciones se cargan inyectando <script>, para que la web
   funcione también abriendo index.html con doble clic (file://).
   ========================================================= */

(function () {
'use strict';

/* =========================================================
   1. Almacenamiento: localStorage con fallback a memoria
   ========================================================= */

var KEY = 'latrampa.v1';

var DEFAULTS = { done:{}, xp:0, streak:0, last:null, missed:[], trophies:[] };

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
  s.done    = (raw.done && typeof raw.done === 'object') ? raw.done : {};
  s.xp      = typeof raw.xp === 'number' && isFinite(raw.xp) ? raw.xp : 0;
  s.streak  = typeof raw.streak === 'number' && isFinite(raw.streak) ? raw.streak : 0;
  s.last    = typeof raw.last === 'string' ? raw.last : null;
  s.missed  = Object.prototype.toString.call(raw.missed) === '[object Array]' ? raw.missed : [];
  s.trophies = Object.prototype.toString.call(raw.trophies) === '[object Array]' ? raw.trophies : [];
  return s;
}

function loadState() {
  if (storageOK) {
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
  if (!storageOK) return false;
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

var S = loadState();

function commit() { saveState(S); paintStats(); }

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
   5. Voz del navegador (listening y modelos de speaking)
   ========================================================= */

var Voice = {
  available: ('speechSynthesis' in window) && typeof window.SpeechSynthesisUtterance === 'function',
  voice: null,
  pick: function () {
    if (!Voice.available) return;
    var vs = [];
    try { vs = window.speechSynthesis.getVoices() || []; } catch (e) { return; }
    var gb = null, en = null;
    for (var i = 0; i < vs.length; i++) {
      var lang = (vs[i].lang || '').replace('_', '-');
      if (!gb && /^en-GB/i.test(lang)) gb = vs[i];
      if (!en && /^en/i.test(lang)) en = vs[i];
    }
    Voice.voice = gb || en || null;
  },
  speak: function (text, rate, onStart, onEnd) {
    if (!Voice.available) { if (onEnd) onEnd(); return null; }
    try {
      window.speechSynthesis.cancel();
      var u = new window.SpeechSynthesisUtterance(String(text));
      u.lang = 'en-GB';
      u.rate = rate || 1;
      u.pitch = 1;
      if (Voice.voice) u.voice = Voice.voice;
      u.onstart = function () { if (onStart) onStart(); };
      u.onend = function () { if (onEnd) onEnd(); };
      u.onerror = function () { if (onEnd) onEnd(); };
      window.speechSynthesis.speak(u);
      return u;
    } catch (e) {
      console.warn('[La Trampa] speechSynthesis falló:', e);
      if (onEnd) onEnd();
      return null;
    }
  },
  stop: function () { if (Voice.available) { try { window.speechSynthesis.cancel(); } catch (e) {} } }
};

if (Voice.available) {
  Voice.pick();
  try { window.speechSynthesis.onvoiceschanged = Voice.pick; } catch (e) {}
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

function paintStats() {
  var xp = document.getElementById('stat-xp');
  var st = document.getElementById('stat-streak');
  var dn = document.getElementById('stat-done');
  if (xp) xp.textContent = S.xp;
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
function playerBox(text, label) {
  var box = el('div', 'player');

  var play = el('button', 'player__play');
  play.type = 'button';
  play.setAttribute('aria-label', 'Reproducir el audio');
  play.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  var meta = el('div', 'player__meta');
  meta.appendChild(el('span', 'player__label', label || 'Audio · voz del navegador'));
  var rateLabel = el('span', 'player__rate', 'Velocidad normal');
  meta.appendChild(rateLabel);

  var wave = el('div', 'wave');
  for (var i = 0; i < 7; i++) wave.appendChild(el('i'));

  var slow = el('button', 'btn btn--sm btn--ghost', '0.7×');
  slow.type = 'button';

  box.appendChild(play);
  box.appendChild(meta);
  box.appendChild(wave);
  box.appendChild(slow);

  function run(rate) {
    rateLabel.textContent = rate < 1 ? 'Velocidad lenta · 0.7×' : 'Velocidad normal';
    Voice.speak(text, rate,
      function () { play.className = 'player__play is-playing'; wave.className = 'wave is-on'; },
      function () { play.className = 'player__play'; wave.className = 'wave'; }
    );
  }

  play.addEventListener('click', function () { run(1); });
  slow.addEventListener('click', function () { run(0.7); });

  if (!Voice.available) {
    var warn = el('p', 'notice', 'Este navegador no tiene sintetizador de voz. Puedes leer la transcripción al responder.');
    var outer = el('div');
    outer.appendChild(warn);
    outer.appendChild(box);
    return { node: outer, play: function () { run(1); } };
  }

  return { node: box, play: function () { run(1); } };
}

RENDER.listening = function (ex, ctx) {
  var wrap = el('div');
  wrap.appendChild(el('p', 'instruction', ex.mode === 'dictation'
    ? 'Escucha y escribe exactamente lo que oyes'
    : 'Escucha y elige la respuesta correcta'));

  var player = playerBox(ex.audio, 'Audio · escúchalo las veces que quieras');
  wrap.appendChild(player.node);

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

    ctx.keys = function (e) {
      if (e.key === 'Enter' && !answered) { e.preventDefault(); submit(); }
      else if (e.key === 'Enter') { e.preventDefault(); ctx.next(); }
    };
    ctx.focus = function () { player.play(); };
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
  ctx.focus = function () { player.play(); };

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
    var listen = button('Escucharla', 'btn--sm btn--ghost', function () { Voice.speak(ex.model, 1); });
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
  right.appendChild(button('Reiniciar', 'btn--ghost btn--danger btn--sm', resetAll));
  head.appendChild(right);
  v.appendChild(head);

  v.appendChild(el('p', 'lede', 'Cada ejercicio te enseña la frase que dirías traduciendo del español, tachada, junto a la que se dice de verdad. Al final del recorrido, cuatro simulacros del Cambridge B2 First.'));

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

  mount(v);
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
      if (d) d.className = 'dot dot--now';
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
  host.appendChild(el('p', 'step__block', 'Cuaderno de fallos · del día ' + pad2(item.day)));
  v.appendChild(host);

  var ctx = {
    lastStep: review.i === review.items.length - 1,
    keys: null, focus: null, cleanup: null,
    score: function (ok) {
      if (ok) { review.right++; review.xp += 10; }
      else { review.wrong++; review.xp += 2; }
      dropMissed(item.id);
      /* si vuelve a fallar, vuelve al cuaderno para otra ronda */
      if (!ok) addMissed(item.day, item.ex, item.label);
    },
    next: function () {
      if (ctx.cleanup) { try { ctx.cleanup(); } catch (e) {} }
      dropMissed(item.id);
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
  S.xp += review.xp;
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
} else {
  paintStats();
  route();
}

})();
