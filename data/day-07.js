REGISTER_DAY({
  n: 7,
  title: "Repaso de la semana 1",
  minutes: 20,

  blocks: [

  /* ---------------------------------------------------------
     0. Cómo funciona el día de repaso
     --------------------------------------------------------- */
  { title: "Cómo funciona hoy", items: [

    { type:"note", title:"Hoy no hay reglas nuevas",
      html:"<p>Doce frases, todas mezcladas, todas sobre lo de esta semana. No hay tablas ni explicaciones largas: si fallas una, la explicación te recuerda de qué día venía para que sepas a cuál volver.</p>" +
           "<p>Los cinco reflejos que hemos estado desmontando:</p>" +
           "<ul>" +
           "<li><b>Día 1</b> — el adjetivo delante, el adverbio en su sitio, nada entre el verbo y su objeto.</li>" +
           "<li><b>Día 2</b> — toda frase lleva sujeto: <em>it</em> para el tiempo y la valoración, <em>there</em> para lo que existe, <em>be</em> para la edad y el frío.</li>" +
           "<li><b>Día 3</b> — hablando en general, sin artículo.</li>" +
           "<li><b>Día 4</b> — make, do, take y have son bloques cerrados.</li>" +
           "<li><b>Día 5</b> — actually no es «actualmente» y assist no es «asistir».</li>" +
           "<li><b>Día 6</b> — la pregunta necesita auxiliar, y la pregunta indirecta lo pierde.</li>" +
           "</ul>" +
           "<p>Es una sesión corta a propósito. El objetivo de hoy no es aprender nada: es comprobar qué se ha quedado sin la explicación delante.</p>" }

  ]},

  /* ---------------------------------------------------------
     1. Orden y sujeto
     --------------------------------------------------------- */
  { title: "Orden y sujeto", items: [

    { type:"mcq",
      es:"Ayer hizo mucho frío en Madrid.",
      opts:["Yesterday did a lot of cold in Madrid.","It did very cold in Madrid yesterday.","It was very cold in Madrid yesterday.","There was very cold in Madrid yesterday."],
      ok:2,
      trap:"Yesterday did a lot of cold in Madrid.",
      why:"Día 2. El tiempo atmosférico va con <b>it + be</b>, nunca con <em>do</em> ni con <em>there</em>. El <em>hacer</em> del español no se traduce en ningún caso de esta familia: <code>it's hot</code>, <code>it's windy</code>, <code>it was sunny</code>." },

    { type:"gap",
      es:"Hay demasiado ruido aquí para trabajar.",
      text:"___ too much noise here to work.",
      answer:["there's","there is"],
      why:"Día 2. Lo que existe se dice con <em>there</em>. Y <em>noise</em> es incontable, por eso <b>too much</b> y no <em>too many</em>: la misma decisión que tomaste con <em>people</em>, pero al revés." },

    { type:"mcq",
      es:"Mi hermano pequeño nunca llega puntual.",
      opts:["My brother little never arrives on time.","My little brother never is on time.","My little brother is never on time.","My little brother never arrives in time."],
      ok:2,
      trap:"My brother little never arrives on time.",
      why:"Día 1, dos veces: el adjetivo delante y el adverbio de frecuencia **detrás de _to be_**. La D esconde otra trampa: <em>on time</em> es puntual, <em>in time</em> es con margen suficiente. <code>I arrived in time to catch the train</code> significa que llegaste a tiempo de cogerlo, no que fueras puntual." }

  ]},

  /* ---------------------------------------------------------
     2. Artículos y bloques
     --------------------------------------------------------- */
  { title: "Artículos y bloques", items: [

    { type:"mcq",
      es:"La música clásica me ayuda a concentrarme.",
      opts:["The classical music helps me to concentrate.","Classical music helps me concentrate.","The classical music helps me concentrate.","Classical music helps me to concentrate me."],
      ok:1,
      trap:"The classical music helps me to concentrate.",
      why:"Día 3. Es la música clásica en general, así que va sin artículo. Y en la D asoma otro calco: el reflexivo español <em>concentrarme</em> no se traduce, porque <em>concentrate</em> ya es intransitivo. Lo mismo con <code>get up</code>, <code>wake up</code> o <code>relax</code>." },

    { type:"gap",
      es:"Hicimos un esfuerzo enorme y al final salió bien.",
      text:"We ___ a huge effort and in the end it worked.",
      answer:["made"],
      why:"Día 4. <code>make an effort</code> es bloque fijo. Y de paso, <em>in the end</em> es «al final, después de todo», mientras que <em>at the end</em> pide un complemento: <code>at the end of the film</code>." },

    { type:"mcq",
      es:"Voy a la universidad en autobús.",
      opts:["I go to the university in bus.","I go to university by bus.","I go to the university by bus.","I go to university in the bus."],
      ok:1,
      trap:"I go to the university in bus.",
      why:"Día 3. Si vas a estudiar, <em>university</em> va sin artículo, igual que <em>school</em> y <em>work</em>. Y el transporte va con <b>by</b> y sin artículo. La D solo sería correcta si estuvieras hablando de un autobús concreto en el que estás sentado ahora mismo." }

  ]},

  /* ---------------------------------------------------------
     3. Falsos amigos y preguntas
     --------------------------------------------------------- */
  { title: "Falsos amigos y preguntas", items: [

    { type:"mcq",
      es:"¿Sabes si la biblioteca abre los domingos?",
      opts:["Do you know if the bookshop opens on Sundays?","Do you know if opens the library on Sundays?","Do you know if the library opens on Sundays?","Do you know if the library open the Sundays?"],
      ok:2,
      trap:"Do you know if the bookshop opens on Sundays?",
      why:"Días 5 y 6 juntos. <em>Library</em> es biblioteca; la librería es <em>bookshop</em>, y ese es el fallo de la A, que por lo demás está perfecta. En la B se ha colado la inversión: detrás de <em>if</em> el orden es normal, sujeto delante del verbo." },

    { type:"gap",
      es:"Me di cuenta demasiado tarde de que no tenía razón.",
      text:"I ___ too late that I wasn't right.",
      answer:["realised","realized"],
      why:"Día 5. <em>Realise</em> es darse cuenta y no lleva preposición detrás. Y el final de la frase es del día 2: <em>tener razón</em> es <code>be right</code>, así que la negación se hace con <em>wasn't</em>, no con <em>didn't have</em>." },

    { type:"mcq",
      es:"¿Cuánta gente había en la charla?",
      opts:["How much people had in the talk?","How many people were there at the talk?","How much people there was at the talk?","How many people had there in the talk?"],
      ok:1,
      trap:"How much people had in the talk?",
      why:"Tres días en una pregunta. <em>People</em> es contable y plural, así que <b>how many</b> y <b>were</b> (día 2). <em>Había</em> es <em>there was/were</em>, no <em>have</em> (día 2). Y en la pregunta el orden es <em>were there</em>, con el auxiliar delante del sujeto (día 6)." }

  ]},

  /* ---------------------------------------------------------
     4. Cierre de semana
     --------------------------------------------------------- */
  { title: "Cierre de semana", items: [

    { type:"listening", mode:"dictation",
      audio:"Do you know if there's a cheaper way to do it?",
      why:"Toda la semana en nueve palabras: el auxiliar <em>do</em> de la pregunta, el orden normal detrás de <em>if</em>, el <em>there's</em> de lo que existe, el adjetivo delante del sustantivo y el bloque <code>do it</code>. Si has escrito las nueve, la semana ha cuajado." },

    { type:"mcq",
      es:"Tengo 34 años y hago deporte tres veces por semana.",
      opts:["I have 34 years and I make sport three times per week.","I'm 34 years and I do sport three times a week.","I'm 34 and I do sport three times a week.","I have 34 years old and I do sport three times at week."],
      ok:2,
      trap:"I have 34 years and I make sport three times per week.",
      why:"La frase con la que empezó todo esto. La edad **se es** (día 2), el deporte se hace con <em>do</em> (día 4), y la frecuencia se dice con el artículo indefinido: <b>three times a week</b>, no <em>per week</em> salvo en un contrato. La B es la más cruel: solo le sobra <em>years</em>." },

    { type:"speaking", seconds:60,
      prompt:"Preséntate como si fuera el primer día de un curso: edad, a qué te dedicas, qué haces los fines de semana y qué hay en tu barrio. Un minuto, sin traducir mentalmente.",
      useful:["I'm … years old","I work for…","At weekends I usually…","There's a … near my flat","There aren't many…","I'm quite…"],
      model:"Right, so I'm 34 and I work for a small engineering company in the centre of town. I've been there about three years. During the week I don't have much of a life, honestly, but at weekends I usually do some sport, normally cycling, and I try to see friends on Saturday evening. I live in a fairly quiet neighbourhood. There's a good market on Sunday mornings and there are a couple of decent bars, but there isn't much else, which suits me. The one thing I can't stand is the traffic on the main road."
    }

  ]}

  ]
});
