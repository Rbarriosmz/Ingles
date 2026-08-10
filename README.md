# La Trampa

Programa de **60 días para pasar de B1 a B2** en inglés, diseñado para hispanohablantes cuyo problema principal es traducir literalmente del español. Termina en cuatro simulacros del **Cambridge B2 First (FCE)**.

Se llama La Trampa porque el elemento central de cada ejercicio es enseñarte la traducción literal —la que suena bien y está mal— tachada, al lado de la forma que se dice de verdad.

> *I have 30 years* · **I'm 30**
> La edad se es, no se tiene.

HTML, CSS y JavaScript vanilla. Sin frameworks, sin build, sin npm, sin dependencias, sin servidor y sin base de datos.

---

## Índice

- [Cómo probarlo en local](#cómo-probarlo-en-local)
- [Cómo publicarlo](#cómo-publicarlo)
- [Estructura de archivos](#estructura-de-archivos)
- [Cómo añadir una lección](#cómo-añadir-una-lección)
- [Los siete tipos de ejercicio](#los-siete-tipos-de-ejercicio)
- [XP, racha, trofeos y cuaderno de fallos](#xp-racha-trofeos-y-cuaderno-de-fallos)
- [Dónde vive tu progreso](#dónde-vive-tu-progreso)
- [Compatibilidad y accesibilidad](#compatibilidad-y-accesibilidad)

---

## Cómo probarlo en local

**Opción 1: doble clic.** Abre `index.html` en el navegador y ya está.

Funciona porque las lecciones se cargan inyectando etiquetas `<script>`, no con `fetch()`. Un `fetch()` sobre `file://` daría error de CORS y la web no arrancaría. Es la razón de que el motor esté escrito así.

Con esta opción hay una única limitación: **el micrófono no funciona**, porque los navegadores solo dan acceso en contextos seguros (`https://` o `localhost`). Los ejercicios de speaking lo detectan y siguen funcionando con el cronómetro, avisando de que no se está grabando.

**Opción 2: servidor local.** Si quieres probar también la grabación:

```bash
python3 -m http.server 8000
```

Y si no tienes Python instalado, con PowerShell y sin instalar nada:

```bash
powershell -NoProfile -Command "$l=[Net.HttpListener]::new();$l.Prefixes.Add('http://localhost:8000/');$l.Start();Write-Host 'http://localhost:8000/';while($l.IsListening){$c=$l.GetContext();$p=Join-Path (Get-Location) ($c.Request.Url.AbsolutePath.TrimStart('/') -replace '/','\');if($p -eq (Get-Location).Path){$p=Join-Path $p 'index.html'};if(Test-Path $p -PathType Leaf){$b=[IO.File]::ReadAllBytes($p);$e=[IO.Path]::GetExtension($p);$c.Response.ContentType=@{'.html'='text/html';'.css'='text/css';'.js'='application/javascript'}[$e];$c.Response.OutputStream.Write($b,0,$b.Length)}else{$c.Response.StatusCode=404};$c.Response.Close()}"
```

Luego abre `http://localhost:8000`.

---

## Cómo publicarlo

Es una web estática: sirve cualquier hosting que devuelva archivos. En GitHub Pages:

```bash
git init && git add -A && git commit -m "La Trampa"
gh repo create ingles --public --source=. --push
gh api -X POST repos/{owner}/ingles/pages -f "source[branch]=main" -f "source[path]=/"
```

Si el repositorio ya existe, basta con hacer push a `main`.

Si la llamada a la API falla, actívalo a mano en **Settings → Pages → Deploy from a branch → main → /(root)**. Tarda uno o dos minutos en estar disponible la primera vez.

Con una cuenta gratuita, **el repositorio tiene que ser público** para que Pages funcione.

No hay ninguna clave de API en el proyecto y no hace falta ninguna: el audio lo genera el sintetizador del propio navegador y la grabación se queda en tu equipo.

---

## Estructura de archivos

```
index.html            cáscara: barra superior + contenedor #app + carga de scripts
assets/styles.css     todos los estilos
assets/app.js         motor: navegación, estado, XP, racha, tipos de ejercicio
data/curriculum.js    plan de 60 días, 9 semanas y definición de trofeos
data/day-01.js        contenido de la lección 1
data/day-02.js        …
README.md             este archivo
```

La regla de oro del diseño: **añadir una lección nueva consiste en crear un archivo en `data/` y nada más.** Si para añadir el día 27 hubiera que tocar `app.js` o `index.html`, el diseño estaría mal.

Los días 1 a 7 están escritos. Del 8 al 60 el plan existe en `curriculum.js`, pero no hay ejercicios: la portada de esos días muestra un aviso indicando qué archivo falta crear. No hay contenido de relleno.

---

## Cómo añadir una lección

Crea `data/day-NN.js` (con dos dígitos: `day-08.js`, no `day-8.js`) con esta forma:

```js
REGISTER_DAY({
  n: 8,
  title: "Present perfect y past simple",
  minutes: 30,
  blocks: [
    { title: "Cuándo el pasado toca el presente", items: [
      { type:"note", title:"…", html:"<p>…</p>" },
      { type:"mcq", es:"…", opts:["…","…","…","…"], ok:1, trap:"…", why:"…" }
    ]},
    { title: "Cierre", items: [
      { type:"gap", es:"…", text:"I ___ here since 2019.", answer:["have worked"], why:"…" }
    ]}
  ]
});
```

El motor lo recoge solo: `loadDay(8)` inyecta `<script src="data/day-08.js">`, cachea el resultado y pinta la portada con la lista de bloques y el número de pasos.

Convenciones que conviene respetar:

- `n` debe coincidir con el número del archivo y con la entrada de `curriculum.js`.
- Entre **14 y 20 pasos** por día, repartidos en 4 o 5 bloques. Los días de repaso son más cortos.
- Estructura típica: `note` → ejercicios de gramática → un bloque de destreza (reading, listening, speaking o writing) → cierre con tres ejercicios que mezclan lo del día.
- Varía la posición de la respuesta correcta (`ok`). Si siempre es la B, se nota.
- Los `why` van **en español** y explican *por qué el español te empuja al error*, no repiten la regla.
- Los distractores son **calcos plausibles**: la opción incorrecta debe ser exactamente lo que diría un hispanohablante.

En los campos `why` y en el `html` de las notas puedes usar HTML. Además, `why` admite `**negrita**` y `_cursiva_`.

Si un archivo de lección trae un `type` desconocido, el motor **se salta ese paso y avisa por consola**, sin romper la lección.

---

## Los siete tipos de ejercicio

Cada tipo tiene su renderizador en `assets/app.js`. Los esquemas son estos; todos los ejemplos son copiables tal cual.

### 1. `note` — explicación previa

No puntúa. Sirve para presentar la regla antes de los ejercicios.

```js
{ type:"note",
  title:"En inglés el adjetivo se pone antes, sin excepciones",
  html:"<p>En español el adjetivo va detrás: <em>un coche rojo</em>. " +
       "En inglés va delante: <code>a red car</code>.</p>" +
       "<ul><li><span class='bad'>two reds cars</span> → <code>two red cars</code></li></ul>" }
```

Clases disponibles dentro del `html`: `<code>` para inglés correcto (verde), `<span class='bad'>` para el calco (coral y tachado), y `<table>` para comparativas español/inglés.

### 2. `mcq` — opción múltiple con panel de la trampa

Cuatro opciones, una correcta. Al responder se abre el panel con el calco tachado.

```js
{ type:"mcq",
  es:"Tengo un coche rojo.",
  opts:["I have a car red.","I have a red car.","I have red a car.","I have a car of red."],
  ok:1,
  trap:"I have a car red.",
  why:"Palabra por palabra, el español sale así: coche primero, rojo después. " +
      "En inglés el adjetivo se coloca **antes del sustantivo**." }
```

- `opts` tiene que tener exactamente 4 entradas y `ok` va de 0 a 3.
- `trap` es la traducción literal que suena bien y está mal. Se muestra tachada solo cuando fallas.
- Opcionalmente acepta `instruction` (línea de instrucciones) y `question` (enunciado en inglés en vez de la frase en español).

### 3. `gap` — rellenar hueco escribiendo

```js
{ type:"gap",
  es:"Son problemas difíciles.",
  text:"They're ___ problems.",
  answer:["difficult","hard","tough"],
  why:"En español el adjetivo copia el plural. En inglés **no cambia nunca**: " +
      "<em>difficults</em> no existe." }
```

- El hueco se marca con `___` (tres guiones bajos).
- `answer` admite varias respuestas válidas. La primera es la que se muestra como forma correcta; las demás aparecen como «también vale».
- La comparación normaliza a minúsculas, quita la puntuación y colapsa los espacios, así que `A Difficult!` y `a difficult` cuentan igual.

### 4. `reading` — texto largo, glosario y preguntas encadenadas

```js
{ type:"reading",
  title:"The four-day week, tested for real",
  text:[
    "In 2022, sixty-one British companies did something most managers had…",
    "The rule was simple. Staff kept 100% of their salary…"
  ],
  glossary:[
    {w:"trial", d:"prueba, ensayo"},
    {w:"work out", d:"averiguar, deducir"}
  ],
  questions:[
    { q:"What made the 2022 trial unusual?",
      opts:["Employees accepted a pay cut.",
            "Employees kept their full pay while working fewer hours.",
            "Only large companies took part.",
            "The companies were told how to reorganise."],
      ok:1,
      why:"El texto lo dice en la primera frase: <em>without cutting anyone's pay</em>." }
  ] }
```

- Cada entrada de `text` es un párrafo. Entre 250 y 350 palabras en total.
- Cuatro preguntas, cuatro opciones cada una, con el distractor apoyado en el texto (como en el examen real).
- Cada pregunta puntúa por separado. Una pregunta fallada entra sola en el cuaderno de fallos.

### 5. `listening` — audio generado por el navegador

Sin archivos de audio: lo genera `speechSynthesis` con `lang="en-GB"`, eligiendo una voz inglesa si el sistema tiene alguna. Hay botón de reproducir, botón de 0.7× y se puede repetir sin límite.

Modo dictado:

```js
{ type:"listening", mode:"dictation",
  audio:"She always arrives late, but she never says sorry.",
  why:"Los dos adverbios van **entre el sujeto y el verbo**, que es exactamente " +
      "donde el español no los pondría." }
```

Modo opción múltiple:

```js
{ type:"listening", mode:"mcq",
  audio:"I'll do my best to get it finished by Friday, but I can't make any promises.",
  question:"How confident is the speaker about the deadline?",
  opts:["He is certain it will be ready.","He has already finished.",
        "He will try, but he is not guaranteeing it.","He is refusing to do it."],
  ok:2,
  why:"<code>do my best</code> y <code>make a promise</code> juntos significan " +
      "«lo intento, pero no me comprometo»." }
```

En el dictado, al corregir se muestra la frase palabra por palabra, marcando en verde las que acertaste y en coral las que no. En el modo mcq aparece la transcripción al responder.

### 6. `speaking` — cronómetro, grabación y respuesta modelo

```js
{ type:"speaking", seconds:60,
  prompt:"Describe el sitio donde vives: qué hay, qué no hay y qué tiempo suele hacer.",
  useful:["There's a lot of…","There aren't many…","It's usually…"],
  model:"I live in a fairly small town about forty minutes from the coast. " +
        "There's a decent market on Saturdays…" }
```

Graba con `MediaRecorder`, con cuenta atrás y punto rojo parpadeante, y deja escuchar lo grabado. La grabación **no sale de tu equipo ni se guarda en ningún sitio**: vive en memoria hasta que pasas de pantalla.

**Si no das permiso al micrófono, el ejercicio no se bloquea**: avisa y sigue con el cronómetro. La respuesta modelo se puede escuchar con el sintetizador.

### 7. `writing` — contador de palabras, checklist y texto modelo

```js
{ type:"writing", kind:"essay",
  title:"Un correo corto, sin falsos amigos",
  prompt:"Un compañero inglés te escribe: puede pasarse el jueves…",
  min:140, max:190,
  checklist:[
    "No has usado assist para decir «asistir».",
    "Los adjetivos van delante del sustantivo y ninguno lleva -s."
  ],
  model:"Hi Tom,\n\nThanks for offering. I'm afraid Thursday doesn't work for me…" }
```

El contador se pone verde dentro del rango y coral al pasarse. Al terminar aparecen el checklist y el texto modelo (los saltos de párrafo del `model` se escriben con `\n\n`).

**El writing es autocorregido.** No hay corrección automática ni se envía tu texto a ningún sitio: el ejercicio consiste en releer lo que has escrito con el checklist delante y compararlo con el modelo.

---

## XP, racha, trofeos y cuaderno de fallos

**XP**

| Acción | XP |
|---|---|
| Acertar un ejercicio | 10 |
| Fallarlo | 2 |
| Cerrar un día por primera vez | +25 |

Fallar puntúa, pero menos: la idea es que responder siempre sale mejor que abandonar. El bono de +25 solo se da la primera vez; repetir un día suma el XP de las respuestas pero no el bono, y la nota que se guarda es la mejor de las dos.

**Racha**

Se actualiza al cerrar un día:

- si la última sesión fue **ayer**, sube en uno;
- si fue **hoy**, no cambia (hacer tres días seguidos en una tarde cuenta como un día de racha);
- si fue **antes de ayer**, vuelve a 1.

**Desbloqueo**

El día N se abre cuando está hecho el N−1. El día 1 siempre está abierto. Un día ya hecho se puede repetir cuando quieras.

**Trofeos**

Nueve, definidos en `data/curriculum.js`, en los días 3, 7, 14, 21, 30, 42, 49, 56 y 60. Cada uno nombra el logro concreto, no un «bien hecho» genérico. Se ven en el mapa, bloqueados hasta que llegas.

**Cuaderno de fallos**

Cada ejercicio fallado se guarda. Desde el mapa hay un botón para repasar los últimos 20; al repasarlos salen de la lista y el repaso suma XP con las mismas reglas. Se guardan como máximo 40 fallos: al pasarse, se descartan los más antiguos.

---

## Dónde vive tu progreso

En **`localStorage`, en tu navegador, en tu dispositivo**, bajo la clave `latrampa.v1`:

```js
{ done:{ 1:{score:87, xp:145, date:"2026-08-10"} },
  xp:0, streak:0, last:null, missed:[], trophies:[] }
```

Consecuencias, para que no haya sorpresas:

- **No hay cuenta ni sincronización.** Si empiezas en el móvil y sigues en el portátil, el progreso no viaja: son dos progresos distintos.
- Borrar los datos del navegador borra el progreso.
- En navegación privada dura lo que dure la ventana.
- Si el navegador tiene el almacenamiento bloqueado, la web **no se rompe**: el estado pasa a memoria, avisa en el mapa y el progreso se pierde al cerrar la pestaña.

El botón **Reiniciar** del mapa borra todo: progreso, XP, racha, trofeos y cuaderno de fallos. Pide confirmación.

---

## Compatibilidad y accesibilidad

- Funciona en cualquier navegador moderno. El JavaScript es ES5, sin transpilar.
- **Responsive hasta 360 px** de ancho, sin scroll horizontal en ninguna pantalla.
- Foco de teclado visible en todos los controles y enlace para saltar al contenido.
- Respeta `prefers-reduced-motion`: si lo tienes activado, se desactivan las animaciones, incluida la línea que tacha el calco.
- **Teclado:** A-D o 1-4 para responder, Enter para avanzar. En el dictado, Enter corrige y Mayús+Enter hace salto de línea. En el writing, Enter escribe normal.
- El listening depende de que el sistema tenga voces instaladas. Si no hay ninguna, avisa y deja leer la transcripción al responder.
- El micrófono solo funciona sobre `https://` o `localhost`.
