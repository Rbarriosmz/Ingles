REGISTER_DAY({
  n: 13,
  title: "Modales",
  minutes: 31,

  blocks: [

  /* ---------------------------------------------------------
     1. Obligación y consejo
     --------------------------------------------------------- */
  { title: "Obligación, prohibición y ausencia de obligación", items: [

    { type:"note", title:"El modal no lleva to, ni -s, ni auxiliar",
      html:"<p>Antes de los matices, tres cosas mecánicas que fallan mucho:</p>" +
           "<ul>" +
           "<li>Detrás del modal va <b>infinitivo sin to</b>: <code>I must go</code>, nunca <span class='bad'>I must to go</span>.</li>" +
           "<li>No llevan <b>-s</b> en tercera persona: <code>She can swim</code>, nunca <span class='bad'>She cans</span>.</li>" +
           "<li>Hacen de auxiliar ellos mismos: <code>Can you help?</code>, <code>She shouldn't go</code>, sin <em>do</em>.</li>" +
           "</ul>" +
           "<p>Y ahora el mapa de la obligación, donde está la trampa gorda:</p>" +
           "<table><tr><th>Forma</th><th>Significa</th></tr>" +
           "<tr><td><code>must</code> / <code>have to</code></td><td>Tienes que hacerlo</td></tr>" +
           "<tr><td><code>mustn't</code></td><td><b>Está prohibido</b></td></tr>" +
           "<tr><td><code>don't have to</code></td><td><b>No hace falta</b>, pero puedes</td></tr>" +
           "<tr><td><code>should</code></td><td>Deberías, es un consejo</td></tr></table>" +
           "<p>Fíjate bien: <em>mustn't</em> y <em>don't have to</em> suenan parecidos y significan lo contrario. <code>You mustn't tell her</code> es «no se lo digas»; <code>You don't have to tell her</code> es «no estás obligado a decírselo».</p>" +
           "<p>Diferencia entre <em>must</em> y <em>have to</em>: <em>must</em> suele venir de quien habla, <em>have to</em> de una norma externa. <code>I must stop smoking</code> me lo digo yo; <code>I have to wear a uniform</code> lo manda la empresa.</p>" },

    { type:"mcq",
      es:"No hace falta que vengas, pero puedes si quieres.",
      opts:["You mustn't come, but you can if you want.","You don't have to come, but you can if you want.","You shouldn't come, but you can if you want.","You haven't to come, but you can if you want."],
      ok:1,
      trap:"You mustn't come, but you can if you want.",
      why:"<em>Mustn't</em> prohíbe; <em>don't have to</em> libera. La frase con <em>mustn't</em> se contradice a sí misma: le prohíbes venir y acto seguido le dices que puede. Es el error de este bloque que más cambia el mensaje." },

    { type:"mcq",
      es:"Tienes que llevar casco en la obra.",
      opts:["You have to wear a helmet on site.","You have wear a helmet on site.","You must wearing a helmet on site.","You must to wear a helmet on site."],
      ok:0,
      trap:"You must to wear a helmet on site.",
      why:"Es una norma externa, así que <em>have to</em> encaja mejor que <em>must</em>. Y detrás del modal nunca va <em>to</em>: la D añade el <em>to</em> del infinitivo español, que aquí sobra." },

    { type:"mcq",
      es:"Deberías descansar más.",
      opts:["You shoulds rest more.","You do should rest more.","You should to rest more.","You should rest more."],
      ok:3,
      trap:"You should to rest more.",
      why:"Las tres reglas mecánicas del bloque en una frase: sin <em>to</em>, sin <em>-s</em> y sin <em>do</em>. <em>Should</em> es el consejo por defecto; para algo más fuerte está <em>ought to</em>, que es el único modal que sí lleva <em>to</em>." },

    { type:"gap",
      es:"No puedes aparcar aquí, está prohibido.",
      text:"You ___ park here, it's forbidden.",
      answer:["mustn't","cannot","can't"],
      why:"Prohibición: <em>mustn't</em> o <em>can't</em>. Lo que no vale aquí es <em>don't have to</em>, que diría que aparcar es opcional. Y fíjate en que la contracción <em>mustn't</em> se pronuncia sin la primera <em>t</em>." }

  ]},

  /* ---------------------------------------------------------
     2. Deducción
     --------------------------------------------------------- */
  { title: "Deducir: must, can't, might", items: [

    { type:"note", title:"Los mismos modales sirven para adivinar",
      html:"<p>El segundo trabajo de los modales es expresar **cuánto te fías** de lo que dices.</p>" +
           "<table><tr><th>Seguridad</th><th>Presente</th><th>Pasado</th></tr>" +
           "<tr><td>Casi seguro que sí</td><td><code>must be</code></td><td><code>must have been</code></td></tr>" +
           "<tr><td>Es posible</td><td><code>might / may / could be</code></td><td><code>might have been</code></td></tr>" +
           "<tr><td>Casi seguro que no</td><td><code>can't be</code></td><td><code>can't have been</code></td></tr></table>" +
           "<p>La trampa: para negar una deducción se usa <b><em>can't</em>, nunca <em>mustn't</em></b>. <code>He can't be at home</code> es «no puede estar en casa». <code>He mustn't be at home</code> significaría que tiene prohibido estar allí.</p>" +
           "<p>Y para el pasado, la fórmula es siempre <b>modal + have + participio</b>: <code>She must have forgotten</code>, <code>They can't have arrived yet</code>, <code>It might have rained</code>.</p>" +
           "<p>Con esa misma estructura está el arrepentimiento: <code>should have + participio</code>. <code>I should have called</code> es «debería haber llamado, y no llamé».</p>" },

    { type:"mcq",
      es:"No puede estar dormido, tiene la luz encendida.",
      opts:["He shouldn't be asleep, his light is on.","He mustn't be asleep, his light is on.","He can't be asleep, his light is on.","He doesn't must be asleep, his light is on."],
      ok:2,
      trap:"He mustn't be asleep, his light is on.",
      why:"Para deducir que algo **es imposible** se usa <em>can't</em>. <em>Mustn't</em> pertenece al mundo de la prohibición: la B diría que tiene prohibido dormirse, que no es lo que la luz encendida sugiere." },

    { type:"mcq",
      es:"Se le habrá olvidado.",
      opts:["He must forget it.","He must have forgotten.","He must forgot it.","He should have forgotten."],
      ok:1,
      trap:"He must forget it.",
      why:"Deducción sobre el pasado: <code>must have + participio</code>. El futuro compuesto español («se le habrá olvidado») no es futuro en absoluto: es una suposición sobre algo que ya pasó, y ese es el calco que hay que desmontar." },

    { type:"mcq",
      es:"Debería haberte avisado, lo siento.",
      opts:["I should have told you, sorry.","I must have told you, sorry.","I should telling you, sorry.","I should warn you, sorry."],
      ok:0,
      trap:"I should warn you, sorry.",
      why:"<code>should have + participio</code> es el arrepentimiento por lo que no hiciste. Y ojo con <em>warn</em>, que es avisar de un peligro; para «avisar» de informar se usa <em>tell</em> o <em>let someone know</em>." },

    { type:"gap",
      es:"Puede que esté en una reunión.",
      text:"She ___ be in a meeting.",
      answer:["might","may","could"],
      why:"Posibilidad abierta: valen los tres. Fíjate en que ninguno lleva <em>to</em> ni cambia con la persona. Y para el pasado sería <code>she might have been in a meeting</code>." }

  ]},

  /* ---------------------------------------------------------
     3. Pedir y ofrecer
     --------------------------------------------------------- */
  { title: "Pedir con educación", items: [

    { type:"note", title:"La escala de cortesía",
      html:"<p>En inglés la cortesía se marca con el modal, no con el tono. Cambiar <em>can</em> por <em>could</em> es la diferencia entre sonar seco y sonar normal.</p>" +
           "<table><tr><th>Fórmula</th><th>Registro</th></tr>" +
           "<tr><td><code>Can you…?</code></td><td>Directo, entre amigos</td></tr>" +
           "<tr><td><code>Could you…?</code></td><td>Neutro, sirve casi siempre</td></tr>" +
           "<tr><td><code>Would you mind + -ing?</code></td><td>Muy educado</td></tr>" +
           "<tr><td><code>Do you think you could…?</code></td><td>Cuando pides un favor grande</td></tr></table>" +
           "<p>Para ofrecerte: <code>Shall I…?</code> y <code>Would you like…?</code>. Y para pedir permiso, <code>May I…?</code> es el más formal.</p>" +
           "<p>Una advertencia sobre <b>would</b>: no es solo cortesía. También es el condicional (<em>I would go if…</em>) y el pasado habitual (<em>When I was a child, we would spend summers there</em>), que equivale a <em>used to</em>.</p>" },

    { type:"mcq",
      es:"¿Te importaría esperar cinco minutos?",
      opts:["Would you mind wait five minutes?","Do you mind to wait five minutes?","Would you mind to wait five minutes?","Would you mind waiting five minutes?"],
      ok:3,
      trap:"Would you mind to wait five minutes?",
      why:"<em>Mind</em> pide gerundio, como viste ayer. Y recuerda la respuesta: para aceptar se dice <b>no</b>, porque literalmente preguntas si le molesta. Contestar <em>yes</em> es negarse." },

    { type:"mcq",
      es:"¿Te abro la ventana?",
      opts:["Do I open the window?","Will I open the window?","Shall I open the window?","Am I opening the window?"],
      ok:2,
      trap:"Do I open the window?",
      why:"<code>Shall I…?</code> es la fórmula para ofrecerse a hacer algo. Es de los pocos usos vivos de <em>shall</em> en inglés actual, junto con <code>Shall we…?</code> para proponer un plan." },

    { type:"gap",
      es:"De niño pasábamos los veranos en el pueblo.",
      text:"When I was a child, we ___ spend the summers in the village.",
      answer:["would","used to"],
      why:"<em>Would</em> también sirve para hábitos del pasado, como <em>used to</em>. La diferencia: <em>used to</em> vale para estados (<code>I used to live there</code>) y <em>would</em> solo para acciones repetidas. <span class='bad'>I would live there</span> no funciona como hábito." }

  ]},

  /* ---------------------------------------------------------
     4. Escuchar y hablar
     --------------------------------------------------------- */
  { title: "Escuchar y hablar", items: [

    { type:"listening", mode:"mcq",
      audio:"You don't have to come to the meeting, but if you do, you mustn't mention the budget. She might not know yet.",
      question:"What is the speaker telling the other person?",
      opts:[
        "Attending is compulsory and the budget must be discussed.",
        "Attending is optional, but talking about the budget is not allowed.",
        "They are forbidden to attend and should not speak at all.",
        "They should attend and explain the budget to her."
      ],
      ok:1,
      why:"La frase pone <em>don't have to</em> y <em>mustn't</em> uno detrás de otro, que es exactamente donde se cae. El primero libera de la asistencia; el segundo prohíbe hablar del presupuesto. Y <em>might not know</em> añade que ni siquiera es seguro." },

    { type:"speaking", seconds:60,
      prompt:"Alguien empieza mañana en tu trabajo. Explícale tres cosas obligatorias, dos que no hacen falta y una prohibida. Usa have to, don't have to y mustn't.",
      useful:["You have to…","You don't have to…, but…","You mustn't…","You should probably…","Nobody will tell you this, but…"],
      model:"Right, a few things. You have to badge in at reception every morning, even if somebody holds the door for you, because the system counts who is in the building. You have to book a meeting room in advance, and you have to send the weekly summary before Friday lunchtime. You don't have to come in before nine, whatever anybody implies, and you don't have to answer messages at the weekend. The one thing you mustn't do is share the client folder outside the team. People will ask. Say no and send them to me. And you should probably learn how the coffee machine works before you need it." }

  ]},

  /* ---------------------------------------------------------
     5. Cierre
     --------------------------------------------------------- */
  { title: "Cierre: todo mezclado", items: [

    { type:"match", mode:"pairs",
      es:"Une cada frase con lo que de verdad significa.",
      instruction:"Pulsa una frase y luego su significado",
      pairs:[
        {l:"You mustn't tell her",       r:"está prohibido decírselo"},
        {l:"You don't have to tell her", r:"no hace falta, pero puedes"},
        {l:"You should tell her",        r:"es un consejo"},
        {l:"She must have left",         r:"seguro que se fue ya"},
        {l:"She can't have left",        r:"es imposible que se haya ido"},
        {l:"She might have left",        r:"puede que se haya ido"}
      ],
      why:"Las seis se dirían en español con «deber» o «poder», y en inglés cada una lleva su modal. Los dos que más se cruzan son <em>mustn't</em> y <em>don't have to</em>: prohibición contra libertad." },

    { type:"mcq",
      es:"Habrá perdido el tren; debería haber salido antes.",
      opts:["He must have missed the train; he should have left earlier.","He should have missed the train; he must have left earlier.","He might miss the train; he must leave earlier.","He must miss the train; he should leave earlier."],
      ok:0,
      trap:"He must miss the train; he should leave earlier.",
      why:"Las dos mitades hablan del pasado, así que las dos piden <code>modal + have + participio</code>. La primera deduce lo que pasó, la segunda lamenta lo que no se hizo. El futuro compuesto español despista en la primera." },

    { type:"listening", mode:"dictation",
      audio:"You don't have to book, but you should get there early.",
      why:"Los dos modales del día en su forma más limpia: <em>don't have to</em> libera y <em>should</em> aconseja. Si al escribirlo te ha salido <em>mustn't</em>, has convertido un consejo amable en una prohibición." }

  ]}

  ]
});
