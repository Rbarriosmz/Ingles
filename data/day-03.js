REGISTER_DAY({
  n: 3,
  title: "a, an, the y el artículo cero",
  minutes: 32,

  blocks: [

  /* ---------------------------------------------------------
     1. El artículo que sobra
     --------------------------------------------------------- */
  { title: "El artículo que el español pone y el inglés no", items: [

    { type:"note", title:"Hablando en general, el inglés quita el artículo",
      html:"<p>El español pone <em>el</em> y <em>la</em> por defecto: <em>los perros</em>, <em>la vida</em>, <em>el inglés</em>, <em>el desayuno</em>. El inglés, cuando habla de algo <b>en general</b>, no pone nada. A eso se le llama artículo cero, y es la mitad de los errores de artículo que comete un hispanohablante.</p>" +
           "<table><tr><th>Categoría</th><th>Español</th><th>Inglés</th></tr>" +
           "<tr><td>Generalizaciones</td><td>Los perros son leales</td><td><code>Dogs are loyal</code></td></tr>" +
           "<tr><td>Ideas abstractas</td><td>La vida es dura</td><td><code>Life is hard</code></td></tr>" +
           "<tr><td>Idiomas</td><td>Hablo inglés</td><td><code>I speak English</code></td></tr>" +
           "<tr><td>Comidas</td><td>El desayuno es a las ocho</td><td><code>Breakfast is at eight</code></td></tr>" +
           "<tr><td>Días y meses</td><td>El lunes tengo clase</td><td><code>On Monday I have class</code></td></tr>" +
           "<tr><td>Próximo y pasado</td><td>La semana que viene</td><td><code>Next week</code></td></tr></table>" +
           "<p>La regla práctica: si podrías poner <em>en general</em> o <em>todos los</em> delante de la frase española, en inglés quita el artículo. <em>Los perros son leales</em> significa «todos los perros», así que va sin nada. Pero <em>los perros de mi vecina ladran</em> son unos perros concretos, y entonces sí: <code>the dogs</code>.</p>" },

    { type:"mcq",
      es:"Los perros son más leales que los gatos.",
      opts:["The dogs are more loyal than the cats.","Dogs are more loyal than cats.","The dogs are more loyal than cats.","Dogs are more loyal than the cats."],
      ok:1,
      trap:"The dogs are more loyal than the cats.",
      why:"No hablamos de unos perros concretos: hablamos de los perros como especie. En inglés eso va **sin artículo y en plural**. Si pusieras <em>the</em>, un nativo entendería que te refieres a unos perros de los que ya habíais hablado, y se quedaría esperando saber cuáles." },

    { type:"mcq",
      es:"Hablo inglés y un poco de alemán.",
      opts:["I speak the English and a bit of German.","I speak English and a little of German.","I speak English and a bit of German.","I speak the English and a little the German."],
      ok:2,
      trap:"I speak the English and a bit of German.",
      why:"Los idiomas no llevan artículo: <code>I speak English</code>. La segunda trampa es más silenciosa: <em>a little</em> ya significa «un poco de», así que **no lleva _of_ detrás**. <span class='bad'>a little of German</span> duplica la preposición. Con <em>a bit</em> sí: <code>a bit of German</code>." },

    { type:"mcq",
      es:"El desayuno es a las ocho y la cena a las nueve.",
      opts:["Breakfast is at eight and dinner is at nine.","The breakfast is at the eight and the dinner at the nine.","The breakfast is at eight and the dinner at nine.","Breakfast is at the eight and dinner at the nine."],
      ok:0,
      trap:"The breakfast is at eight and the dinner at nine.",
      why:"Las comidas van sin artículo cuando hablas de la comida en sí: <code>breakfast</code>, <code>lunch</code>, <code>dinner</code>. Y las horas tampoco lo llevan: <code>at eight</code>, no <span class='bad'>at the eight</span>. Solo aparece el artículo si la comida es un evento concreto: <code>the dinner we had last night was awful</code>." },

    { type:"gap",
      es:"La vida es cara en esta ciudad.",
      text:"___ is expensive in this city.",
      answer:["life","living"],
      why:"Los sustantivos abstractos, cuando hablan del concepto entero, van desnudos: <code>life</code>, <code>time</code>, <code>money</code>, <code>happiness</code>. El artículo vuelve en cuanto los concretas: <code>the life of a freelancer is hard</code>, porque ahí ya no es la vida en general." }

  ]},

  /* ---------------------------------------------------------
     2. a / an
     --------------------------------------------------------- */
  { title: "a o an: manda el sonido, no la letra", items: [

    { type:"note", title:"No mires la vocal escrita, escucha la primera letra",
      html:"<p>La regla que te enseñaron es «<em>an</em> delante de vocal». La regla de verdad es: <b><em>an</em> delante de sonido vocálico</b>. No siempre coinciden.</p>" +
           "<ul>" +
           "<li><code>a university</code>, <code>a European country</code>, <code>a uniform</code> — empiezan por <em>u</em> pero suenan «yu», que es consonante.</li>" +
           "<li><code>an hour</code>, <code>an honest answer</code>, <code>an heir</code> — la <em>h</em> no se pronuncia, así que el sonido es vocálico.</li>" +
           "<li><code>an MBA</code>, <code>an FBI agent</code>, <code>an X-ray</code> — las siglas se leen letra a letra: «em», «ef», «ex».</li>" +
           "<li><code>a one-way street</code> — se lee «wan».</li>" +
           "</ul>" +
           "<p>Y una diferencia que el español no marca: <b>los sustantivos contables en singular no pueden ir solos</b>. En español dices <em>soy profesor</em>; en inglés hace falta el artículo: <code>I'm a teacher</code>. Lo mismo con <code>she's an engineer</code>, <code>he's a friend of mine</code>. Dejarlo sin artículo es de los errores que más se repiten al presentarse.</p>" },

    { type:"mcq",
      es:"Estudió en una universidad americana durante un año.",
      opts:["She studied at a American university for a year.","She studied at an American university for a year.","She studied in an American university during a year.","She studied at an American university during one year."],
      ok:1,
      trap:"She studied in an American university during a year.",
      why:"Tres decisiones. <em>An</em> porque <em>American</em> empieza por sonido vocálico, aunque <em>university</em> sola llevaría <em>a</em>: el artículo mira a la palabra que va justo detrás. <em>At</em> para instituciones de estudio. Y sobre todo **_for_ y no _during_**: <em>during</em> dice cuándo pasó algo, <em>for</em> dice cuánto duró." },

    { type:"mcq",
      es:"Tardo una hora en llegar al trabajo.",
      opts:["It takes me a hour to get to work.","I take an hour to arrive to work.","It takes me an hour to get to work.","It costs me an hour to get to work."],
      ok:2,
      trap:"I take an hour to arrive to work.",
      why:"<em>An hour</em> porque la <em>h</em> es muda. Pero el calco gordo es el sujeto: en español <em>tardo</em> lleva a la persona delante, y en inglés la estructura es **_it takes me_**, con el <em>it</em> de relleno que viste ayer. Y <em>arrive</em> no lleva <em>to</em>: se llega <code>at work</code>." },

    { type:"gap",
      es:"Necesito un consejo antes de decidir.",
      text:"I need ___ advice before I decide.",
      answer:["some","a piece of","a bit of"],
      why:"<em>Advice</em> es incontable en inglés, así que no puede llevar <em>an</em> ni plural: <span class='bad'>an advice</span> y <span class='bad'>advices</span> son de los errores que más rápido se detectan. Para contarlo hace falta un envase: <code>a piece of advice</code>. Pasa lo mismo con <em>information</em>, <em>furniture</em>, <em>luggage</em> y <em>news</em>." }

  ]},

  /* ---------------------------------------------------------
     3. the
     --------------------------------------------------------- */
  { title: "the: cuando los dos sabemos cuál", items: [

    { type:"note", title:"The es una señal de que ya sabes de qué hablo",
      html:"<p><em>The</em> no significa «el». Significa: <b>tú y yo sabemos exactamente cuál</b>. De ahí salen sus usos:</p>" +
           "<ul>" +
           "<li><b>Segunda mención.</b> <code>I bought a book. The book was terrible.</code> Primera vez <em>a</em>, a partir de ahí <em>the</em>.</li>" +
           "<li><b>Solo hay uno.</b> <code>the sun</code>, <code>the government</code>, <code>the kitchen</code> (la de esta casa).</li>" +
           "<li><b>Superlativos y ordinales.</b> <code>the best</code>, <code>the first time</code>, <code>the only one</code>, <code>the same</code>.</li>" +
           "</ul>" +
           "<p>Y el caso que más cuesta: con <b>instituciones</b>, el inglés quita el artículo cuando hablas de la función y lo pone cuando hablas del edificio.</p>" +
           "<table><tr><th>Sin artículo (la función)</th><th>Con artículo (el sitio)</th></tr>" +
           "<tr><td><code>go to school</code> (a estudiar)</td><td><code>go to the school</code> (al edificio)</td></tr>" +
           "<tr><td><code>go to work</code></td><td><code>go to the office</code></td></tr>" +
           "<tr><td><code>in hospital</code> (ingresado)</td><td><code>at the hospital</code> (de visita)</td></tr>" +
           "<tr><td><code>go to bed</code></td><td><code>sit on the bed</code></td></tr></table>" +
           "<p><code>at home</code> es un caso aparte: nunca lleva artículo ni preposición de movimiento. <code>I'm going home</code>, sin <em>to</em>.</p>" },

    { type:"mcq",
      es:"Voy al trabajo en tren todos los días.",
      opts:["I go to the work in train every day.","I go to work by train every day.","I go to the work by train every day.","I go to work in the train every day."],
      ok:1,
      trap:"I go to the work in train every day.",
      why:"<em>Work</em> como actividad va sin artículo, igual que <em>school</em> o <em>bed</em>. Y el medio de transporte se dice con **_by_ y sin artículo**: <code>by train</code>, <code>by car</code>, <code>on foot</code>. Si dices <em>in the train</em> estás hablando de estar dentro de ese tren concreto, que es otra cosa." },

    { type:"mcq",
      es:"Es el mejor restaurante del barrio.",
      opts:["It's the best restaurant of the neighbourhood.","It's best restaurant in the neighbourhood.","It's the best restaurant in the neighbourhood.","It's the better restaurant of the neighbourhood."],
      ok:2,
      trap:"It's the best restaurant of the neighbourhood.",
      why:"El superlativo siempre lleva <em>the</em>, en eso el español coincide. Lo que no coincide es la preposición: **el superlativo va con _in_, no con _of_**, cuando detrás hay un lugar o un grupo. <code>the tallest building in Europe</code>, <code>the best player in the team</code>." },

    { type:"gap",
      es:"Mi hija está en el colegio hasta las cinco.",
      text:"My daughter is at ___ until five.",
      answer:["school"],
      why:"Está estudiando, no visitando el edificio, así que va sin artículo. La prueba es que si dijeras <code>at the school</code> se entendería que ha ido a recoger algo o a una reunión. Es la misma lógica de <code>in hospital</code> para el paciente y <code>at the hospital</code> para quien va a verlo." }

  ]},

  /* ---------------------------------------------------------
     4. Lectura
     --------------------------------------------------------- */
  { title: "Leer sin traducir", items: [

    { type:"reading",
      title:"The city that took its cars away",
      text:[
        "Pontevedra is a city of about 83,000 people in the north-west of Spain. In 1999 its new mayor, a doctor by training, did something that sounded at the time like political suicide: he closed the historic centre to private traffic, and then kept going, year after year, until cars had been pushed out of most of the city.",
        "There was no grand plan at the start. The council simply removed on-street parking, widened the pavements and cut the speed limit to 30 km/h, and later to 20 in the centre. Traffic lights were taken out rather than added, on the theory that drivers pay more attention when nothing is telling them what to do. Deliveries were given a window in the early morning. Anyone who still needed to park was offered free spaces on the edge of the centre, a few minutes' walk from almost anywhere.",
        "The results are the kind that planners quote at conferences. Traffic in the centre fell by roughly 90%. Emissions dropped by about two thirds. Between 2011 and 2018 nobody at all was killed in a road accident inside the city, in a country where around a thousand people a year still die on the roads. Children walk to school on their own, which is now unusual enough in Europe to be reported as news.",
        "Not everyone was pleased. Shopkeepers protested loudly at the beginning, convinced that customers who could not park outside the door would simply drive to the shopping centres on the ring road instead. Some of them were right, and closed. Others discovered that a street full of people walking slowly past the window is worth rather more than a street full of cars driving past it.",
        "What Pontevedra proves is limited but real. A medium-sized city, flat and compact, can take its cars away if the council is prepared to lose a few elections over it. The mayor, as it turns out, has won every election since."
      ],
      glossary:[
        {w:"mayor", d:"alcalde"},
        {w:"council", d:"ayuntamiento"},
        {w:"pavement", d:"acera"},
        {w:"delivery", d:"reparto, entrega"},
        {w:"ring road", d:"circunvalación"},
        {w:"shopkeeper", d:"comerciante"},
        {w:"pleased", d:"contento, satisfecho"},
        {w:"be worth", d:"valer, merecer la pena"},
        {w:"as it turns out", d:"resulta que"}
      ],
      questions:[
        { q:"How did the council actually reduce traffic in the centre?",
          opts:[
            "By installing more traffic lights and increasing fines.",
            "By charging drivers to enter the historic centre.",
            "By taking away parking spaces and lowering speed limits.",
            "By building a large underground car park in the main square."
          ],
          ok:2,
          why:"Segundo párrafo. La opción A es el distractor más fuerte porque el texto sí habla de semáforos, pero dice justo lo contrario: se quitaron, no se pusieron. Y la B describe el modelo de Londres o Estocolmo, que suena verosímil pero no aparece en ningún sitio." },

        { q:"What does the text say about deaths in road accidents?",
          opts:[
            "There were none inside the city for a period of several years.",
            "They fell by about 90%.",
            "They stayed close to the Spanish average.",
            "The text gives no comparison with the rest of Spain."
          ],
          ok:0,
          why:"<em>Nobody at all was killed</em> entre 2011 y 2018. La opción B es la trampa clásica de leer deprisa: el 90% del párrafo es real, pero es la caída del tráfico, no la de los muertos. En el examen, casi siempre hay una cifra correcta asignada al dato equivocado." },

        { q:"How did local shopkeepers react to the changes?",
          opts:[
            "They supported the plan from the very beginning.",
            "They complained at first, and some of them did lose business.",
            "They asked the council to close the ring road as well.",
            "They were compensated by the council for the loss of customers."
          ],
          ok:1,
          why:"El cuarto párrafo dice que protestaron, que algunos tenían razón y cerraron, y que a otros les fue mejor. La B es la única que recoge las dos mitades. La D suena razonable y el texto habla de plazas gratuitas, pero eso era para los conductores, no una indemnización a los comercios." },

        { q:"What is the writer's conclusion?",
          opts:[
            "Any European city could copy the model exactly as it is.",
            "The changes worked only because the city is unusually wealthy.",
            "Voters always reward politicians who make bold decisions.",
            "The example is genuinely useful, but it depends on the size of the city and on political nerve."
          ],
          ok:3,
          why:"<em>Limited but real</em> es la clave, y luego pone las dos condiciones: una ciudad mediana, llana y compacta, y un ayuntamiento dispuesto a perder elecciones. La C se apoya en la última frase, pero convertir «este alcalde ganó» en «los votantes siempre premian» es exactamente el salto que el examen te tiende." }
      ]
    }

  ]},

  /* ---------------------------------------------------------
     5. Cierre
     --------------------------------------------------------- */
  { title: "Cierre: todo mezclado", items: [

    { type:"mcq",
      es:"La gente que va en bici al trabajo suele llegar de mejor humor.",
      opts:["The people that go in bike to the work usually arrive in a better mood.","People who cycle to work usually arrive in a better mood.","The people who cycle to work usually arrive in better mood.","People that goes by bike to work usually arrives in a better mood."],
      ok:1,
      trap:"The people that go in bike to the work usually arrive in a better mood.",
      why:"Cuatro cosas de esta semana juntas: <em>people</em> en general sin <em>the</em>, <em>work</em> sin artículo, el adverbio de frecuencia antes del verbo, y <em>people</em> como plural que pide <em>arrive</em> y no <em>arrives</em>. Y en bici es <code>by bike</code>." },

    { type:"gap",
      es:"El español es más fácil que el chino para un italiano.",
      text:"___ is easier than Chinese for an Italian.",
      answer:["spanish"],
      why:"Los idiomas van sin artículo, siempre. El único caso en que aparece es cuando el idioma va acompañado de la palabra <em>language</em>: <code>the Spanish language</code>. Fíjate también en <em>an Italian</em>: sonido vocálico y sustantivo contable en singular, que en inglés no puede ir desnudo." },

    { type:"listening", mode:"dictation",
      audio:"Life is short, so I try not to spend it sitting in traffic.",
      why:"Comprueba dos cosas al escribirlo: que <em>life</em> ha salido sin <em>the</em>, porque es la vida en general, y que has puesto <em>traffic</em> sin artículo, porque es incontable. Si te ha salido <span class='bad'>the life</span>, tienes localizado el reflejo que hay que apagar." }

  ]}

  ]
});
