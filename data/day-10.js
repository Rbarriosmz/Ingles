REGISTER_DAY({
  n: 10,
  title: "Los tiempos continuos",
  minutes: 31,

  blocks: [

  /* ---------------------------------------------------------
     1. Presente simple frente a continuo
     --------------------------------------------------------- */
  { title: "Rutina o momento", items: [

    { type:"note", title:"El inglés separa lo que haces siempre de lo que estás haciendo",
      html:"<p>El español tiene <em>estoy haciendo</em>, pero lo usa mucho menos que el inglés. Donde nosotros decimos <em>trabajo en Madrid este mes</em>, el inglés obliga a elegir.</p>" +
           "<table><tr><th></th><th>Presente simple</th><th>Presente continuo</th></tr>" +
           "<tr><td>Sirve para</td><td>Rutinas, hechos permanentes</td><td>Lo que pasa ahora o en una etapa</td></tr>" +
           "<tr><td>Ejemplo</td><td><code>I work in Madrid</code></td><td><code>I'm working in Madrid this month</code></td></tr>" +
           "<tr><td>Marcas</td><td>always, usually, every day</td><td>now, at the moment, this week</td></tr></table>" +
           "<p>El error más caro va en la otra dirección: usar el simple donde toca continuo. <span class='bad'>What do you do? I read a book.</span> suena a que leer libros es tu profesión. Lo que querías decir es <code>I'm reading a book</code>.</p>" +
           "<p>Y hay un uso del continuo que el español no tiene: con <code>always</code> expresa fastidio. <code>He's always losing his keys</code> no informa de una costumbre, se queja de ella.</p>" },

    { type:"mcq",
      es:"—¿Qué haces? —Estoy preparando la cena.",
      opts:["What are you doing? I make dinner.","What do you do? I prepare dinner.","What are you doing? I'm making dinner.","What do you do? I'm making dinner."],
      ok:2,
      trap:"What do you do? I prepare dinner.",
      why:"<code>What do you do?</code> pregunta por tu profesión; para el momento es <code>What are you doing?</code>. Y la cena se hace con <em>make</em>, no con <em>prepare</em>, que suena a informe. Dos calcos en una frase de cuatro palabras." },

    { type:"mcq",
      es:"Este mes trabajo desde casa.",
      opts:["This month I work from home.","This month I'm working from home.","This month I am work from home.","This month I working from home."],
      ok:1,
      trap:"This month I work from home.",
      why:"Una situación **temporal** pide continuo, aunque dure semanas. Con el simple estarías diciendo que trabajar desde casa es tu forma habitual de trabajar, y el <em>this month</em> quedaría contradiciéndolo." },

    { type:"mcq",
      es:"Siempre está perdiendo el móvil.",
      opts:["He's always losing his phone.","He is always lose his phone.","He always is losing his phone.","He always loses his phone."],
      ok:0,
      trap:"He always loses his phone.",
      why:"La A y la D son las dos gramaticales, pero significan cosas distintas. La D informa de una costumbre; la A, con <b>continuo + always</b>, expresa fastidio, que es lo que transmite el español. Fíjate además en que <em>always</em> va entre el auxiliar y el gerundio." },

    { type:"gap",
      es:"Normalmente cojo el autobús, pero hoy voy andando.",
      text:"I usually take the bus, but today I'm ___.",
      answer:["walking"],
      why:"La misma frase enfrenta los dos tiempos: <em>usually</em> pide simple y <em>today</em> pide continuo. Cuando veas las dos marcas en una frase, casi siempre el examen está midiendo justo este contraste." }

  ]},

  /* ---------------------------------------------------------
     2. Verbos que no admiten continuo
     --------------------------------------------------------- */
  { title: "Los verbos que nunca llevan -ing", items: [

    { type:"note", title:"Estados, no acciones",
      html:"<p>Un grupo de verbos describe estados, no cosas que se hacen, y por eso no admiten continuo aunque el momento sea ahora mismo.</p>" +
           "<ul>" +
           "<li><b>Sentidos y percepción</b>: <code>see</code>, <code>hear</code>, <code>smell</code>, <code>taste</code>, <code>seem</code>, <code>look like</code></li>" +
           "<li><b>Opinión y mente</b>: <code>know</code>, <code>believe</code>, <code>understand</code>, <code>remember</code>, <code>mean</code>, <code>agree</code></li>" +
           "<li><b>Sentimiento</b>: <code>like</code>, <code>love</code>, <code>hate</code>, <code>prefer</code>, <code>want</code>, <code>need</code></li>" +
           "<li><b>Posesión</b>: <code>have</code> (de tener), <code>own</code>, <code>belong</code>, <code>cost</code></li>" +
           "</ul>" +
           "<p>Por eso <span class='bad'>I'm knowing</span>, <span class='bad'>I'm wanting</span> y <span class='bad'>I'm having a car</span> están mal.</p>" +
           "<p>Ojo con los que cambian de bando según el significado:</p>" +
           "<table><tr><th>Estado (simple)</th><th>Acción (continuo)</th></tr>" +
           "<tr><td><code>I have a car</code> — poseo</td><td><code>I'm having lunch</code> — como</td></tr>" +
           "<tr><td><code>I think it's fine</code> — opino</td><td><code>I'm thinking about it</code> — le doy vueltas</td></tr>" +
           "<tr><td><code>It tastes good</code> — sabe</td><td><code>I'm tasting the soup</code> — la pruebo</td></tr></table>" },

    { type:"mcq",
      es:"No entiendo lo que dice.",
      opts:["I'm not understanding what he's saying.","I don't understand what he says.","I'm not understanding what he says.","I don't understand what he's saying."],
      ok:3,
      trap:"I'm not understanding what he's saying.",
      why:"<em>Understand</em> es un estado: nunca lleva continuo, aunque el no entender esté pasando ahora mismo. Pero <em>say</em> sí es una acción en curso, así que la segunda mitad va en continuo. La misma frase con los dos criterios." },

    { type:"mcq",
      es:"Estamos comiendo, te llamo luego.",
      opts:["We're having a lunch, I'll call you later.","We have lunch, I'll call you later.","We're having lunch, I'll call you later.","We are have lunch, I'll call you later."],
      ok:2,
      trap:"We have lunch, I'll call you later.",
      why:"Aquí <em>have</em> no es poseer sino comer, así que sí admite continuo: <code>having lunch</code>. Es el caso que rompe la regla y por eso conviene tenerlo fichado. Y <em>lunch</em> va sin artículo." },

    { type:"gap",
      es:"Esta sopa sabe rara.",
      text:"This soup ___ strange.",
      answer:["tastes"],
      why:"Aquí <em>taste</em> describe el sabor que tiene la sopa, que es un estado: presente simple. Si tú estuvieras probándola sería <code>I'm tasting the soup</code>, porque entonces sí hay una acción tuya en marcha." }

  ]},

  /* ---------------------------------------------------------
     3. Pasado continuo
     --------------------------------------------------------- */
  { title: "El pasado continuo y su pareja", items: [

    { type:"note", title:"El fondo y la interrupción",
      html:"<p>El pasado continuo pinta el <b>fondo</b>; el pasado simple cuenta lo que <b>pasó dentro</b> de ese fondo.</p>" +
           "<p><code>I was cooking when the phone rang.</code><br>" +
           "Cocinar es el escenario, ya estaba en marcha. Sonar el teléfono es el suceso que lo corta.</p>" +
           "<ul>" +
           "<li>Dos fondos a la vez: <code>While she was reading, he was cooking.</code></li>" +
           "<li>Dos sucesos seguidos: <code>He came in and sat down.</code></li>" +
           "<li>Fondo interrumpido: <code>We were leaving when it started to rain.</code></li>" +
           "</ul>" +
           "<p>Las conjunciones ayudan: <b>while</b> suele acompañar al continuo y <b>when</b> al simple, aunque no es una ley.</p>" +
           "<p>Cuidado con un calco: el español <em>estuve cocinando dos horas</em> es duración cerrada, y en inglés eso es <code>I cooked for two hours</code>, no el continuo.</p>" },

    { type:"mcq",
      es:"Estaba duchándome cuando sonó el timbre.",
      opts:["I had a shower when the bell rang.","I was having a shower when the bell rang.","I was having a shower when the bell was ringing.","I had a shower when the bell was ringing."],
      ok:1,
      trap:"I had a shower when the bell rang.",
      why:"La ducha es el fondo, así que continuo; el timbre es la interrupción, así que simple. Ponerlos los dos en continuo daría a entender que las dos cosas duraban a la vez, y ponerlos los dos en simple, que primero te duchaste y luego sonó." },

    { type:"mcq",
      es:"Mientras yo cocinaba, ella ponía la mesa.",
      opts:["While I was cooking, she was laying the table.","While I was cooking, she laid the table.","While I cooked, she was laying the table.","While I cooked, she laid the table."],
      ok:0,
      trap:"While I cooked, she laid the table.",
      why:"Dos acciones largas que ocurren **a la vez**: las dos en continuo. Es el uso de <em>while</em> con dos fondos paralelos. La B sería correcta si poner la mesa fuera un instante dentro de tu cocinado, pero el español las presenta como simultáneas." },

    { type:"gap",
      es:"Estuvimos esperando media hora y al final se fue.",
      text:"We ___ for half an hour and in the end he left.",
      answer:["waited"],
      why:"Aquí la espera es una duración **cerrada y completa**, no un fondo interrumpido: pasado simple. El «estuvimos esperando» del español despista, pero <code>we were waiting</code> pediría que algo la cortara." }

  ]},

  /* ---------------------------------------------------------
     4. Escuchar y hablar
     --------------------------------------------------------- */
  { title: "Escuchar y hablar", items: [

    { type:"listening", mode:"mcq",
      audio:"I was leaving the office when I realised I'd left my laptop on the desk, so I'm working from a café now.",
      question:"What happened?",
      opts:[
        "He works in a café every day because the office is closed.",
        "He left his laptop at the café and is going back to the office.",
        "He is still in the office waiting for his laptop.",
        "He forgot his laptop and went back for it, and is now in a café."
      ],
      ok:3,
      why:"Tres tiempos en una frase: <em>was leaving</em> es el fondo, <em>realised</em> lo interrumpe, <em>I'd left</em> es lo anterior a los dos, y <em>I'm working</em> es la situación temporal de ahora. La A confunde lo temporal con lo habitual." },

    { type:"speaking", seconds:60,
      prompt:"Describe qué estabas haciendo ayer a esta misma hora y en qué estás trabajando estas semanas. Mezcla pasado continuo y presente continuo.",
      useful:["At this time yesterday I was…","I was just about to…","At the moment I'm…","These weeks I'm…","I usually… but this week…"],
      model:"At this time yesterday I was sitting in a meeting that should have lasted forty minutes and lasted two hours, so I was checking my phone under the table like everybody else. Then I was walking home when it started raining, which is why I'm still drying my shoes today. At the moment I'm working on a report that nobody has asked for, which tells you something about my job. I usually work in the office three days a week, but this month I'm working from home because they're painting the whole floor." }

  ]},

  /* ---------------------------------------------------------
     5. Cierre
     --------------------------------------------------------- */
  { title: "Cierre: todo mezclado", items: [

    { type:"mcq",
      es:"No quiero salir esta noche: estoy muy cansado.",
      opts:["I'm not wanting to go out tonight: I am very tired.","I'm not wanting to go out tonight: I'm very tired.","I don't want to go out tonight: I'm very tired.","I don't want to go out tonight: I'm being very tired."],
      ok:2,
      trap:"I'm not wanting to go out tonight: I'm very tired.",
      why:"<em>Want</em> es un verbo de estado y no admite continuo, por muy en el momento que sea el deseo. Y <em>be tired</em> tampoco: <code>I'm being tired</code> significaría que estás fingiendo cansancio a propósito." },

    { type:"order",
      es:"Estaba leyendo cuando se fue la luz.",
      words:["I","was","reading","when","the","power","went","off"],
      trap:"I read when the light was going.",
      why:"Fondo en continuo, interrupción en simple. Y guarda el bloque: <code>the power went off</code> es como se dice que se va la luz; <em>the light</em> sería la bombilla concreta de una habitación." },

    { type:"listening", mode:"dictation",
      audio:"She's living with her parents while she's looking for a flat.",
      why:"Los dos continuos son temporales, no permanentes: vive allí de momento y busca piso estos días. Si al escribirlo te ha salido <em>she lives</em>, has convertido una etapa pasajera en su vida de siempre." }

  ]}

  ]
});
