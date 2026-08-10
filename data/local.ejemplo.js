/* =========================================================
   PLANTILLA de contenido local

   Cópiala a  data/local.js  y rellénala. Ese archivo está en
   .gitignore, así que nunca se sube y nunca se publica.

   Para qué sirve: material que tienes en tu equipo pero que no
   puedes publicar, como los exámenes de un libro con derechos.
   La web pública funciona igual sin este archivo: el motor lo
   busca al arrancar y sigue en silencio si no existe.

   Los simulacros que se registren aquí salen en la lista con la
   etiqueta «solo en este equipo», para que no haya dudas.

   ---------------------------------------------------------
   CÓMO SACAR EL CONTENIDO DE UN PDF ESCANEADO
   ---------------------------------------------------------
   herramientas/extraer.ps1 hace OCR reconstruyendo el diseño
   (columnas y rejillas de opciones). Desde la carpeta del
   proyecto:

     powershell -ExecutionPolicy Bypass -File herramientas/extraer.ps1 `
       -Path "C:\ruta\al\libro.pdf" -From 30 -To 45 `
       -OutFile "extraido/test1.txt"

   -From y -To son índices de página empezando en 0.
   La carpeta extraido/ también está en .gitignore.

   Después hay que revisar a mano lo que salga. El OCR acierta
   casi todo el texto corrido, pero se come letras sueltas en las
   rejillas de opciones, y un fallo en la clave de respuestas te
   enseñaría lo contrario de lo correcto. Comprueba SIEMPRE las
   respuestas contra el libro antes de darlo por bueno.
   ========================================================= */

REGISTER_LOCAL_EXAM(

  /* 1. La ficha que aparece en la lista de simulacros */
  { id:      'libro-test-1',
    paper:   'Reading & Use of English',
    title:   'Test 1 del libro',
    parts:   2,
    questions: 16,
    minutes: 75,
    focus:   'Descripción corta que verás en la portada del simulacro.' },

  /* 2. El contenido. Mismo formato que data/exam-ruoe-1.js:
        cloze, opencloze, wordform, transform, reading,
        gappedtext y matching. */
  { id:    'libro-test-1',
    paper: 'Reading & Use of English',
    title: 'Test 1 del libro',
    parts: [

      { n:1, type:'cloze', count:8, tags:['collocation'],
        title:'Multiple-choice cloze',
        instructions:'Elige la palabra que mejor encaja en cada hueco.',
        heading:'Título del texto',
        example:'(0) opción — «fragmento del texto»',
        text:'Primer párrafo con su {1} y su {2}.\n\nSegundo párrafo con {3} {4} {5} {6} {7} {8}.',
        gaps:[
          { opts:['a','b','c','d'], ok:0, why:'Por qué es esa y por qué las otras tres no.' },
          { opts:['a','b','c','d'], ok:1, why:'…' },
          { opts:['a','b','c','d'], ok:2, why:'…' },
          { opts:['a','b','c','d'], ok:3, why:'…' },
          { opts:['a','b','c','d'], ok:0, why:'…' },
          { opts:['a','b','c','d'], ok:1, why:'…' },
          { opts:['a','b','c','d'], ok:2, why:'…' },
          { opts:['a','b','c','d'], ok:3, why:'…' }
        ] },

      { n:2, type:'opencloze', count:8, tags:['function-word'],
        title:'Open cloze',
        instructions:'Escribe UNA sola palabra en cada hueco.',
        heading:'Título del texto',
        example:'(0) so',
        text:'Texto con {1} {2} {3} {4} {5} {6} {7} {8}.',
        gaps:[
          { answer:['at'],   why:'…' },
          { answer:['on'],   why:'…' },
          { answer:['it'],   why:'…' },
          { answer:['the'],  why:'…' },
          { answer:['that','which'], why:'…' },
          { answer:['once'], why:'…' },
          { answer:['at'],   why:'…' },
          { answer:['lot'],  why:'…' }
        ] }

    ] }
);
