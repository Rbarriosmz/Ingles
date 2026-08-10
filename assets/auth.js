/* =========================================================
   La Trampa — acceso

   IMPORTANTE, LÉELO ANTES DE CONFIAR EN ESTO:

   Esta web es estática. No hay servidor que valide nada, así que
   la comprobación de la contraseña ocurre entera en el navegador
   de quien entra. Cualquiera con las herramientas de desarrollo
   puede saltársela. Esto NO es seguridad: es una cerradura para
   separar dos perfiles de progreso en el mismo dispositivo.

   Las contraseñas no se guardan en claro: en data/users.js solo
   está el SHA-256 con sal, iterado 50.000 veces. Eso evita que
   se lean de un vistazo en un repositorio público, pero un ataque
   de diccionario contra una contraseña débil funcionaría.

   No metas aquí nada que te importe de verdad, y no reutilices
   una contraseña que uses en otro sitio.

   El SHA-256 va implementado a mano en lugar de usar crypto.subtle
   porque esa API no existe en file://, y la web tiene que seguir
   funcionando al abrir index.html con doble clic.
   ========================================================= */

window.LT_AUTH = (function () {
'use strict';

var SESSION_KEY = 'latrampa.session';

/* =========================================================
   1. SHA-256
   ========================================================= */

/* Las constantes son las partes fraccionarias de las raíces
   cuadradas (H) y cúbicas (K) de los 64 primeros primos.
   Se generan aquí para no arrastrar una tabla copiada a mano. */
var K = [], H0 = [];
(function () {
  function frac(x) { return ((x - Math.floor(x)) * 4294967296) | 0; }
  var n = 2, i = 0;
  while (i < 64) {
    var prime = true;
    for (var d = 2; d * d <= n; d++) if (n % d === 0) { prime = false; break; }
    if (prime) {
      if (i < 8) H0[i] = frac(Math.pow(n, 1 / 2));
      K[i] = frac(Math.pow(n, 1 / 3));
      i++;
    }
    n++;
  }
})();

function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }

function hex32(x) {
  var s = '';
  for (var i = 7; i >= 0; i--) s += ((x >>> (i * 4)) & 15).toString(16);
  return s;
}

var ZEROS = new Array(65).join('\x00');
var W = new Array(64);          /* se reutiliza: el hash se llama miles de veces */

/* msg tiene que ser una cadena de bytes: cada carácter de 0 a 255 */
function sha256(msg) {
  var h = H0.slice(0);
  var bitLen = msg.length * 8;

  /* El relleno se monta de una sola vez. Hacerlo carácter a carácter
     en un bucle copiaba la cadena entera en cada vuelta y se comía
     la mayor parte del tiempo de la derivación. */
  var zeros = (56 - (msg.length + 1) % 64 + 64) % 64;
  msg += '\x80' + ZEROS.slice(0, zeros) + '\x00\x00\x00\x00' +
         String.fromCharCode((bitLen >>> 24) & 255, (bitLen >>> 16) & 255, (bitLen >>> 8) & 255, bitLen & 255);

  var w = W, i, offset;

  for (offset = 0; offset < msg.length; offset += 64) {
    for (i = 0; i < 16; i++) {
      w[i] = (msg.charCodeAt(offset + i * 4) << 24) |
             (msg.charCodeAt(offset + i * 4 + 1) << 16) |
             (msg.charCodeAt(offset + i * 4 + 2) << 8) |
             (msg.charCodeAt(offset + i * 4 + 3));
    }
    for (i = 16; i < 64; i++) {
      var x = w[i - 15], y = w[i - 2];
      var s0 = rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3);
      var s1 = rotr(y, 17) ^ rotr(y, 19) ^ (y >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }

    var a = h[0], b = h[1], c = h[2], d = h[3],
        e = h[4], f = h[5], g = h[6], hh = h[7];

    for (i = 0; i < 64; i++) {
      var S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      var ch = (e & f) ^ (~e & g);
      var t1 = (hh + S1 + ch + K[i] + w[i]) | 0;
      var S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      var maj = (a & b) ^ (a & c) ^ (b & c);
      var t2 = (S0 + maj) | 0;
      hh = g; g = f; f = e; e = (d + t1) | 0;
      d = c; c = b; b = a; a = (t1 + t2) | 0;
    }

    h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0;
    h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0;
    h[4] = (h[4] + e) | 0; h[5] = (h[5] + f) | 0;
    h[6] = (h[6] + g) | 0; h[7] = (h[7] + hh) | 0;
  }

  var out = '';
  for (i = 0; i < 8; i++) out += hex32(h[i]);
  return out;
}

/* pasa una cadena de texto a cadena de bytes UTF-8 */
function utf8(str) {
  return unescape(encodeURIComponent(String(str)));
}

/* =========================================================
   2. Derivación de la contraseña
   ========================================================= */

function config() {
  var u = window.USERS || {};
  return {
    salt: typeof u.salt === 'string' ? u.salt : 'la-trampa',
    rounds: typeof u.rounds === 'number' && u.rounds > 0 ? u.rounds : 50000,
    list: Object.prototype.toString.call(u.list) === '[object Array]' ? u.list : []
  };
}

/* Iterar encarece el ataque por fuerza bruta. No lo hace imposible:
   con una contraseña corta o de diccionario, 50.000 vueltas no salvan nada. */
function derive(password, salt, rounds) {
  var h = sha256(utf8(salt) + '\x00' + utf8(password));
  for (var i = 1; i < rounds; i++) h = sha256(h);
  return h;
}

function hashFor(password) {
  var c = config();
  return derive(password, c.salt, c.rounds);
}

/* comparación en tiempo constante, por higiene */
function sameHash(a, b) {
  a = String(a); b = String(b);
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/* =========================================================
   3. Sesión
   ========================================================= */

var memorySession = null;

function storageOK() {
  try {
    var p = '__lt_auth__';
    window.localStorage.setItem(p, '1');
    window.localStorage.removeItem(p);
    return true;
  } catch (e) { return false; }
}

function readSession() {
  if (storageOK()) {
    try {
      var v = window.localStorage.getItem(SESSION_KEY);
      if (v) return v;
    } catch (e) {}
  }
  return memorySession;
}

function writeSession(id) {
  memorySession = id;
  if (!storageOK()) return;
  try {
    if (id) window.localStorage.setItem(SESSION_KEY, id);
    else window.localStorage.removeItem(SESSION_KEY);
  } catch (e) {}
}

function findUser(id) {
  var list = config().list;
  id = String(id == null ? '' : id).trim().toLowerCase();
  for (var i = 0; i < list.length; i++) {
    if (String(list[i].id).toLowerCase() === id) return list[i];
  }
  return null;
}

/* =========================================================
   4. API pública
   ========================================================= */

return {

  /* expuestos para poder generar hashes nuevos desde la consola */
  sha256: sha256,
  hash: hashFor,

  /* usuario con la sesión abierta, o null */
  current: function () {
    var id = readSession();
    if (!id) return null;
    var u = findUser(id);
    if (!u) { writeSession(null); return null; }   /* el usuario ya no existe */
    return u;
  },

  /* devuelve {ok:true, user} o {ok:false, reason:'user'|'password'|'empty'} */
  login: function (id, password) {
    if (!String(id || '').trim() || !String(password || '')) {
      return { ok: false, reason: 'empty' };
    }
    var u = findUser(id);
    if (!u) return { ok: false, reason: 'user' };
    if (!sameHash(hashFor(password), u.hash)) return { ok: false, reason: 'password' };
    writeSession(u.id);
    return { ok: true, user: u };
  },

  logout: function () { writeSession(null); },

  /* clave de localStorage donde vive el progreso de este usuario */
  storageKey: function () {
    var u = this.current();
    return u ? 'latrampa.v1.' + u.id : null;
  },

  count: function () { return config().list.length; }

};

})();
