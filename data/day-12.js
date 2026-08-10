REGISTER_DAY({
  n: 12,
  title: "Gerundio o infinitivo",
  minutes: 31,

  blocks: [

  /* ---------------------------------------------------------
     1. La regla de la preposición
     --------------------------------------------------------- */
  { title: "Detrás de preposición, siempre -ing", items: [

    { type:"note", title:"La única regla del día que no tiene excepciones",
      html:"<p>En español, detrás de una preposición va infinitivo: <em>antes de salir</em>, <em>sin decir nada</em>, <em>por llegar tarde</em>.</p>" +
           "<p>En inglés va <b>gerundio</b>, siempre:</p>" +
           "<ul>" +
           "<li><code>before leaving</code></li>" +
           "<li><code>without saying anything</code></li>" +
           "<li><code>for arriving late</code></li>" +
           "<li><code>after finishing</code></li>" +
           "<li><code>instead of waiting</code></li>" +
           "</ul>" +
           "<p>La trampa fina está en el <b><em>to</em> que es preposición</b> y no marca de infinitivo. Cuando <em>to</em> forma parte de un bloque, lo que viene detrás lleva <em>-ing</em>:</p>" +
           "<table><tr><th>Bloque</th><th>Ejemplo</th></tr>" +
           "<tr><td><code>look forward to</code></td><td><code>I look forward to seeing you</code></td></tr>" +
           "<tr><td><code>be used to</code></td><td><code>I'm used to working late</code></td></tr>" +
           "<tr><td><code>get used to</code></td><td><code>You'll get used to living here</code></td></tr>" +
           "<tr><td><code>object to</code></td><td><code>They objected to paying</code></td></tr></table>" +
           "<p>Y no lo confundas con <code>used to + infinitivo</code>, que es otra cosa: <code>I used to work late</code> significa que antes lo hacía y ya no.</p>" },

    { type:"mcq",
      es:"Se fue sin decir nada.",
      opts:["He left without saying anything.","He left without said anything.","He left without to say anything.","He left without say anything."],
      ok:0,
      trap:"He left without to say anything.",
      why:"Detrás de preposición, gerundio. Sin excepciones. El infinitivo español se cuela aquí en cuanto bajas la guardia, y <em>without</em> es de las preposiciones donde más se nota." },

    { type:"mcq",
      es:"Estoy deseando verte.",
      opts:["I'm looking forward to see you.","I look forward seeing you.","I look forward to see you.","I look forward to seeing you."],
      ok:3,
      trap:"I look forward to see you.",
      why:"Ese <em>to</em> es **preposición**, no marca de infinitivo: forma parte del bloque <code>look forward to</code>. La prueba: puedes decir <code>I look forward to the weekend</code>, con un sustantivo detrás. Si admite sustantivo, es preposición, y entonces el verbo va en <em>-ing</em>." },

    { type:"mcq",
      es:"Ya me he acostumbrado a levantarme temprano.",
      opts:["I've got used to get up early.","I'm used to get up early.","I've got used to getting up early.","I used to getting up early."],
      ok:2,
      trap:"I've got used to get up early.",
      why:"<code>get used to</code> lleva ese <em>to</em> preposicional, así que gerundio. Y ojo con la D: <code>I used to get up early</code> existe, pero significa que antes lo hacía y ya no. Cambia el sentido por completo." },

    { type:"gap",
      es:"Gracias por ayudarme.",
      text:"Thank you for ___ me.",
      answer:["helping"],
      why:"<em>For</em> es preposición: gerundio. El español «gracias por ayudarme» empuja al infinitivo, y es de los errores que sobreviven a niveles altos porque la frase suena razonable de todas formas." }

  ]},

  /* ---------------------------------------------------------
     2. Verbos que piden uno u otro
     --------------------------------------------------------- */
  { title: "Verbos que mandan sobre el que viene detrás", items: [

    { type:"note", title:"Dos listas que hay que aprender, y una pista para recordarlas",
      html:"<p>Cuando un verbo lleva otro detrás, es el primero quien decide la forma del segundo.</p>" +
           "<table><tr><th>Piden -ing</th><th>Piden to + infinitivo</th></tr>" +
           "<tr><td>enjoy, avoid, finish, mind</td><td>want, need, decide, hope</td></tr>" +
           "<tr><td>suggest, imagine, deny, risk</td><td>promise, refuse, offer, agree</td></tr>" +
           "<tr><td>practise, consider, keep, miss</td><td>manage, afford, expect, plan</td></tr>" +
           "<tr><td>can't stand, give up, put off</td><td>seem, tend, learn, choose</td></tr></table>" +
           "<p>La pista que ayuda: los de <b>-ing</b> suelen mirar hacia algo <b>ya existente</b> (lo disfrutas, lo evitas, lo terminas); los de <b>to</b> miran hacia algo <b>que todavía no ha pasado</b> (lo quieres, lo decides, lo prometes). No es infalible, pero orienta.</p>" +
           "<p>Y una construcción muy rentable: <code>verbo + persona + to + infinitivo</code>. <code>She asked me to wait</code>, <code>They told him to leave</code>, <code>I want you to come</code>. En español dirías «me pidió que esperara», con subjuntivo; en inglés no hay subjuntivo aquí, hay infinitivo.</p>" },

    { type:"mcq",
      es:"Quiero que vengas.",
      opts:["I want you come.","I want you to come.","I want that you to come.","I want that you come."],
      ok:1,
      trap:"I want that you come.",
      why:"El «que + subjuntivo» del español se traduce con <code>persona + to + infinitivo</code>. <span class='bad'>I want that…</span> no existe en inglés, y es de los calcos que más se repiten porque en español no hay otra manera de decirlo." },

    { type:"mcq",
      es:"Evité hablar del tema.",
      opts:["I avoided talking about it.","I avoided talk about it.","I avoided that I talked about it.","I avoided to talk about it."],
      ok:0,
      trap:"I avoided to talk about it.",
      why:"<em>Avoid</em> está en la lista de <em>-ing</em>. Encaja con la pista: evitas algo que ya está ahí como posibilidad. Sus vecinos de lista son <em>enjoy</em>, <em>finish</em>, <em>mind</em> y <em>can't stand</em>." },

    { type:"mcq",
      es:"Me prometió llamar.",
      opts:["He promised that call.","He promised calling.","He promised me calling.","He promised to call."],
      ok:3,
      trap:"He promised calling.",
      why:"<em>Promise</em> mira al futuro, así que infinitivo con <em>to</em>. Va con <em>decide</em>, <em>refuse</em>, <em>offer</em> y <em>agree</em>: todos apuntan a algo que aún no ha ocurrido." },

    { type:"gap",
      es:"No me importa esperar.",
      text:"I don't mind ___.",
      answer:["waiting"],
      why:"<em>Mind</em> pide <em>-ing</em>. Guárdalo con su pregunta más útil: <code>Would you mind waiting?</code>, que es la forma educada de pedir algo. Y ojo: se responde <em>no</em> para aceptar, porque literalmente preguntas si le molesta." }

  ]},

  /* ---------------------------------------------------------
     3. Los que cambian de significado
     --------------------------------------------------------- */
  { title: "Los que cambian de significado", items: [

    { type:"note", title:"Cuatro verbos que dicen dos cosas distintas",
      html:"<table><tr><th>Verbo</th><th>Con -ing</th><th>Con to</th></tr>" +
           "<tr><td><code>stop</code></td><td>dejar de hacerlo<br><em>stop smoking</em></td><td>parar para hacerlo<br><em>stop to smoke</em></td></tr>" +
           "<tr><td><code>remember</code></td><td>acordarse de algo pasado<br><em>I remember locking it</em></td><td>acordarse de hacerlo<br><em>Remember to lock it</em></td></tr>" +
           "<tr><td><code>forget</code></td><td>olvidar algo vivido<br><em>I'll never forget meeting her</em></td><td>olvidarse de hacerlo<br><em>I forgot to call</em></td></tr>" +
           "<tr><td><code>try</code></td><td>probar a ver qué pasa<br><em>Try turning it off</em></td><td>intentar con esfuerzo<br><em>I tried to open it</em></td></tr></table>" +
           "<p>La lógica es la misma en los cuatro: el <b>gerundio mira hacia atrás</b>, a algo que ya ocurrió o ya existe; el <b>infinitivo mira hacia delante</b>, a la intención.</p>" +
           "<p>Por eso <code>He stopped smoking</code> es que lo dejó, y <code>He stopped to smoke</code> es que se detuvo para fumarse uno.</p>" },

    { type:"mcq",
      es:"Dejó de fumar el año pasado.",
      opts:["He stopped for smoking last year.","He stopped to smoke last year.","He stopped smoking last year.","He stopped smoke last year."],
      ok:2,
      trap:"He stopped to smoke last year.",
      why:"Dejar el hábito es <code>stop + -ing</code>. Con <em>to smoke</em> estarías diciendo que el año pasado se paró un momento para fumarse un cigarro, que es una anécdota rarísima como frase suelta." },

    { type:"mcq",
      es:"Acuérdate de cerrar con llave.",
      opts:["Remember locking the door.","Remember to lock the door.","Remember lock the door.","Remember for locking the door."],
      ok:1,
      trap:"Remember locking the door.",
      why:"Es un encargo para el futuro, así que infinitivo. Con <em>-ing</em> le estarías pidiendo que **recuerde el momento** en que cerró, como quien evoca un recuerdo. Mismo verbo, dos frases sin relación." },

    { type:"gap",
      es:"Prueba a apagarlo y volver a encenderlo.",
      text:"Try ___ it off and on again.",
      answer:["turning","switching"],
      why:"<code>try + -ing</code> es «prueba a ver si funciona», que es exactamente lo que se dice cuando algo falla. Con <code>try to turn it off</code> estarías diciendo que te esfuerzas en apagarlo y no lo consigues, quizá porque el botón está roto." }

  ]},

  /* ---------------------------------------------------------
     4. Escuchar
     --------------------------------------------------------- */
  { title: "Escuchar", items: [

    { type:"listening", mode:"mcq",
      audio:"I've given up trying to fix it myself, so I've decided to call someone, but I keep forgetting to do it.",
      question:"What is the speaker's situation?",
      opts:[
        "He has stopped attempting the repair and means to call someone, but keeps not doing it.",
        "He has already called someone and is waiting for them.",
        "He does not remember whether he called anyone.",
        "He has repaired it himself after several attempts."
      ],
      ok:0,
      why:"Tres estructuras del día seguidas: <em>give up trying</em> con gerundio, <em>decide to call</em> con infinitivo, y <em>forget to do it</em>, que es olvidarse de hacerlo, no olvidar haberlo hecho. La C confunde justo ese último matiz." },

    { type:"listening", mode:"dictation",
      audio:"I don't mind waiting, but I'd prefer to leave before eight.",
      why:"Dos verbos seguidos con formas distintas: <em>mind</em> pide gerundio y <em>prefer</em> pide infinitivo. No hay lógica que lo explique, hay que tenerlos fichados, y esta frase corta los pone uno al lado del otro." }

  ]},

  /* ---------------------------------------------------------
     5. Cierre
     --------------------------------------------------------- */
  { title: "Cierre: todo mezclado", items: [

    { type:"match", mode:"classify",
      es:"¿Qué pide cada verbo detrás?",
      instruction:"Pulsa una ficha y luego su columna",
      groups:["+ -ing","+ to"],
      items:[
        {t:"enjoy", g:0}, {t:"avoid", g:0}, {t:"can't stand", g:0},
        {t:"decide", g:1}, {t:"refuse", g:1}, {t:"manage", g:1}
      ],
      why:"La pista orienta aunque no sea ley: los de <b>-ing</b> miran a algo que ya existe (lo disfrutas, lo evitas, no lo aguantas); los de <b>to</b> miran a algo que aún no ha pasado (lo decides, te niegas, lo consigues)." },

    { type:"order",
      es:"Le pedí que esperara fuera.",
      words:["I","asked","him","to","wait","outside"],
      trap:"I asked that he waited outside.",
      why:"El «que + subjuntivo» del español se convierte en <code>persona + to + infinitivo</code>. La persona va pegada al verbo, sin preposición: <em>asked him</em>, nunca <span class='bad'>asked to him</span>." },

    { type:"gap",
      es:"Después de terminar, apagué el ordenador.",
      text:"After ___, I turned off the computer.",
      answer:["finishing"],
      why:"<em>After</em> es preposición, así que gerundio, aunque en español digas «después de terminar». Es la regla del primer bloque, que es la única del día que no admite excepciones." }

  ]}

  ]
});
