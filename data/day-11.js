REGISTER_DAY({
  n: 11,
  title: "Hablar del futuro",
  minutes: 30,

  blocks: [

  /* ---------------------------------------------------------
     1. will y going to
     --------------------------------------------------------- */
  { title: "El futuro no se elige por tiempo, sino por intención", items: [

    { type:"note", title:"Tres futuros y cada uno dice algo distinto",
      html:"<p>El español tiene <em>iré</em> y <em>voy a ir</em>, y los usa casi como sinónimos. El inglés los reparte por lo que hay <b>detrás</b> de la frase.</p>" +
           "<table><tr><th>Forma</th><th>Cuándo</th><th>Ejemplo</th></tr>" +
           "<tr><td><code>will</code></td><td>Decisión del momento, predicción, promesa</td><td><code>I'll help you</code></td></tr>" +
           "<tr><td><code>going to</code></td><td>Intención ya pensada, o prueba a la vista</td><td><code>I'm going to study medicine</code></td></tr>" +
           "<tr><td>Presente continuo</td><td>Cita cerrada, con hora y sitio</td><td><code>I'm meeting Ana at six</code></td></tr></table>" +
           "<p>La diferencia se ve mejor con la misma situación:</p>" +
           "<ul>" +
           "<li>Suena el teléfono. <code>I'll get it.</code> — lo decides ahora.</li>" +
           "<li>Ya lo tenías pensado. <code>I'm going to call her tonight.</code></li>" +
           "<li>Está en la agenda. <code>I'm seeing the doctor at nine.</code></li>" +
           "</ul>" +
           "<p>Y una regla que ahorra errores: <b>detrás de <em>when</em>, <em>if</em>, <em>as soon as</em>, <em>until</em> y <em>before</em> no va futuro</b>, aunque el español lo pida. <code>When he arrives, I'll tell him.</code></p>" },

    { type:"mcq",
      es:"—Hace frío. —Cierro la ventana.",
      opts:["It's cold. — I close the window.","It's cold. — I'm closing the window.","It's cold. — I'm going to close the window.","It's cold. — I'll close the window."],
      ok:3,
      trap:"It's cold. — I'm going to close the window.",
      why:"Lo decides **en ese instante**, al oír el comentario, y eso es exactamente <em>will</em>. Con <em>going to</em> darías a entender que ya lo tenías pensado antes de que hablara, lo cual no encaja con una reacción." },

    { type:"mcq",
      es:"Mira esas nubes: va a llover.",
      opts:["Look at those clouds: it's raining.","Look at those clouds: it will rain.","Look at those clouds: it's going to rain.","Look at those clouds: it rains."],
      ok:2,
      trap:"Look at those clouds: it will rain.",
      why:"Hay **pruebas a la vista**, y eso pide <em>going to</em>. <em>Will</em> serviría para una predicción basada en tu opinión (<em>I think it will rain tomorrow</em>), pero aquí las nubes ya están ahí." },

    { type:"mcq",
      es:"Mañana como con mi hermana. (quedamos la semana pasada)",
      opts:["Tomorrow I will have lunch with my sister.","Tomorrow I'm having lunch with my sister.","Tomorrow I have lunch with my sister.","Tomorrow I'm going to have lunch with my sister."],
      ok:1,
      trap:"Tomorrow I will have lunch with my sister.",
      why:"Cita cerrada con otra persona: presente continuo. La D no está mal, pero se queda en la intención; el continuo transmite que está apalabrado, que es lo que dice el paréntesis. La A suena a decisión improvisada." },

    { type:"gap",
      es:"Cuando llegue a casa, te llamo.",
      text:"When I ___ home, I'll call you.",
      answer:["get","arrive"],
      why:"Detrás de <em>when</em> **no va futuro**, aunque el español use subjuntivo. Va presente simple, y el futuro se queda en la otra mitad de la frase. Lo mismo con <em>if</em>, <em>as soon as</em>, <em>before</em> y <em>until</em>. Y ojo: se llega <em>home</em> sin preposición." }

  ]},

  /* ---------------------------------------------------------
     2. Los matices de will
     --------------------------------------------------------- */
  { title: "Lo que will hace además de futuro", items: [

    { type:"note", title:"Ofrecer, prometer, negarse",
      html:"<p><em>Will</em> no solo coloca algo en el futuro: también marca la actitud de quien habla.</p>" +
           "<ul>" +
           "<li><b>Ofrecimiento</b>: <code>I'll carry that for you.</code></li>" +
           "<li><b>Promesa</b>: <code>I'll be there, I promise.</code></li>" +
           "<li><b>Petición</b>: <code>Will you close the door?</code></li>" +
           "<li><b>Negativa</b>: <code>The car won't start.</code> — el coche se niega a arrancar</li>" +
           "</ul>" +
           "<p>Ese último uso de <em>won't</em> no tiene nada que ver con el futuro: describe una resistencia presente. <code>He won't listen</code> es «no hay manera de que escuche», no «no escuchará».</p>" +
           "<p>Y para lo que estará en marcha en un momento futuro está el <b>futuro continuo</b>: <code>This time tomorrow I'll be flying to Lisbon.</code> Muy útil también para preguntar sin presionar: <code>Will you be using the car tonight?</code> suena menos exigente que <code>Are you going to use…</code></p>" },

    { type:"mcq",
      es:"El ordenador no arranca.",
      opts:["The computer won't start.","The computer isn't starting.","The computer will not to start.","The computer doesn't start."],
      ok:0,
      trap:"The computer doesn't start.",
      why:"<em>Won't</em> aquí no es futuro: expresa que la máquina **se resiste**, ahora mismo. La D describiría un defecto de fábrica permanente. Es un uso muy inglés que en español resolvemos con «no hay manera»." },

    { type:"mcq",
      es:"Mañana a esta hora estaré volando a Lisboa.",
      opts:["This time tomorrow I fly to Lisbon.","Tomorrow at this time I'm flying to Lisbon.","Tomorrow at this time I'll fly to Lisbon.","This time tomorrow I'll be flying to Lisbon."],
      ok:3,
      trap:"Tomorrow at this time I'll fly to Lisbon.",
      why:"Algo que **estará en curso** en un momento futuro pide futuro continuo: <code>will be + -ing</code>. Y fíjate en el orden de la expresión: <em>this time tomorrow</em>, no <em>tomorrow at this time</em>, que es el calco del español." },

    { type:"gap",
      es:"Te ayudo con eso.",
      text:"___ help you with that.",
      answer:["i'll","i will"],
      why:"Ofrecerse en el momento es <em>will</em>. Con <em>I'm going to help you</em> sonaría a que ya lo habías decidido antes de verle apurado, y el ofrecimiento perdería su gracia." }

  ]},

  /* ---------------------------------------------------------
     3. El presente para horarios
     --------------------------------------------------------- */
  { title: "El futuro que se dice en presente", items: [

    { type:"note", title:"Horarios y calendarios van en presente simple",
      html:"<p>Hay un cuarto futuro, y es el más raro para un hispanohablante: el <b>presente simple</b> para cosas fijadas por un horario oficial.</p>" +
           "<ul>" +
           "<li><code>The train leaves at 7.40.</code></li>" +
           "<li><code>The film starts at nine.</code></li>" +
           "<li><code>Term ends on 21 June.</code></li>" +
           "</ul>" +
           "<p>La diferencia con el continuo es de quién decide: el continuo es <b>tu</b> agenda, el simple es un <b>horario que no controlas</b>.</p>" +
           "<table><tr><th>Frase</th><th>Qué implica</th></tr>" +
           "<tr><td><code>I'm leaving at seven</code></td><td>Lo he decidido yo</td></tr>" +
           "<tr><td><code>The bus leaves at seven</code></td><td>Lo decide la compañía</td></tr></table>" },

    { type:"mcq",
      es:"El tren sale a las siete y cuarto.",
      opts:["The train is leaving at 7.15.","The train is going to leave at 7.15.","The train leaves at 7.15.","The train will leave at 7.15."],
      ok:2,
      trap:"The train will leave at 7.15.",
      why:"Un horario publicado va en **presente simple**. Las otras tres no son imposibles, pero cambian el matiz: sugieren que la salida depende de alguien en vez de estar fijada en un panel." },

    { type:"mcq",
      es:"¿Vas a venir a la fiesta el sábado?",
      opts:["Will you come to the party on Saturday?","Are you coming to the party on Saturday?","Do you come to the party on Saturday?","Are you going to come to the party on Saturday?"],
      ok:1,
      trap:"Will you come to the party on Saturday?",
      why:"Preguntar por los planes ya hechos de alguien se hace con **presente continuo**. Con <em>will you come?</em> estarías invitándole en ese momento, que es otra cosa; y con <em>are you going to</em> preguntarías por su intención, algo más insistente." },

    { type:"gap",
      es:"La película empieza a las nueve, así que salimos a las ocho y media.",
      text:"The film ___ at nine, so we're leaving at half past eight.",
      answer:["starts","begins"],
      why:"Las dos mitades usan futuros distintos por buenos motivos: el horario del cine no lo decides tú (presente simple), pero la hora de salir de casa sí (presente continuo). La frase enfrenta los dos criterios." }

  ]},

  /* ---------------------------------------------------------
     4. Escuchar y hablar
     --------------------------------------------------------- */
  { title: "Escuchar y hablar", items: [

    { type:"listening", mode:"mcq",
      audio:"I'm seeing the dentist at four, so I won't be back before six, but I'll text you when I leave.",
      question:"What do we know about the speaker's plans?",
      opts:[
        "She has an appointment booked and will send a message afterwards.",
        "She expects to be home before six o'clock.",
        "She is refusing to come back to the office today.",
        "She is thinking about making a dental appointment."
      ],
      ok:0,
      why:"<em>I'm seeing</em> es cita cerrada, <em>won't be back</em> es predicción y <em>I'll text you</em> es promesa hecha en el momento. Tres futuros distintos en una frase, cada uno con su función." },

    { type:"speaking", seconds:60,
      prompt:"Cuenta tus planes: algo que tienes apalabrado esta semana, algo que piensas hacer pero aún no has cerrado, y una predicción sobre este año.",
      useful:["On Thursday I'm…","I'm going to…","I think I'll…","It'll probably…","As soon as I…"],
      model:"On Thursday I'm having dinner with some old colleagues, which we arranged about a month ago and I have already postponed twice, so this time I have to go. I'm also going to start running again, or at least that is what I keep telling people. I've bought the shoes, which I suppose is the intention made visible. As for this year, I think it'll be quieter than the last one. Work will probably slow down in the summer, and as soon as it does I'm taking two weeks off and going nowhere at all." }

  ]},

  /* ---------------------------------------------------------
     5. Cierre
     --------------------------------------------------------- */
  { title: "Cierre: todo mezclado", items: [

    { type:"match", mode:"pairs",
      es:"Une cada situación con el futuro que le corresponde.",
      instruction:"Pulsa una situación y luego su forma",
      pairs:[
        {l:"Lo decides ahora mismo",        r:"I'll do it"},
        {l:"Ya lo tenías pensado",          r:"I'm going to do it"},
        {l:"Está en la agenda, con hora",   r:"I'm doing it at six"},
        {l:"Lo marca un horario oficial",   r:"It starts at six"},
        {l:"Estará en curso en ese momento", r:"I'll be doing it"},
        {l:"Detrás de when o if",           r:"When I do it…"}
      ],
      why:"Los seis dicen «futuro» en español y cada uno significa otra cosa en inglés. La pregunta que resuelve casi todos los casos es: ¿quién decide, y cuándo se decidió?" },

    { type:"mcq",
      es:"En cuanto sepa algo, te aviso.",
      opts:["As soon as I know something, I tell you.","As soon as I'm knowing something, I'll tell you.","As soon as I'll know something, I'll tell you.","As soon as I know something, I'll tell you."],
      ok:3,
      trap:"As soon as I'll know something, I'll tell you.",
      why:"Detrás de <em>as soon as</em> no va futuro: presente simple. Y <em>know</em> es verbo de estado, así que tampoco admite continuo. El futuro se queda solo en la segunda mitad." },

    { type:"listening", mode:"dictation",
      audio:"The meeting starts at ten, but I'm getting there early because I'll need the printer.",
      why:"Los tres futuros del día seguidos: horario oficial en presente simple, plan personal en continuo y previsión en <em>will</em>. Si al escribirlo has puesto los tres iguales, ahí está lo que hay que separar." }

  ]}

  ]
});
