REGISTER_DAY({
  n: 14,
  title: "Repaso de la semana 2",
  minutes: 20,

  blocks: [

  /* ---------------------------------------------------------
     0. Cómo funciona el día de repaso
     --------------------------------------------------------- */
  { title: "Cómo funciona hoy", items: [

    { type:"note", title:"Hoy no hay reglas nuevas",
      html:"<p>Doce frases mezcladas sobre el sistema verbal de esta semana. Si fallas una, la explicación te dice de qué día venía.</p>" +
           "<ul>" +
           "<li><b>Día 8</b> — si el momento está cerrado, past simple. Sin excepciones.</li>" +
           "<li><b>Día 9</b> — <em>for</em> mide duración, <em>since</em> marca el inicio, <em>ago</em> cierra el momento.</li>" +
           "<li><b>Día 10</b> — el continuo es para lo temporal, y los verbos de estado no lo admiten.</li>" +
           "<li><b>Día 11</b> — el futuro se elige por quién decide y cuándo se decidió.</li>" +
           "<li><b>Día 12</b> — detrás de preposición, gerundio siempre.</li>" +
           "<li><b>Día 13</b> — <em>mustn't</em> prohíbe, <em>don't have to</em> libera.</li>" +
           "</ul>" +
           "<p>Es el motor entero del verbo inglés. Con esto y la semana 1, ya tienes desmontado lo que más delata a un hispanohablante.</p>" }

  ]},

  /* ---------------------------------------------------------
     1. Pasado
     --------------------------------------------------------- */
  { title: "Pasado y perfecto", items: [

    { type:"mcq",
      es:"La conocí hace tres años y seguimos siendo amigos.",
      opts:["I've known her three years ago and we're still friends.","I've met her three years ago and we're still friends.","I met her three years ago and we're still friends.","I met her since three years and we're still friends."],
      ok:2,
      trap:"I've met her three years ago and we're still friends.",
      why:"Días 8 y 9. <em>Ago</em> cierra el momento, así que past simple, y es incompatible con el perfecto. Fíjate además en <em>met</em>: conocer a alguien por primera vez es <em>meet</em>; conocerlo desde entonces sería <code>I've known her for three years</code>." },

    { type:"gap",
      es:"Todavía no me han contestado.",
      text:"They haven't replied ___.",
      answer:["yet"],
      why:"Día 9. <em>Yet</em> en negativa va al final de la frase. Con <em>still</em> tendrías que reordenar: <code>they still haven't replied</code>, que añade impaciencia." },

    { type:"mcq",
      es:"Estaba saliendo cuando me llamaste.",
      opts:["I left when you called.","I was leaving when you called.","I was leaving when you were calling.","I left when you were calling."],
      ok:1,
      trap:"I left when you called.",
      why:"Día 10. Salir es el fondo, así que continuo; la llamada lo interrumpe, así que simple. Con las dos en simple contarías dos hechos seguidos: primero saliste y luego llamó." }

  ]},

  /* ---------------------------------------------------------
     2. Presente y futuro
     --------------------------------------------------------- */
  { title: "Presente y futuro", items: [

    { type:"mcq",
      es:"Este mes estoy trabajando desde casa.",
      opts:["This month I'm working from home.","This month I'm work from home.","This month I have worked from home.","This month I work from home."],
      ok:0,
      trap:"This month I work from home.",
      why:"Día 10. Situación temporal, aunque dure semanas: continuo. Con el simple estarías describiendo tu forma habitual de trabajar, y el <em>this month</em> se quedaría sin sentido." },

    { type:"gap",
      es:"En cuanto termine, te lo mando.",
      text:"As soon as I ___, I'll send it to you.",
      answer:["finish"],
      why:"Día 11. Detrás de <em>as soon as</em> no va futuro, va presente simple. Vale lo mismo para <em>when</em>, <em>if</em>, <em>before</em> y <em>until</em>: el futuro se queda solo en la otra mitad." },

    { type:"mcq",
      es:"El vuelo sale a las seis, así que salgo de casa a las cuatro.",
      opts:["The flight is leaving at six, so I leave home at four.","The flight leaves at six, so I leave home at four.","The flight will leave at six, so I'll leave home at four.","The flight leaves at six, so I'm leaving home at four."],
      ok:3,
      trap:"The flight will leave at six, so I'll leave home at four.",
      why:"Día 11. El horario del vuelo no lo decides tú, así que presente simple; la hora de salir de casa sí, así que presente continuo. La misma frase con dos futuros distintos y cada uno por su motivo." }

  ]},

  /* ---------------------------------------------------------
     3. Formas y modales
     --------------------------------------------------------- */
  { title: "Formas y modales", items: [

    { type:"mcq",
      es:"Estoy pensando en cambiar de trabajo.",
      opts:["I think about changing jobs.","I'm thinking about to change jobs.","I'm thinking about changing jobs.","I'm thinking to change jobs."],
      ok:2,
      trap:"I'm thinking about to change jobs.",
      why:"Día 12. Detrás de preposición, gerundio. Y <em>think</em> aquí sí admite continuo, porque no es opinar sino darle vueltas a algo: es uno de los verbos que cambian de bando según el significado." },

    { type:"gap",
      es:"No hace falta que traigas nada.",
      text:"You ___ bring anything.",
      answer:["don't have to","needn't","don't need to"],
      why:"Día 13. Ausencia de obligación. Si pusieras <em>mustn't</em> le estarías prohibiendo traer nada, que en una invitación sonaría bastante mal." },

    { type:"mcq",
      es:"Se le habrá olvidado la reunión.",
      opts:["He must forget the meeting.","He must have forgotten the meeting.","He should have forgotten the meeting.","He can't have forgotten the meeting."],
      ok:1,
      trap:"He must forget the meeting.",
      why:"Día 13. El futuro compuesto español no es futuro: es una deducción sobre el pasado, y eso en inglés es <code>must have + participio</code>. La D dice lo contrario: que es imposible que se le haya olvidado." }

  ]},

  /* ---------------------------------------------------------
     4. Cierre de semana
     --------------------------------------------------------- */
  { title: "Cierre de semana", items: [

    { type:"order",
      es:"Llevo dos años intentando dejar de fumar.",
      words:["I've","been","trying","to","give","up","smoking","for","two","years"],
      trap:"I try to give up to smoke since two years.",
      why:"Cuatro días en una frase: <em>have been trying</em> porque sigue en marcha (día 8), <em>for</em> porque hay duración (día 9), <em>try to</em> con infinitivo porque es un esfuerzo, y <em>give up smoking</em> con gerundio porque el phrasal lo pide (día 12)." },

    { type:"listening", mode:"dictation",
      audio:"I've been here since eight and I still haven't spoken to anyone.",
      why:"<em>Since</em> por el punto de partida, present perfect porque sigues ahí, y <em>still</em> delante del auxiliar negativo. Los tres puntos del día 9 en once palabras." },

    { type:"speaking", seconds:60,
      prompt:"Cuenta tu último año: algo que llevas tiempo haciendo, algo que hiciste en un momento concreto, algo que estás haciendo estas semanas y un plan cerrado. Un minuto.",
      useful:["I've been… for…","Back in March I…","At the moment I'm…","Next week I'm…","I'm going to…"],
      model:"I've been learning English seriously for about a year now, which sounds like a long time until you realise how much of it was watching series with subtitles. Back in March I finally signed up for the exam, mostly because paying for something makes me take it seriously. At the moment I'm working through past papers, and I'm finding that the reading is fine and the listening is a disaster. Next week I'm meeting a friend who took it last year, so she'll probably tell me everything I'm doing wrong. After that I'm going to book the date and stop postponing it." }

  ]}

  ]
});
