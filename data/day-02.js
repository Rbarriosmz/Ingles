REGISTER_DAY({
  n: 2,
  title: "El sujeto que en español no dices",
  minutes: 32,

  blocks: [

  /* ---------------------------------------------------------
     1. Toda frase lleva sujeto
     --------------------------------------------------------- */
  { title: "Toda frase lleva sujeto", items: [

    { type:"note", title:"El español puede callarse el sujeto. El inglés no puede nunca",
      html:"<p><em>Llueve</em>. <em>Es tarde</em>. <em>Hace frío</em>. Tres frases españolas perfectas y ninguna tiene sujeto, porque la terminación del verbo ya dice lo suficiente.</p>" +
           "<p>En inglés eso no se puede hacer. <b>Toda frase con verbo conjugado necesita un sujeto delante</b>, aunque no signifique nada. Cuando no hay nadie que haga la acción, el inglés se inventa uno:</p>" +
           "<table><tr><th>Español</th><th>Inglés</th><th>Sujeto de mentira</th></tr>" +
           "<tr><td>Llueve</td><td><code>It's raining</code></td><td>it</td></tr>" +
           "<tr><td>Son las nueve</td><td><code>It's nine o'clock</code></td><td>it</td></tr>" +
           "<tr><td>Hay dos sillas</td><td><code>There are two chairs</code></td><td>there</td></tr>" +
           "<tr><td>Es difícil decidir</td><td><code>It's difficult to decide</code></td><td>it</td></tr></table>" +
           "<p>Ese <em>it</em> no se traduce, no es «ello» ni «eso»: es un relleno obligatorio. Y el error de dejarlo fuera es de los que más marcan un texto como escrito por un hispanohablante, porque no se te va a ocurrir buscarlo al releer: tu oído en español no echa nada de menos.</p>" },

    { type:"mcq",
      es:"Llueve mucho en Galicia.",
      opts:["Rains a lot in Galicia.","It rains a lot in Galicia.","There rains a lot in Galicia.","Is raining a lot in Galicia."],
      ok:1,
      trap:"Rains a lot in Galicia.",
      why:"En español el verbo va solo porque no hay nadie que llueva. En inglés esa frase está incompleta: falta el sujeto. **Todo lo que tiene que ver con el tiempo, la hora, la fecha y la distancia lleva _it_**: <code>it's cold</code>, <code>it's Monday</code>, <code>it's ten kilometres</code>." },

    { type:"mcq",
      es:"Es difícil aparcar aquí.",
      opts:["Is difficult to park here.","There is difficult to park here.","It's difficult park here.","It's difficult to park here."],
      ok:3,
      trap:"Is difficult to park here.",
      why:"El mismo hueco de antes, y además el infinitivo con <em>to</em>. La estructura <code>it's + adjetivo + to + verbo</code> es una de las más rentables del examen: <code>it's important to arrive early</code>, <code>it's easy to forget</code>. Apréndela como un molde, no como una traducción." },

    { type:"gap",
      es:"Son las nueve y media.",
      text:"___ half past nine.",
      answer:["it's","it is"],
      why:"La hora siempre va con <em>it</em>. Traduciendo del español sale <span class='bad'>are the nine and half</span>, que además copia el plural: en inglés el sujeto es ese <em>it</em> singular, y el verbo va en singular aunque sean varias horas." }

  ]},

  /* ---------------------------------------------------------
     2. Tener no siempre es have
     --------------------------------------------------------- */
  { title: "Tener no siempre es have", items: [

    { type:"note", title:"Media docena de estados que el español tiene y el inglés es",
      html:"<p><em>Tengo 30 años</em>, <em>tengo hambre</em>, <em>tengo frío</em>, <em>tengo razón</em>. En español todo eso se posee. En inglés no se posee: <b>se es</b>.</p>" +
           "<table><tr><th>Español</th><th>Inglés</th></tr>" +
           "<tr><td>Tengo 30 años</td><td><code>I'm 30</code> · <code>I'm 30 years old</code></td></tr>" +
           "<tr><td>Tengo hambre / sed</td><td><code>I'm hungry</code> · <code>I'm thirsty</code></td></tr>" +
           "<tr><td>Tengo frío / calor</td><td><code>I'm cold</code> · <code>I'm hot</code></td></tr>" +
           "<tr><td>Tengo miedo</td><td><code>I'm scared</code> · <code>I'm afraid</code></td></tr>" +
           "<tr><td>Tienes razón</td><td><code>You're right</code></td></tr>" +
           "<tr><td>Tengo sueño</td><td><code>I'm sleepy</code> · <code>I'm tired</code></td></tr></table>" +
           "<p>La lista es corta y se aprende en una tarde, pero <span class='bad'>I have 30 years</span> sigue siendo el calco más famoso que existe, porque es de las primeras cosas que uno dice al presentarse. Si solo te llevas una cosa del día de hoy, que sea esta tabla.</p>" +
           "<p>Cuidado con una excepción que va al revés: <em>tener dolor de cabeza</em> sí es <code>I have a headache</code>, y <em>tener un resfriado</em> es <code>I have a cold</code>. Ahí el inglés sí posee.</p>" },

    { type:"mcq",
      es:"Tengo treinta años.",
      opts:["I'm thirty years old.","I have thirty years.","I have thirty years old.","I've got thirty years."],
      ok:0,
      trap:"I have thirty years.",
      why:"El calco de manual. En inglés la edad **se es, no se tiene**: <code>I'm thirty</code>. Y fíjate en que <em>years old</em> es opcional pero <em>old</em> no se puede quitar solo: <span class='bad'>I'm thirty years</span> tampoco vale. O dices <code>I'm thirty</code> o dices <code>I'm thirty years old</code>." },

    { type:"mcq",
      es:"Tengo mucha hambre, vamos a comer algo.",
      opts:["I have a lot of hunger, let's eat something.","I have much hunger, let's eat something.","I'm really hungry, let's get something to eat.","I have very hungry, let's eat something."],
      ok:2,
      trap:"I have a lot of hunger, let's eat something.",
      why:"<em>Hunger</em> existe, pero es un sustantivo formal que se usa para hablar del hambre en el mundo, no de la tuya a las dos de la tarde. Lo natural es el adjetivo: <code>I'm hungry</code>. Y para intensificar, **_really_ o _very_, no _a lot of_**, porque eso solo acompaña a sustantivos." },

    { type:"mcq",
      es:"Tienes razón, deberíamos haber salido antes.",
      opts:["You have reason, we should have left earlier.","You're right, we should have left earlier.","You have right, we should have left earlier.","You have the reason, we should have left earlier."],
      ok:1,
      trap:"You have reason, we should have left earlier.",
      why:"<em>Reason</em> en inglés es «motivo», no «razón» en el sentido de acertar: <code>the reason why he left</code>. Para darle la razón a alguien se usa el adjetivo <em>right</em>. Y al revés, <code>you're wrong</code> para lo contrario, nunca <span class='bad'>you have no reason</span>, que suena a que no tienes motivos." },

    { type:"gap",
      es:"Tengo frío. ¿Puedes cerrar la ventana?",
      text:"___ cold. Can you close the window?",
      answer:["i'm","i am"],
      why:"Ojo con este, porque <code>I have cold</code> no es solo raro: si dices <code>I have a cold</code> estás diciendo que estás resfriado, que es otra cosa. El estado va con <em>be</em>, la enfermedad con <em>have</em>." }

  ]},

  /* ---------------------------------------------------------
     3. There is / there are
     --------------------------------------------------------- */
  { title: "Hay: there is, there are", items: [

    { type:"note", title:"«Hay» no es have, y además concuerda",
      html:"<p><em>Hay</em> viene de <em>haber</em>, así que la mano se va sola a <em>have</em>. Pero en inglés la existencia se dice con <b>there + be</b>, y el verbo concuerda con lo que viene detrás:</p>" +
           "<ul>" +
           "<li>Singular: <code>there is a problem</code> · <code>there's a problem</code></li>" +
           "<li>Plural: <code>there are three problems</code></li>" +
           "<li>Pasado: <code>there was</code> · <code>there were</code></li>" +
           "<li>Futuro: <code>there will be</code></li>" +
           "<li>Con modal: <code>there might be</code> · <code>there should be</code></li>" +
           "</ul>" +
           "<p>La diferencia con <em>have</em> es de significado, no de estilo: <code>the flat has two bedrooms</code> habla de lo que el piso posee; <code>there are two bedrooms in the flat</code> habla de lo que existe dentro. Las dos son correctas, pero <span class='bad'>the flat there are two bedrooms</span> no lo es.</p>" +
           "<p>Y una trampa de concordancia: <em>people</em> es plural. Se dice <code>there are a lot of people</code>, nunca <span class='bad'>there is a lot of people</span>, aunque en español digas «hay mucha gente» en singular.</p>" },

    { type:"mcq",
      es:"Hay mucha gente esperando fuera.",
      opts:["Have a lot of people waiting outside.","It has a lot of people waiting outside.","There is a lot of people waiting outside.","There are a lot of people waiting outside."],
      ok:3,
      trap:"There is a lot of people waiting outside.",
      why:"La trampa fina no es <em>have</em>, que se detecta rápido: es el singular. En español <em>gente</em> es singular y arrastra el verbo con ella. En inglés **_people_ es plural** y pide <em>are</em>. Lo mismo con <em>police</em>: <code>the police are investigating</code>." },

    { type:"mcq",
      es:"Había tres personas esperando cuando llegué.",
      opts:["There were three people waiting when I arrived.","There was three people waiting when I arrived.","It had three people waiting when I arrived.","Had three people waiting when I arrived."],
      ok:0,
      trap:"It had three people waiting when I arrived.",
      why:"<em>Había</em> es el pasado de <em>hay</em>, así que sigue siendo <em>there</em>: <code>there was</code> en singular, <code>there were</code> en plural. Como detrás van <em>three people</em>, toca el plural. Fíjate también en <em>arrived</em>: en inglés, <em>arrive</em> no lleva preposición delante del momento." },

    { type:"gap",
      es:"No hay leche en la nevera.",
      text:"There ___ any milk in the fridge.",
      answer:["isn't","is not","isn't any"],
      why:"En negativa el inglés prefiere <code>there isn't any</code> a <code>there is no</code>, aunque las dos existen. Y <em>milk</em> es incontable, así que va en singular: la lógica del español, que diría «no hay leches», aquí no aplica." }

  ]},

  /* ---------------------------------------------------------
     4. Escuchar
     --------------------------------------------------------- */
  { title: "Escuchar", items: [

    { type:"listening", mode:"mcq",
      audio:"I'd love to come to the meeting, but there's a chance I'll still be stuck in traffic, so don't wait for me.",
      question:"What is the speaker actually saying?",
      opts:["He has decided not to go to the meeting.","He might get there late, and the others should start without him.","He wants everyone to wait until he arrives.","He is already on his way and will be early."],
      ok:1,
      why:"La clave está en <em>there's a chance</em>, que es un <em>there is</em> con sustantivo abstracto: no anuncia un hecho, anuncia una posibilidad. Si has entendido que no va, has traducido <em>don't wait for me</em> como una renuncia, cuando en inglés es simplemente «empezad sin mí»." },

    { type:"listening", mode:"dictation",
      audio:"There isn't much time left, so it's better to start now.",
      why:"Dos sujetos de mentira en una sola frase: el <em>there</em> de la existencia y el <em>it</em> de <code>it's better to</code>. Si al escribirlo te has comido alguno de los dos, ya sabes cuál es tu punto ciego." }

  ]},

  /* ---------------------------------------------------------
     5. Cierre
     --------------------------------------------------------- */
  { title: "Cierre: todo mezclado", items: [

    { type:"mcq",
      es:"Hace mucho calor y hay demasiada gente en la playa.",
      opts:["It does a lot of heat and there is too much people on the beach.","There is very hot and it has too many people on the beach.","It's very hot and there are too many people on the beach.","It's doing a lot of hot and there are too many people on the beach."],
      ok:2,
      trap:"It does a lot of heat and there is too much people on the beach.",
      why:"Tres calcos en una frase corta. Uno: <em>hacer</em> calor no es <em>do</em>, es <code>it's hot</code>. Dos: <em>hay</em> es <em>there are</em> con <em>people</em> en plural. Tres: **_too much_ va con incontables y _too many_ con contables**, y <em>people</em> se cuenta." },

    { type:"gap",
      es:"Hay un problema con el vuelo: es demasiado tarde para cambiarlo.",
      text:"There's a problem with the flight: ___ too late to change it.",
      answer:["it's","it is"],
      why:"La misma frase te obliga a usar los dos sujetos de relleno seguidos, y cada uno con su función: <em>there</em> para decir que el problema existe, <em>it</em> para valorar la situación. Cambiarlos de sitio no es un matiz, es un error: <span class='bad'>there's too late</span> no significa nada." },

    { type:"speaking", seconds:60,
      prompt:"Describe el sitio donde vives: qué hay, qué no hay y qué tiempo suele hacer. Un minuto sin parar.",
      useful:["There's a lot of…","There aren't many…","It's usually…","There are quite a few…","It can get…"],
      model:"I live in a fairly small town about forty minutes from the coast. There's a decent market on Saturdays and there are two or three good places to eat, but there isn't much to do in the evening, so most people drive somewhere else at the weekend. The weather is the best part, honestly. It's warm from May until October and it hardly ever rains in the summer, although it can get uncomfortably hot in August. In winter it's mild compared to the north, but there's a lot of wind, which people always forget to mention." }

  ]}

  ]
});
