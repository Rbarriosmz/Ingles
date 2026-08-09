/* =========================================================
   La Trampa — currículo de 60 días
   Este archivo solo describe el plan: qué se trabaja cada día.
   El contenido de cada lección vive en data/day-NN.js
   ========================================================= */

window.CURRICULUM = {

  weeks: [
    { n:1, from:1,  to:7,  name:'Desmontar el calco',
      goal:'Los errores que delatan a un hispanohablante en la primera frase: orden de palabras, sujeto obligatorio, artículos, make/do/take y falsos amigos.' },

    { n:2, from:8,  to:14, name:'El motor del verbo',
      goal:'El sistema verbal inglés no se reparte como el español. Present perfect frente a past simple, for/since, continuos, futuros, gerundio o infinitivo y modales.' },

    { n:3, from:15, to:21, name:'Preposiciones y bloques',
      goal:'Dejar de traducir la preposición y empezar a memorizar el bloque entero: verbo+prep, in/on/at de tiempo y de lugar, adjetivo+prep, sustantivo+prep y colocaciones.' },

    { n:4, from:22, to:28, name:'Phrasal verbs y léxico B2',
      goal:'El vocabulario que separa un B1 de un B2: phrasal verbs de uso diario y de trabajo, colocaciones, formación de palabras y sinónimos con registro.' },

    { n:5, from:29, to:35, name:'Reading y conectores',
      goal:'Leer como en el examen: multiple choice, scanning, gapped text y multiple matching, y los conectores que sostienen un texto de nivel B2.' },

    { n:6, from:36, to:42, name:'Writing',
      goal:'Las cuatro tareas de escritura del B2 First: email, essay, review y article, con estructura de párrafo y una rutina de autocorrección que funcione.' },

    { n:7, from:43, to:49, name:'Listening y speaking',
      goal:'Los sonidos que el español no tiene, el habla encadenada, el dictado, el listening de examen y hablar un minuto seguido defendiendo una opinión.' },

    { n:8, from:50, to:56, name:'Estructuras avanzadas',
      goal:'Lo que el examinador busca para dar un B2: condicionales, wish, pasiva, estilo indirecto, oraciones de relativo y transformaciones con palabra clave.' },

    { n:9, from:57, to:60, name:'Simulacros',
      goal:'Cuatro exámenes completos del Cambridge B2 First, uno por destreza, con las condiciones y los tiempos reales de la prueba.' }
  ],

  days: [
    /* ---------- Semana 1: desmontar el calco ---------- */
    { n:1,  title:'El orden de las palabras',           skills:['grammar','use'],
      focus:'El adjetivo delante, el adverbio en su sitio y el orden sujeto-verbo-objeto que el inglés no negocia.' },
    { n:2,  title:'El sujeto que en español no dices',  skills:['grammar','use'],
      focus:'Todas las frases inglesas llevan sujeto. It, there y el verbo to be donde el español usa tener.' },
    { n:3,  title:'a, an, the y el artículo cero',      skills:['grammar','use'],
      focus:'Cuándo el inglés no pone artículo y el español sí. Generalizaciones, profesiones, comidas y lugares.' },
    { n:4,  title:'make, do, take y have',              skills:['vocab','use'],
      focus:'Cuatro verbos donde el español solo tiene hacer y tener. Se aprenden por bloques, no por regla.' },
    { n:5,  title:'Falsos amigos',                      skills:['vocab','reading'],
      focus:'Palabras que existen en los dos idiomas y significan otra cosa: actually, eventually, sensible, assist.' },
    { n:6,  title:'Preguntas y negaciones',             skills:['grammar','speaking'],
      focus:'El auxiliar do, el orden de la pregunta y por qué la pregunta indirecta vuelve al orden normal.' },
    { n:7,  title:'Repaso de la semana 1',              skills:['review'], rest:true,
      focus:'Sesión corta: los cinco calcos de la semana mezclados, sin explicaciones nuevas.' },

    /* ---------- Semana 2: el motor del verbo ---------- */
    { n:8,  title:'Present perfect y past simple',      skills:['grammar','use'],
      focus:'El tiempo que más delata a un hispanohablante: cuándo el pasado sigue tocando el presente.' },
    { n:9,  title:'for, since, ago, yet, already',      skills:['grammar','use'],
      focus:'Los marcadores que deciden el tiempo verbal, y el desde español que se parte en dos palabras.' },
    { n:10, title:'Los tiempos continuos',              skills:['grammar','use'],
      focus:'Cuándo el inglés usa -ing donde el español usa presente simple, y los verbos que nunca lo llevan.' },
    { n:11, title:'Hablar del futuro',                  skills:['grammar','speaking'],
      focus:'will, going to y el presente continuo. El futuro no se elige por tiempo, se elige por intención.' },
    { n:12, title:'Gerundio o infinitivo',              skills:['grammar','use'],
      focus:'Verbos que piden -ing, verbos que piden to y los que cambian de significado según cuál lleven.' },
    { n:13, title:'Modales',                            skills:['grammar','speaking'],
      focus:'must, should, might, can\'t: obligación, consejo y deducción sin traducir el subjuntivo español.' },
    { n:14, title:'Repaso de la semana 2',              skills:['review'], rest:true,
      focus:'Sesión corta: el sistema verbal completo en frases mezcladas.' },

    /* ---------- Semana 3: preposiciones y bloques ---------- */
    { n:15, title:'Verbo + preposición',                skills:['grammar','use'],
      focus:'depend on, listen to, look for. La preposición va pegada al verbo y no se traduce.' },
    { n:16, title:'in, on, at: tiempo',                 skills:['grammar','use'],
      focus:'Del año al minuto: la escala que decide la preposición, y el on de los días que el español no marca.' },
    { n:17, title:'in, on, at: lugar',                  skills:['grammar','use'],
      focus:'arrive in, arrive at, on the bus, in the car. Dónde el español usa siempre en.' },
    { n:18, title:'Adjetivo + preposición',             skills:['vocab','use'],
      focus:'good at, interested in, worried about. Bloques que se memorizan enteros o no se memorizan.' },
    { n:19, title:'Sustantivo + preposición',           skills:['vocab','use'],
      focus:'reason for, solution to, increase in. La preposición que el examen pregunta en Use of English.' },
    { n:20, title:'Colocaciones',                       skills:['vocab','writing'],
      focus:'heavy rain, strong accent, make a decision. Qué palabras viajan juntas en inglés.' },
    { n:21, title:'Repaso de la semana 3',              skills:['review'], rest:true,
      focus:'Sesión corta: preposiciones y bloques en contexto.' },

    /* ---------- Semana 4: phrasal verbs y léxico ---------- */
    { n:22, title:'Phrasal verbs cotidianos',           skills:['vocab','listening'],
      focus:'get up, turn on, run out of. Lo que se dice de verdad en vez del verbo culto que traduces.' },
    { n:23, title:'Phrasal verbs separables',           skills:['vocab','use'],
      focus:'turn it off y no turn off it. Dónde cae el pronombre y por qué no es opcional.' },
    { n:24, title:'Phrasal verbs de trabajo',           skills:['vocab','writing'],
      focus:'take on, carry out, set up, deal with. El registro profesional que el examen premia.' },
    { n:25, title:'Colocaciones de nivel B2',           skills:['vocab','writing'],
      focus:'El salto de vocabulario que separa un aprobado justo de un B2 claro.' },
    { n:26, title:'Formación de palabras',              skills:['vocab','use'],
      focus:'La parte 3 del Use of English: de decide a decision, de able a unable, de care a careless.' },
    { n:27, title:'Sinónimos y registro',               skills:['vocab','writing'],
      focus:'Decir lo mismo formal e informal, y no mezclar los dos registros en el mismo texto.' },
    { n:28, title:'Repaso de la semana 4',              skills:['review'], rest:true,
      focus:'Sesión corta: el léxico de la semana en frases nuevas.' },

    /* ---------- Semana 5: reading y conectores ---------- */
    { n:29, title:'Reading: multiple choice',           skills:['reading','exam'],
      focus:'Parte 5 del examen: encontrar la respuesta en el texto y descartar el distractor que también aparece.' },
    { n:30, title:'Reading: scanning',                  skills:['reading','exam'],
      focus:'Buscar un dato concreto sin leerlo todo, que es lo que pide el reloj del examen.' },
    { n:31, title:'Reading: gapped text',               skills:['reading','exam'],
      focus:'Parte 6: recolocar frases usando pronombres y conectores como pistas de costura.' },
    { n:32, title:'Conectores de contraste',            skills:['writing','use'],
      focus:'although, however, despite, whereas. Cuál lleva coma, cuál lleva sustantivo y cuál lleva frase.' },
    { n:33, title:'Causa y efecto',                     skills:['writing','use'],
      focus:'because, since, as, due to, therefore. La cadena lógica que un texto B2 tiene que mostrar.' },
    { n:34, title:'Reading: multiple matching',         skills:['reading','exam'],
      focus:'Parte 7: cuatro textos y diez preguntas, buscando la reformulación en vez de la palabra repetida.' },
    { n:35, title:'Repaso de la semana 5',              skills:['review'], rest:true,
      focus:'Sesión corta: un texto y sus conectores.' },

    /* ---------- Semana 6: writing ---------- */
    { n:36, title:'El email',                           skills:['writing','exam'],
      focus:'Parte 1 informal y parte 2 semiformal: apertura, cuerpo, cierre y las fórmulas que se esperan.' },
    { n:37, title:'El párrafo',                         skills:['writing'],
      focus:'Una idea por párrafo, frase temática y desarrollo. El fallo estructural más caro del examen.' },
    { n:38, title:'El essay',                           skills:['writing','exam'],
      focus:'La tarea obligatoria: introducción, dos puntos dados, uno propio y conclusión, en 140-190 palabras.' },
    { n:39, title:'La review',                          skills:['writing','exam'],
      focus:'Recomendar o no recomendar con adjetivos fuertes y una opinión clara desde la primera línea.' },
    { n:40, title:'El article',                         skills:['writing','exam'],
      focus:'Título, pregunta directa al lector y tono personal. La tarea donde el estilo puntúa.' },
    { n:41, title:'Autocorrección',                     skills:['writing'],
      focus:'Una rutina de siete comprobaciones para releer tu texto y encontrar tus propios calcos.' },
    { n:42, title:'Repaso de la semana 6',              skills:['review'], rest:true,
      focus:'Sesión corta: reescribir un texto flojo hasta dejarlo en nivel B2.' },

    /* ---------- Semana 7: listening y speaking ---------- */
    { n:43, title:'Los sonidos que no tienes',          skills:['listening','speaking'],
      focus:'La /ɪ/ de ship frente a la /iː/ de sheep, la h aspirada y la s líquida de Spain.' },
    { n:44, title:'Habla encadenada',                   skills:['listening'],
      focus:'Por qué what do you want suena wadayawant, y cómo dejar de buscar palabras sueltas.' },
    { n:45, title:'Dictado',                            skills:['listening'],
      focus:'Escribir exactamente lo que se oye, que es la prueba más honesta de comprensión.' },
    { n:46, title:'Listening de examen',                skills:['listening','exam'],
      focus:'Partes 1 y 2 del B2 First: elegir opción y completar huecos con las palabras exactas.' },
    { n:47, title:'Hablar un minuto',                   skills:['speaking','exam'],
      focus:'La parte 2 del oral: comparar dos fotos y hablar sin parar durante un minuto.' },
    { n:48, title:'Dar y defender una opinión',         skills:['speaking','exam'],
      focus:'Partes 3 y 4: negociar con el compañero, estar de acuerdo a medias y justificar.' },
    { n:49, title:'Repaso de la semana 7',              skills:['review'], rest:true,
      focus:'Sesión corta: escuchar, repetir y grabarse.' },

    /* ---------- Semana 8: estructuras avanzadas ---------- */
    { n:50, title:'Condicionales',                      skills:['grammar','use'],
      focus:'Los tres tipos y el mixto, sin meter el futuro detrás de if como hace el español.' },
    { n:51, title:'wish y if only',                     skills:['grammar','use'],
      focus:'Lamentar el presente, el pasado y lo que hace otra persona. Aquí el subjuntivo español estorba.' },
    { n:52, title:'La pasiva',                          skills:['grammar','writing'],
      focus:'Cuándo el inglés prefiere la pasiva y por qué el se español no se traduce con it.' },
    { n:53, title:'Estilo indirecto',                   skills:['grammar','use'],
      focus:'Mover el tiempo verbal hacia atrás y cambiar los deícticos sin perder el sentido.' },
    { n:54, title:'Oraciones de relativo',              skills:['grammar','writing'],
      focus:'who, which, that, whose, y cuándo el relativo se puede quitar. Con y sin comas.' },
    { n:55, title:'Transformaciones con palabra clave', skills:['use','exam'],
      focus:'Parte 4 del Use of English: reescribir una frase en entre dos y cinco palabras.' },
    { n:56, title:'Repaso de la semana 8',              skills:['review'], rest:true,
      focus:'Sesión corta: las estructuras avanzadas en transformaciones mezcladas.' },

    /* ---------- Semana 9: simulacros ---------- */
    { n:57, title:'Simulacro: Reading & Use of English', skills:['exam','reading','use'],
      focus:'Las siete partes del papel 1, con el reloj de 75 minutos que tiene el examen real.' },
    { n:58, title:'Simulacro: Writing',                  skills:['exam','writing'],
      focus:'Dos tareas en 80 minutos: el essay obligatorio y una segunda tarea a elegir.' },
    { n:59, title:'Simulacro: Listening',                skills:['exam','listening'],
      focus:'Las cuatro partes del listening, cada audio escuchado dos veces como en el examen.' },
    { n:60, title:'Simulacro: Speaking',                 skills:['exam','speaking'],
      focus:'Las cuatro partes del oral, cronometradas, grabándote para poder escucharte después.' }
  ],

  trophies: [
    { day:3,  name:'Los tres primeros reflejos',
      text:'Orden de palabras, sujeto obligatorio y artículos. Son los tres calcos que aparecen en la primera frase que digas, y ahora los ves venir.' },

    { day:7,  name:'El calco básico, desmontado',
      text:'Ya no dices I have 30 years ni a car red, y sabes por qué el español te empujaba a decirlo.' },

    { day:14, name:'El motor del verbo, montado',
      text:'Present perfect instalado, que es el tiempo que más te delataba. Distingues I have worked here for two years de I worked there two years ago sin pensarlo.' },

    { day:21, name:'Las preposiciones dejan de ser lotería',
      text:'depend on, interested in, arrive in. Has dejado de traducir la preposición suelta y empezado a memorizar el bloque entero, que es como se aprende.' },

    { day:30, name:'Lees sin traducir',
      text:'Sacas la idea de un texto de 300 palabras sin ir palabra por palabra, y reconoces el distractor que repite las palabras del texto pero dice otra cosa.' },

    { day:42, name:'Escribes 190 palabras que se sostienen',
      text:'Email, essay, review y article, cada uno con su estructura y su registro. Y una rutina de relectura para cazar tus propios calcos antes de entregar.' },

    { day:49, name:'Entiendes el inglés hablado de verdad',
      text:'El que va encadenado y sin pausas, no el de los audios lentos de clase. Y aguantas un minuto hablando sin quedarte en blanco.' },

    { day:56, name:'Gramática de examen completa',
      text:'Condicionales, wish, pasiva, estilo indirecto y relativas. Ya tienes todo lo que el examinador busca para poner un B2 en la casilla de Grammatical Range.' },

    { day:60, name:'B2 First, terminado',
      text:'Sesenta días y cuatro simulacros completos. Lo que empezó como traducir del español ahora sale directamente en inglés.' }
  ]

};
