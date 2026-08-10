REGISTER_DAY({
  n: 1,
  title: "El orden de las palabras",
  minutes: 30,

  blocks: [

  /* ---------------------------------------------------------
     1. El adjetivo delante
     --------------------------------------------------------- */
  { title: "El adjetivo va delante", items: [

    { type:"note", title:"En inglés el adjetivo se pone antes, sin excepciones",
      html:"<p>En español el adjetivo va detrás: <em>un coche rojo</em>, <em>una idea interesante</em>. En inglés va delante y no se mueve: <code>a red car</code>, <code>an interesting idea</code>.</p>" +
           "<p>Es la inversión más simple del programa y también la que más se te va a escapar, porque aparece en casi todas las frases que digas.</p>" +
           "<p>Dos cosas más que el español te empuja a hacer y aquí no existen:</p>" +
           "<ul>" +
           "<li><b>El adjetivo no tiene plural.</b> <span class='bad'>two reds cars</span> → <code>two red cars</code>. Nunca lleva <em>-s</em>.</li>" +
           "<li><b>No se une con <em>and</em> delante del sustantivo.</b> <span class='bad'>a small and white house</span> → <code>a small white house</code>. El <em>and</em> solo aparece si van después del verbo: <code>the house is small and white</code>.</li>" +
           "</ul>" +
           "<p>Cuando hay varios adjetivos hay un orden, y el que más te va a hacer falta es este: <b>opinión → tamaño → edad → color → origen</b>. <code>a lovely little old blue Italian car</code>. No hace falta memorizar la lista entera: con saber que el tamaño va antes que el color ya aciertas la mayoría de las veces.</p>" },

    { type:"mcq",
      es:"Tengo un coche rojo.",
      opts:["I have a car red.","I have a red car.","I have red a car.","I have a car of red."],
      ok:1,
      trap:"I have a car red.",
      why:"Palabra por palabra, el español sale así: coche primero, rojo después. En inglés el adjetivo se coloca **antes del sustantivo** y no hay caso en que suene bien al revés. Es el primer reflejo que hay que invertir, y vas a tener que invertirlo en cada frase que digas hoy." },

    { type:"mcq",
      es:"Es una idea muy interesante.",
      opts:["It's an idea very interesting.","It's very interesting idea.","It's a very interesting idea.","It's an idea really interested."],
      ok:2,
      trap:"It's an idea very interesting.",
      why:"Aquí el bloque entero se mueve: no solo el adjetivo, también el <em>very</em> que lo acompaña. Todo lo que describe al sustantivo va delante de él, en el mismo orden en que lo dirías: **very interesting idea**. Y ojo con el artículo: delante de sonido consonántico es _a_, no _an_." },

    { type:"mcq",
      es:"Vive en una casa blanca pequeña.",
      opts:["She lives in a small white house.","She lives in a white small house.","She lives in a house small and white.","She lives in a small and white house."],
      ok:0,
      trap:"She lives in a house small and white.",
      why:"Dos trampas a la vez. La primera es la de siempre: los adjetivos van delante. La segunda es el orden entre ellos: en inglés el **tamaño va antes que el color**, aunque en español los hayas dicho al revés. Y no se enlazan con _and_ cuando están delante del sustantivo." },

    { type:"gap",
      es:"Son problemas difíciles.",
      text:"They're ___ problems.",
      answer:["difficult","hard","tough","complicated"],
      why:"En español el adjetivo copia el plural del sustantivo: problema<b>s</b> difícil<b>es</b>. En inglés el adjetivo **no cambia nunca**: ni plural, ni femenino. <em>difficults</em> no existe. Este error se oye muchísimo y salta a la vista en un texto escrito." }

  ]},

  /* ---------------------------------------------------------
     2. Adverbios
     --------------------------------------------------------- */
  { title: "Dónde cae el adverbio", items: [

    { type:"note", title:"Los adverbios tienen sitio fijo, y el español los deja sueltos",
      html:"<p>En español un adverbio de frecuencia puede ir casi donde quieras: <em>siempre llego tarde</em>, <em>llego siempre tarde</em>, <em>llego tarde siempre</em>. Las tres suenan bien. En inglés hay un solo sitio natural y los demás suenan raros o directamente mal.</p>" +
           "<table><tr><th>Situación</th><th>Dónde va</th><th>Ejemplo</th></tr>" +
           "<tr><td>Verbo normal</td><td>Antes del verbo</td><td><code>I always arrive late</code></td></tr>" +
           "<tr><td>Verbo <em>to be</em></td><td>Después del verbo</td><td><code>I am always late</code></td></tr>" +
           "<tr><td>Con auxiliar</td><td>Entre auxiliar y verbo</td><td><code>I have always worked here</code></td></tr></table>" +
           "<p>Los de frecuencia son <code>always</code>, <code>usually</code>, <code>often</code>, <code>sometimes</code>, <code>rarely</code>, <code>never</code>.</p>" +
           "<p>Y una regla que vale para todo el idioma, no solo para adverbios: <b>no se mete nada entre el verbo y su objeto directo</b>. <span class='bad'>I speak well English</span> → <code>I speak English well</code>. El objeto va pegado al verbo y el adverbio espera su turno al final.</p>" },

    { type:"mcq",
      es:"Siempre llego tarde a las reuniones.",
      opts:["Always I arrive late to the meetings.","I arrive always late to meetings.","I arrive late always to the meetings.","I always arrive late to meetings."],
      ok:3,
      trap:"Always I arrive late to the meetings.",
      why:"Empezar la frase con el adverbio es lo que hace el español, y por eso es lo primero que te sale. En inglés <em>always</em> se mete **entre el sujeto y el verbo**, sin excepción. Fíjate también en que <em>meetings</em> va sin artículo: hablando en general, el inglés no lo pone." },

    { type:"mcq",
      es:"Hablo inglés bien, pero lo escribo fatal.",
      opts:["I speak well English, but I write it terribly.","I speak English well, but I write it terribly.","I well speak English, but I write it terribly.","I speak English good, but I write it terrible."],
      ok:1,
      trap:"I speak well English, but I write it terribly.",
      why:"En español puedes decir <em>hablo bien inglés</em> sin que chirríe. En inglés, meter cualquier cosa entre el verbo y su objeto rompe la frase: primero <b>speak English</b>, y el adverbio después. Es la misma regla que hace que <em>I like very much this film</em> esté mal." },

    { type:"gap",
      es:"Normalmente estoy en la oficina a las nueve.",
      text:"I'm ___ in the office at nine.",
      answer:["usually","normally","generally","often"],
      why:"Aquí el verbo es <em>to be</em>, y con <em>to be</em> el adverbio de frecuencia va **detrás**, no delante: <code>I am usually</code>, nunca <span class='bad'>I usually am</span>. Es la única excepción a la regla del bloque anterior, y conviene fijarla ahora porque <em>to be</em> aparece en una de cada tres frases." }

  ]},

  /* ---------------------------------------------------------
     3. Sujeto, verbo, objeto
     --------------------------------------------------------- */
  { title: "Sujeto, verbo, objeto: el orden que no se toca", items: [

    { type:"note", title:"El español mueve las palabras porque el verbo dice quién habla. El inglés no puede",
      html:"<p><em>Comió Juan la tarta</em>, <em>la tarta la comió Juan</em>, <em>Juan comió la tarta</em>. En español las tres se entienden, porque la terminación del verbo y los pronombres te dicen quién hace qué.</p>" +
           "<p>En inglés el verbo casi no cambia, así que <b>la única pista de quién hace la acción es la posición</b>. Si mueves las palabras, cambias el significado: <code>the dog bit the man</code> y <code>the man bit the dog</code> son dos noticias muy distintas.</p>" +
           "<p>De ahí salen tres consecuencias prácticas:</p>" +
           "<ul>" +
           "<li>Sujeto, verbo y objeto van siempre en ese orden, también en frases largas.</li>" +
           "<li>Con dos objetos, el de persona va primero y sin preposición: <code>I gave my mother the present</code>. La alternativa es <code>I gave the present to my mother</code>, pero no puedes mezclar las dos.</li>" +
           "<li>Al final de la frase, <b>lugar antes que tiempo</b>: <code>I went to London last week</code>, no <span class='bad'>I went last week to London</span>.</li>" +
           "</ul>" },

    { type:"mcq",
      es:"A mi hermana le encanta el cine.",
      opts:["To my sister loves the cinema.","It loves to my sister the cinema.","My sister likes a lot the cinema.","My sister loves the cinema."],
      ok:3,
      trap:"To my sister loves the cinema.",
      why:"Este es de los calcos más difíciles de ver, porque el problema no está en las palabras sino en quién es el sujeto. En español el sujeto de <em>encantar</em> es <em>el cine</em>, y la persona va con <em>a</em>. En inglés se invierte: **la persona es el sujeto** y el verbo es <em>love</em>. Lo mismo pasa con <em>gustar</em>, <em>doler</em>, <em>interesar</em> y <em>faltar</em>." },

    { type:"mcq",
      es:"Ayer vi a Marta en el supermercado.",
      opts:["Yesterday saw I Marta at the supermarket.","I saw yesterday Marta at the supermarket.","I saw Marta at the supermarket yesterday.","Yesterday I saw to Marta in the supermarket."],
      ok:2,
      trap:"I saw yesterday Marta at the supermarket.",
      why:"Dos calcos de golpe. Uno: no se mete el tiempo entre el verbo y el objeto; <em>Marta</em> va pegada a <em>saw</em>. Dos: al final va **lugar y luego tiempo**. Y la <em>a</em> personal del español no se traduce: <span class='bad'>I saw to Marta</span> no existe." },

    { type:"gap",
      es:"Le di el regalo a mi madre.",
      text:"I gave ___ the present.",
      answer:["my mother","my mum","my mom","her"],
      why:"Con dos objetos, el inglés pone primero la persona y **sin preposición**: <code>gave my mother the present</code>. Si prefieres decirlo con <em>to</em>, la persona se va al final: <code>gave the present to my mother</code>. Lo que no puede aparecer es la mezcla: <span class='bad'>gave to my mother the present</span>." }

  ]},

  /* ---------------------------------------------------------
     4. Lectura
     --------------------------------------------------------- */
  { title: "Leer sin traducir", items: [

    { type:"reading",
      title:"The four-day week, tested for real",
      text:[
        "In 2022, sixty-one British companies did something most managers had always dismissed as impossible: they cut the working week to four days without cutting anyone's pay. The trial ran for six months and involved almost 3,000 employees, from small marketing agencies to a fish-and-chip shop in Norfolk.",
        "The rule was simple. Staff kept 100% of their salary and were expected to deliver 100% of their usual output, but they worked only 80% of the hours. Nobody told them how to make up the difference. That was the point: each company had to work out for itself which parts of its week were genuinely productive and which were just habit.",
        "Most of them reached the same conclusion fairly quickly. Meetings were the first thing to go. Some firms banned them on certain days, others capped them at fifteen minutes, and a few replaced them with a written update that took two minutes to read. Email came next, and then the long afternoons that everybody had privately known were dead time.",
        "The numbers at the end of the trial surprised even the people running it. Revenue stayed roughly flat. The number of employees leaving their jobs fell by 57%, and sick days dropped by around two thirds. When the six months were up, fifty-six of the sixty-one companies decided to carry on, and eighteen made the change permanent straight away.",
        "It would be easy to read too much into this. The companies that took part had volunteered, which means they were already open to the idea. It also worked best where output is easy to measure. Hospitals, schools and shops found it far harder, for the obvious reason that you cannot serve a customer who is standing in front of you on a day when nobody is there.",
        "So the trial did not prove that everyone can work four days. It proved something narrower and rather more uncomfortable: that in a lot of offices, the fifth day was never doing much work in the first place."
      ],
      glossary:[
        {w:"dismiss", d:"descartar, no tomarse en serio"},
        {w:"trial", d:"prueba, ensayo"},
        {w:"staff", d:"plantilla, personal"},
        {w:"output", d:"producción, resultados"},
        {w:"work out", d:"averiguar, deducir"},
        {w:"cap", d:"limitar, poner un tope"},
        {w:"sick day", d:"día de baja"},
        {w:"carry on", d:"seguir, continuar"},
        {w:"straight away", d:"inmediatamente"}
      ],
      questions:[
        { q:"What made the 2022 trial unusual?",
          opts:[
            "Employees accepted a small reduction in their salary.",
            "Employees kept their full pay while working fewer hours.",
            "Only large companies were allowed to take part.",
            "The companies were told exactly how to reorganise their week."
          ],
          ok:1,
          why:"El texto lo dice en la primera frase: <em>without cutting anyone's pay</em>. La opción A suena razonable y el texto habla de sueldos, pero dice justo lo contrario. La C falla porque entre los participantes había una freiduría de Norfolk, y la D porque el texto insiste en que <em>nobody told them how</em>." },

        { q:"How did most of the companies find the extra time?",
          opts:[
            "They hired additional staff to cover the fifth day.",
            "They asked employees to work longer hours on the other four days.",
            "They cut back on meetings and email.",
            "They introduced software to automate routine tasks."
          ],
          ok:2,
          why:"Tercer párrafo: las reuniones fueron lo primero en caer, y después el correo. La B es el distractor fuerte, porque es lo que cualquiera supondría, pero el texto no lo dice en ningún momento: solo dice que trabajaban el 80% de las horas." },

        { q:"What happened to the number of people leaving their jobs?",
          opts:[
            "It fell sharply.",
            "It stayed about the same.",
            "It rose slightly in the smaller companies.",
            "The text does not give a figure."
          ],
          ok:0,
          why:"<em>Fell by 57%</em>. La D es la trampa típica de quien lee por encima: el párrafo está lleno de cifras y es fácil asociar el porcentaje al de los ingresos o al de las bajas en lugar de al de las dimisiones." },

        { q:"What point is the writer making in the final paragraph?",
          opts:[
            "Every company should move to a four-day week as soon as possible.",
            "The results of the trial cannot really be trusted.",
            "Hospitals and schools should be the next sector to try it.",
            "In many offices, one day of the week was already unproductive."
          ],
          ok:3,
          why:"La última frase dice que la conclusión es <em>narrower and rather more uncomfortable</em>: no que todo el mundo pueda trabajar cuatro días, sino que el quinto ya no servía de mucho. La A exagera y la B se pasa de escéptica; el texto matiza los resultados, pero no los desmiente." }
      ]
    }

  ]},

  /* ---------------------------------------------------------
     5. Cierre
     --------------------------------------------------------- */
  { title: "Cierre: todo mezclado", items: [

    { type:"mcq",
      es:"Mi jefe habla siempre muy rápido en las reuniones.",
      opts:["My boss always speaks very quickly in meetings.","My boss speaks always very fast in the meetings.","Always my boss speaks very quickly in meetings.","My boss always speaks in meetings very quickly."],
      ok:0,
      trap:"My boss speaks always very fast in the meetings.",
      why:"Tres cosas del día en una sola frase: el adverbio de frecuencia **antes del verbo**, el modo (<em>quickly</em>) después del verbo, y <em>meetings</em> sin artículo porque hablamos de reuniones en general. La D no es agramatical, pero deja el adverbio colgando al final y suena a traducción." },

    { type:"gap",
      es:"Ayer nos dieron una buena noticia.",
      text:"They gave ___ good news yesterday.",
      answer:["us","us some"],
      why:"La persona va primero y sin <em>to</em>. Y guarda esto para toda la semana: <b>news es incontable</b>, así que no lleva <em>a</em> ni plural. <span class='bad'>a good news</span> es de los calcos que más rápido delatan a un hispanohablante, junto con <span class='bad'>an advice</span> y <span class='bad'>informations</span>." },

    { type:"listening", mode:"dictation",
      audio:"She always arrives late, but she never says sorry.",
      why:"Escríbelo y mira dónde has puesto <em>always</em> y <em>never</em>: los dos van **entre el sujeto y el verbo**, que es exactamente donde el español no los pondría. Si has escrito <em>arrives always</em>, ya sabes qué repasar mañana." }

  ]}

  ]
});
