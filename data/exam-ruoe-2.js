/* =========================================================
   Simulacro · Reading & Use of English · Prueba 2

   Formato del Cambridge B2 First: las siete partes, 52
   preguntas, mismo reparto y mismo tipo de distractor que el
   examen real. Textos y preguntas originales.
   ========================================================= */

REGISTER_EXAM({
  id: "ruoe-2",
  paper: "Reading & Use of English",
  title: "Prueba 2",
  minutes: 75,

  parts: [

  /* ---------------------------------------------------------
     Part 1 · Multiple-choice cloze · 8 huecos
     --------------------------------------------------------- */
  { n:1, type:"cloze", count:8, tags:["collocation"],
    title:"Multiple-choice cloze",
    instructions:"Lee el texto y elige la palabra que mejor encaja en cada hueco. Se mide vocabulario: colocaciones, phrasal verbs y expresiones hechas.",
    heading:"The lost art of getting lost",
    example:"(0) making — «unfolding a paper map and making sense of it»",
    text:"Until about fifteen years ago, arriving in an unfamiliar city meant unfolding a paper map and making sense of it as best you could. Today almost nobody does that, and researchers who study navigation have begun to {1} whether something has been lost along the way.\n\n" +
         "Several studies have {2} out that people who follow turn-by-turn directions remember far less about a route than those who work it out for themselves. In one experiment, participants who had used an app could not {3} a single landmark from a street they had walked down twenty minutes earlier.\n\n" +
         "The explanation seems to be attention. Following instructions {4} very little effort, so the brain never bothers to build a map of its own. Getting lost, on the other {5}, forces you to look around, notice buildings and keep track of where you are.\n\n" +
         "None of this means we should {6} up our phones for good. But some researchers now {7} that you switch the app off for the last few streets, on the {8} that a small amount of confusion is what makes a place stay in your memory.",
    gaps:[
      { opts:["suppose","imagine","wonder","doubt"], ok:2,
        why:"<code>wonder whether</code> es preguntarse algo a uno mismo, que es justo lo que hacen los investigadores. <em>Doubt whether</em> existe pero significa dudar de que sea así, y aquí no hay escepticismo: hay una pregunta abierta. Los otros dos no admiten <em>whether</em> con este sentido." },

      { opts:["pointed","put","set","taken"], ok:0,
        why:"<code>point out</code> es señalar o hacer notar. Los otros tres forman phrasal verbs muy comunes con <em>out</em> (<em>put out</em> apagar, <em>set out</em> partir, <em>take out</em> sacar) y ninguno sirve aquí: la partícula sola no decide, hay que saberse el bloque entero." },

      { opts:["say","tell","name","call"], ok:2,
        why:"<code>name something</code> es mencionarlo, decir cuál es. El español «no supieron decir ni un edificio» empuja hacia <em>say</em> o <em>tell</em>, y ninguno funciona con un objeto así: <em>tell</em> necesita persona y <em>say</em> necesita las palabras dichas." },

      { opts:["makes","takes","does","gives"], ok:1,
        why:"<code>take effort</code>: el esfuerzo se toma, no se hace. Es la misma familia de bloques cerrados de la primera semana, y el <em>hacer</em> español apunta a <em>make</em> o <em>do</em>, que son las dos trampas puestas ahí a propósito." },

      { opts:["hand","side","way","part"], ok:0,
        why:"<code>on the other hand</code> es la expresión hecha para contraponer dos ideas. Cambiar una sola palabra la rompe: <em>on the other side</em> es físico, al otro lado, y <em>in another way</em> significa de otra manera." },

      { opts:["throw","take","give","put"], ok:2,
        why:"<code>give up</code> es abandonar algo para siempre, que es lo que pide <em>for good</em> al final de la frase. <em>Throw up</em> es vomitar, <em>take up</em> es empezar una afición y <em>put up</em> es alojar o levantar." },

      { opts:["speak","say","tell","recommend"], ok:3,
        why:"Solo <em>recommend</em> puede llevar detrás una oración con <em>that</em> y un consejo. <em>Say</em> pediría las palabras exactas, <em>tell</em> pediría a quién se lo dices, y <em>speak</em> no lleva objeto directo. Es el paquete de verbos de comunicación que más se confunde." },

      { opts:["causes","grounds","reasons","bases"], ok:1,
        why:"<code>on the grounds that</code> es la fórmula para dar el motivo de una decisión. Es una de esas expresiones que hay que guardar enteras: ni <em>on the reasons that</em> ni <em>on the bases that</em> existen, aunque el español «con el argumento de que» los sugiera." }
    ]
  },

  /* ---------------------------------------------------------
     Part 2 · Open cloze · 8 huecos
     --------------------------------------------------------- */
  { n:2, type:"opencloze", count:8, tags:["function-word"],
    title:"Open cloze",
    instructions:"Escribe UNA sola palabra en cada hueco. Casi siempre es una palabra gramatical: preposición, relativo, auxiliar, conjunción o comparativo.",
    heading:"Why we still write things by hand",
    example:"(0) been — «everything that has been said about the death of handwriting»",
    text:"Despite everything that has been said about the death of handwriting, most people still reach for a pen several times a day.\n\n" +
         "Part of the reason is practical: a notebook never runs {1} of battery and works perfectly well in the rain. But there may be more to it {2} simple convenience.\n\n" +
         "Several studies have found that students who take notes by hand understand a lecture better {3} those who type. The explanation is not that handwriting is somehow special. It is that it is slow. Because you cannot possibly write down every word, you {4} forced to decide what matters, and that decision is where the learning happens.\n\n" +
         "Typing removes that limit, {5} means you can transcribe a whole lecture without ever really processing it.\n\n" +
         "None of this is an argument {6} laptops. It is an argument for knowing {7} each tool is good at. If you need a record of what was said, type it. If you need {8} understand it, reach for the pen.",
    gaps:[
      { answer:["out"],
        why:"<code>run out of</code> es quedarse sin algo. El phrasal necesita las dos partículas: <em>run out</em> y luego <em>of</em>. Sin <em>out</em> la frase diría que el cuaderno «corre de batería», que no significa nada." },
      { answer:["than"],
        why:"<code>more … than</code>. La comparación ya está abierta con <em>more</em>, así que el hueco solo puede cerrarla. El español «más de lo que parece» empuja hacia <em>that</em>, y ese es el fallo típico: la comparación va con <em>than</em>, siempre." },
      { answer:["than"],
        why:"Otra vez el comparativo, ahora con <em>better</em>. Fíjate en que <em>better</em> ya lleva dentro el <em>more</em>: es un comparativo irregular, y por eso <span class='bad'>more better</span> es imposible." },
      { answer:["are"],
        why:"Pasiva: <code>you are forced to decide</code>. El sujeto es <em>you</em> y hace falta el verbo <em>be</em> delante del participio. Es un hueco de los que se dejan en blanco sin darse cuenta, porque en español el «se ve obligado» ya lleva el reflexivo incorporado." },
      { answer:["which"],
        why:"Relativo que se refiere a toda la oración anterior, no a un sustantivo suelto: quitar el límite <em>significa que</em>… Para eso solo vale <b>which</b>, nunca <em>that</em>, y siempre con coma delante." },
      { answer:["against"],
        why:"<code>an argument against something</code>: un argumento en contra. La preposición la manda el sustantivo, y la frase siguiente la confirma por oposición: <em>an argument <b>for</b> knowing…</em>" },
      { answer:["what"],
        why:"<code>know what each tool is good at</code>. Pregunta indirecta incrustada: el orden vuelve a ser normal, sujeto delante del verbo, como viste el día 6. Y fíjate en que la preposición <em>at</em> se queda colgando al final." },
      { answer:["to"],
        why:"<code>need to + infinitivo</code>. El <em>to</em> no es una preposición aquí: es la marca del infinitivo que <em>need</em> exige cuando va seguido de otro verbo." }
    ]
  },

  /* ---------------------------------------------------------
     Part 3 · Word formation · 8 huecos
     --------------------------------------------------------- */
  { n:3, type:"wordform", count:8, tags:["word-formation"],
    title:"Word formation",
    instructions:"Transforma la palabra base para que encaje en el hueco. Decide primero qué categoría hace falta: sustantivo, adjetivo, adverbio o verbo. Y mira si el sentido pide un negativo.",
    heading:"The night shift",
    example:"(0) SHIFT → shift work",
    text:"Working nights has always been treated as a minor {1}, something you simply get used to. A growing body of research suggests that this view is {2}.\n\n" +
         "The human body runs on an internal clock that turns out to be remarkably {3} to change. Ask it to be wide awake at three in the morning and it will obey, but {4}, and at a price.\n\n" +
         "Long-term studies of nurses, pilots and lorry drivers have found a clear {5} between years of night work and several serious conditions. The {6} have been consistent enough that night shift work is now formally classified as a probable cause of cancer.\n\n" +
         "None of this is an argument for {7} the night shift. Hospitals and power stations cannot close at six in the evening. But it does suggest that the comfortable {8} that people simply adapt is wrong.",
    gaps:[
      { root:"INCONVENIENT", answer:["inconvenience"],
        why:"Detrás de <em>a minor</em> hace falta un sustantivo contable: <b>inconvenience</b>. El adjetivo pierde la <em>-ent</em> y coge <em>-ence</em>. Es el mismo patrón de <em>different → difference</em> y <em>patient → patience</em>." },
      { root:"DANGER", answer:["dangerous"],
        why:"Detrás de <em>is</em> va un adjetivo: <b>dangerous</b>, con el sufijo <em>-ous</em>. Aquí el español ayuda, porque «peligroso» también deriva de «peligro», pero cuidado con la ortografía: se pierde la <em>-e</em> final de <em>danger</em>… en realidad no, se mantiene." },
      { root:"RESIST", answer:["resistant"],
        why:"Detrás de <em>remarkably</em> y delante de <em>to</em> va un adjetivo: <b>resistant to</b>. El sustantivo sería <em>resistance</em>, que también lleva <em>to</em>, y por eso conviene mirar qué categoría pide la posición antes de elegir." },
      { root:"WILLING", answer:["unwillingly"],
        why:"Doble transformación: adverbio <b>y</b> negativo. El cuerpo obedece, pero de mala gana: <b>unwillingly</b>. Perder el <em>un-</em> deja la frase diciendo lo contrario, y este tipo de hueco cae en casi todos los exámenes." },
      { root:"RELATE", answer:["relationship","relation"],
        why:"Detrás de <em>a clear</em> va un sustantivo: <b>relationship</b>. Vale también <em>relation</em>, algo más formal. Lo que no vale es <em>relative</em>, que es un pariente." },
      { root:"FIND", answer:["findings"],
        why:"Sujeto de <em>have been</em>, así que sustantivo <b>en plural</b>: <b>findings</b>, los hallazgos de un estudio. El verbo en plural es la pista, y confundirlo con <em>finding</em> en singular rompe la concordancia." },
      { root:"ABOLISH", answer:["abolishing"],
        why:"Detrás de la preposición <em>for</em>, el verbo va en <b>-ing</b>. Es la regla del día 12 adelantada: cualquier verbo detrás de preposición se convierte en gerundio, sin excepciones." },
      { root:"ASSUME", answer:["assumption"],
        why:"Detrás de <em>the comfortable</em> va un sustantivo: <b>assumption</b>. Fíjate en que el verbo cambia la raíz, no solo el final: <em>assume → assumption</em>, como <em>consume → consumption</em>." }
    ]
  },

  /* ---------------------------------------------------------
     Part 4 · Key word transformations · 6 frases
     --------------------------------------------------------- */
  { n:4, type:"transform", count:6, tags:["transform"],
    title:"Key word transformations",
    instructions:"Reescribe la segunda frase para que signifique lo mismo que la primera. Usa la palabra clave sin cambiarla y escribe entre DOS y CINCO palabras. Recuerda que una contracción cuenta como dos.",
    items:[
      { from:"I last saw Tom three months ago.",
        key:"SINCE", max:5,
        before:"It's been three months ", after:" Tom.",
        answer:["since i saw","since i last saw"],
        why:"<code>It's been + periodo + since + past simple</code>. El error habitual es dejar el verbo en presente perfecto detrás de <em>since</em>: ahí va pasado simple, porque marca el momento exacto en que ocurrió." },

      { from:"Someone is repairing my car at the moment.",
        key:"BEING", max:5,
        before:"My car ", after:" at the moment.",
        answer:["is being repaired"],
        why:"Pasiva en presente continuo: <code>is being + participio</code>. La palabra clave <em>BEING</em> te confirma que hace falta el continuo; sin él sería <em>is repaired</em>, que describiría una costumbre y no algo que pasa ahora." },

      { from:"'Don't touch the wire,' the engineer told us.",
        key:"NOT", max:4,
        before:"The engineer told us ", after:" the wire.",
        answer:["not to touch"],
        why:"Estilo indirecto de una orden negativa: <code>tell somebody not to do something</code>. El <em>not</em> va delante del <em>to</em>, nunca detrás. Y <em>tell</em> ya lleva la persona pegada, sin preposición." },

      { from:"It isn't necessary to book a table.",
        key:"NEED", max:5,
        before:"You ", after:" a table.",
        answer:["don't need to book","do not need to book","needn't book"],
        why:"Ausencia de obligación. Valen las dos formas: <code>don't need to book</code> y <code>needn't book</code>. Cuidado con <em>mustn't book</em>, que sería una prohibición y cambiaría el sentido por completo." },

      { from:"I regret not studying harder at school.",
        key:"WISH", max:5,
        before:"I ", after:" harder at school.",
        answer:["wish i had studied","wish i'd studied"],
        why:"Lamentar el pasado: <code>wish + past perfect</code>. Con <em>wish I studied</em> estarías lamentando el presente, y con <em>wish I would study</em> estarías pidiéndote a ti mismo que cambies, que ni siquiera es posible." },

      { from:"They are unlikely to arrive before nine.",
        key:"PROBABLY", max:5,
        before:"They ", after:" before nine.",
        answer:["probably won't arrive","will probably not arrive"],
        why:"<em>Unlikely</em> se convierte en <em>probably not</em>. Y ojo a la colocación del adverbio: en inglés va <b>antes</b> del auxiliar negativo (<em>probably won't</em>), justo al revés de lo que haría el español con «probablemente no llegarán»." }
    ]
  },

  /* ---------------------------------------------------------
     Part 5 · Multiple choice reading · 6 preguntas
     --------------------------------------------------------- */
  { n:5, type:"reading", count:6, tags:["reading-infer"],
    title:"Multiple choice",
    heading:"Reading Part 5",
    instructions:"Lee el texto y elige la mejor respuesta. Los distractores repiten palabras del texto: fíjate en lo que dice, no en lo que reconoces.",
    text:[
      "For most of the twentieth century, the sound of a car was a by-product. Engineers spent enormous effort trying to reduce it, and nobody except a few manufacturers of sports cars thought of it as something to be composed. Then the electric car arrived, and the problem inverted itself.",
      "Ines Bauer trained as a cellist and spent nine years writing music for advertisements before a recruiter contacted her about a job she assumed was a mistake. A German manufacturer wanted somebody to design the sound its electric cars would make at low speed. Since 2019, European law has required electric vehicles to emit a noise below about twenty kilometres an hour, because a silent car is dangerous to anyone who is not looking at it.",
      "The brief was narrower than she expected. The sound has to be audible over traffic without being unpleasant, it has to tell a pedestrian whether the car is speeding up or slowing down, and it cannot resemble a siren, an alarm or an animal. It also has to work at four in the morning in a residential street, which rules out almost everything with a strong low end. 'You start with a hundred ideas,' she says, 'and the regulations take away ninety of them before you have played anything to anybody.'",
      "What surprised her was how much the remaining ten mattered to the company. She had assumed the sound would be treated as a legal box to tick. Instead she found herself in meetings with people who talked about it the way a car company has always talked about the shape of a headlight. A brand, it turns out, can be heard as well as seen, and nobody had a sound yet.",
      "Bauer is careful not to overstate what she does. She points out that the pedestrians the law is meant to protect have no opinion about brand identity, and that the only measure that really counts is whether somebody steps back off the road in time. When she tests a sound, she does it in a car park with volunteers who are asked to face away and raise a hand when they hear a vehicle. Nothing about that test is glamorous, and she says it has killed more of her ideas than any committee.",
      "She does admit to one private ambition. Her sounds are currently designed to be noticed and then forgotten, which is what safety requires. But she would like, one day, to make something a person might catch themselves humming, without ever working out where they heard it."
    ],
    glossary:[
      {w:"by-product", d:"efecto secundario, subproducto"},
      {w:"brief", d:"encargo, instrucciones del trabajo"},
      {w:"rule out", d:"descartar"},
      {w:"low end", d:"graves (en sonido)"},
      {w:"box to tick", d:"trámite que cumplir"},
      {w:"overstate", d:"exagerar"},
      {w:"step back", d:"apartarse"},
      {w:"hum", d:"tararear"}
    ],
    questions:[
      { q:"What does the writer say has changed about the sound of cars?",
        opts:[
          "Sports car manufacturers now influence the whole industry.",
          "It has gone from being something to reduce to something to create.",
          "Engineers have finally succeeded in making cars almost silent.",
          "Drivers have begun to complain that modern cars are too quiet."
        ],
        ok:1,
        why:"Primer párrafo: antes era un residuo que había que reducir, ahora hay que componerlo. <em>The problem inverted itself</em> es la clave. La A recoge un dato real del texto, los coches deportivos, pero le inventa una influencia que no se menciona." },

      { q:"Why is there a law requiring electric cars to make a noise?",
        opts:[
          "Because pedestrians who are not looking cannot detect a silent car.",
          "Because manufacturers asked for a way to distinguish their vehicles.",
          "Because electric cars travel faster than expected in city streets.",
          "Because drivers of electric cars cannot judge their own speed."
        ],
        ok:0,
        why:"<em>A silent car is dangerous to anyone who is not looking at it</em>. La B es tentadora porque el texto sí habla de marca y de distinguirse, pero eso aparece dos párrafos más abajo y no es el motivo de la ley: es un descubrimiento posterior." },

      { q:"What does Bauer say about the restrictions on the sound?",
        opts:[
          "They are easier to satisfy than she had been warned.",
          "They mainly concern how loud the sound is allowed to be.",
          "They eliminate the great majority of possible ideas immediately.",
          "They change depending on the country where the car is sold."
        ],
        ok:2,
        why:"Su cita lo dice con números: empiezas con cien ideas y las normas te quitan noventa antes de tocar nada. La B se queda corta: el volumen es solo una de las condiciones, y el texto enumera varias más." },

      { q:"What surprised Bauer about the company she worked for?",
        opts:[
          "It expected her to work much faster than she was used to.",
          "It treated the sound as a serious part of the brand, not a formality.",
          "It had already chosen a sound before she was hired.",
          "It refused to let her attend meetings about design."
        ],
        ok:1,
        why:"Ella daba por hecho que sería un trámite legal y se encontró reuniones al nivel de la forma de un faro. La C dice justo lo contrario de <em>nobody had a sound yet</em>, que es la última frase del párrafo." },

      { q:"What point does Bauer make about her testing method?",
        opts:[
          "It is unglamorous but it rejects more ideas than the company does.",
          "It shows that pedestrians prefer sounds with a strong brand identity.",
          "It is the part of the job she finds least useful.",
          "It has convinced her that the law should be stricter."
        ],
        ok:0,
        why:"<em>Nothing about that test is glamorous, and she says it has killed more of her ideas than any committee</em>. La B invierte lo que dice: los peatones <b>no</b> tienen opinión sobre la identidad de marca, y ese es precisamente su argumento." },

      { q:"What does the final paragraph tell us about Bauer?",
        opts:[
          "She intends to return to writing music for advertisements.",
          "She believes safety and memorability cannot ever be combined.",
          "She would like to create something memorable, even though safety requires the opposite.",
          "She thinks her current sounds are already being remembered by drivers."
        ],
        ok:2,
        why:"Sus sonidos están hechos para notarse y olvidarse, que es lo que exige la seguridad, pero le gustaría hacer algo que alguien tarareara. La B convierte una tensión en una imposibilidad: ella dice <em>one day</em>, no que sea imposible." }
    ]
  },

  /* ---------------------------------------------------------
     Part 6 · Gapped text · 6 huecos, 7 frases
     --------------------------------------------------------- */
  { n:6, type:"gappedtext", count:6, tags:["reading-cohesion"],
    title:"Gapped text",
    instructions:"Coloca la frase que encaja en cada hueco. Hay siete frases y seis huecos: una sobra. Las pistas son los pronombres, los conectores y las referencias que unen una frase con la anterior y con la siguiente.",
    heading:"The street that got its river back",
    text:"For eighty years, the Skerne ran under the centre of Darlington in a concrete pipe. It had been buried in the 1930s, when a river running through a town was understood mainly as a smell, a flood risk and a place where children drowned. {1}\n\n" +
         "The idea of digging it up again came from a flood engineer rather than from anybody interested in nature. Concrete channels move water quickly, which is precisely the problem: everything arrives downstream at once. {2} A river allowed to bend, spread and slow down holds the water back for free.\n\n" +
         "The council was not immediately convinced. Reopening the channel meant closing a car park, moving a section of road and accepting that part of the town centre would flood on purpose two or three times a year. {3}\n\n" +
         "Work began in 2015 and took two summers. The engineers deliberately made the new channel untidy, adding bends, gravel banks and fallen trees, because a straight clean river is a fast one. {4} Within eighteen months, otters had been recorded half a mile from the town hall.\n\n" +
         "What nobody had planned for was the effect on the streets themselves. {5} Two cafés opened on the side facing the water, and the estate agents began describing properties as riverside, which had never been a selling point in Darlington before.\n\n" +
         "The scheme is now visited by councils from all over the country. {6} What they are usually told is that the hardest part was not the engineering but persuading twenty-eight separate landowners that a river in their back garden was an asset rather than a liability.",
    options:[
      { id:"A", t:"They arrive expecting to be shown drainage calculations and photographs of wildlife." },
      { id:"B", t:"The pipe did what it was designed to do, and for three generations almost nobody in the town could have told you where the water went." },
      { id:"C", t:"What changed their minds was the price of the alternative: a flood defence scheme downstream would have cost roughly four times as much." },
      { id:"D", t:"Rivers of this size were once common across the north of England, and most of them have disappeared entirely." },
      { id:"E", t:"Building a bigger pipe simply moves the flood somewhere else, usually onto somebody poorer." },
      { id:"F", t:"People began to walk that way on purpose, taking a route that was three minutes longer." },
      { id:"G", t:"That decision paid off faster than anyone had predicted." }
    ],
    gaps:[
      { ok:"B",
        why:"La frase siguiente cambia de tema, así que este hueco cierra el párrafo. <em>The pipe did what it was designed to do</em> recoge el tubo de hormigón recién mencionado, y <em>three generations</em> encaja con los ochenta años de la primera línea." },
      { ok:"E",
        why:"El párrafo explica por qué el hormigón es el problema, y la frase siguiente empieza con <em>A river allowed to bend…</em>, que es la solución opuesta. En medio hace falta la consecuencia de seguir con tubos: mover la inundación a otro sitio." },
      { ok:"C",
        why:"<em>What changed their minds</em> se refiere directamente al ayuntamiento que <em>was not immediately convinced</em>. Es la costura hacia atrás más clara del texto, y además cierra el párrafo respondiendo a la objeción que se acaba de plantear." },
      { ok:"G",
        why:"<em>That decision</em> apunta a lo de hacer el cauce desordenado a propósito, y <em>paid off faster than anyone had predicted</em> prepara la frase siguiente, que da la prueba: nutrias a media milla del ayuntamiento en año y medio." },
      { ok:"F",
        why:"El párrafo anuncia un efecto sobre las calles y la frase siguiente habla de cafeterías e inmobiliarias. En medio falta el cambio de comportamiento que lo explica: la gente empezó a pasar por ahí a propósito, alargando el camino." },
      { ok:"A",
        why:"<em>They arrive</em> necesita un plural mencionado antes, y son los ayuntamientos que visitan la obra. Además contrasta con <em>what they are usually told</em> de la frase siguiente: esperan una cosa y les cuentan otra." }
    ],
    extraWhy:"Es verosímil y va del tema, pero **no cose nada**: ninguna frase posterior recoge lo de que estos ríos fueran comunes en el norte de Inglaterra. Aplica siempre esa prueba a la que sobra: mira si algo de lo que viene después la necesita." },

  /* ---------------------------------------------------------
     Part 7 · Multiple matching · 10 preguntas, 4 secciones
     --------------------------------------------------------- */
  { n:7, type:"matching", count:10, tags:["reading-detail"],
    title:"Multiple matching",
    instructions:"Cuatro personas que se mudaron de una ciudad grande a un pueblo. Decide en qué sección se dice cada cosa. Busca la idea reformulada, no la palabra repetida.",
    heading:"Leaving the city",
    sections:[
      { id:"A", title:"Nuria, de Madrid a un pueblo de Soria",
        text:[
          "The maths was what convinced me, and the maths turned out to be the least interesting part. I sold a flat and bought a house with a garden and had money left over, which sounds like a fairy tale until you discover what a roof costs. The first winter I spent more on heating than I had spent in five years in Madrid. What I had not calculated at all was the driving. Everything here is twenty minutes away by car, and I had not owned one since I was twenty-six. I am now the sort of person who checks the weather before deciding whether to buy bread. My work is entirely online and my colleagues have never asked where I am, which I find slightly insulting and completely convenient."
        ] },
      { id:"B", title:"Daniel, de Barcelona a la costa de Girona",
        text:[
          "I moved for my daughter, which is the reason everybody gives and in my case it was even true. She is eleven and she can now go out of the front door without either of us thinking about it. That freedom is real and I do not regret it for a second. What nobody warns you about is the silence between six in the evening and the following morning. In Barcelona I never chose to go out much, but I could hear that other people were. Here, when I close the shutters, that is the end of the day for everyone, and it took me about a year to stop finding that oppressive rather than peaceful."
        ] },
      { id:"C", title:"Kirsten, de Hamburgo a un pueblo de Extremadura",
        text:[
          "I arrived speaking almost no Spanish and I made every mistake a foreigner can make, starting with assuming that friendliness meant friendship. People here were extremely kind to me for two years before anybody invited me into their house, and I spent most of that time convinced I had done something wrong. I hadn't. It simply takes that long. The turning point was joining the choir, which I did out of desperation and not because I can sing. If I were advising somebody, I would say: find the thing that meets every week, whatever it is, and go to it even when you would rather not."
        ] },
      { id:"D", title:"Tomás, de Valencia a un pueblo del interior",
        text:[
          "I lasted four years and then I went back, and I want to say clearly that going back is not a failure. The village was exactly as advertised: cheap, beautiful, quiet. The problem was entirely mine. I had imagined a version of myself who reads in the evening and grows vegetables, and that person did not turn up. I missed being anonymous. In a village of four hundred people, everybody knew I had been to the doctor before I got home, and they meant well by it. I now live in Valencia again and drive out to the village most weekends, which I realise is the arrangement I should have chosen in the first place."
        ] }
    ],
    glossary:[
      {w:"fairy tale", d:"cuento de hadas"},
      {w:"left over", d:"sobrante"},
      {w:"shutters", d:"persianas"},
      {w:"oppressive", d:"agobiante"},
      {w:"turning point", d:"punto de inflexión"},
      {w:"out of desperation", d:"por desesperación"},
      {w:"as advertised", d:"tal y como prometían"},
      {w:"turn up", d:"aparecer, presentarse"},
      {w:"mean well", d:"tener buena intención"}
    ],
    questions:[
      { q:"Which person mentions an expense they had completely failed to anticipate?",
        ok:"A", quote:"I spent more on heating than I had spent in five years in Madrid",
        why:"Nuria. Aunque hizo las cuentas de la vivienda, la calefacción la pilló por sorpresa. La pregunta dice <em>failed to anticipate</em> donde el texto dice <em>I had not calculated</em>: la misma idea con otras palabras, que es lo que mide esta parte." },

      { q:"Which person needed a long time to accept something they had found unpleasant at first?",
        ok:"B", quote:"it took me about a year to stop finding that oppressive",
        why:"Daniel, con el silencio nocturno. Ojo con Kirsten, que también habla de dos años: pero lo suyo no es acostumbrarse a algo desagradable, es esperar a que llegue la amistad. La pregunta pide aceptar algo que molestaba." },

      { q:"Which person misunderstood how local people were behaving towards them?",
        ok:"C", quote:"assuming that friendliness meant friendship",
        why:"Kirsten confundió amabilidad con amistad y pasó dos años creyendo que había hecho algo mal. Es la única de las cuatro que interpreta mal a la gente del sitio." },

      { q:"Which person says that their disappointment was their own fault rather than the place's?",
        ok:"D", quote:"The village was exactly as advertised… The problem was entirely mine",
        why:"Tomás. El texto lo dice casi con esas palabras. La trampa está en que también habla de cosas negativas del pueblo, como que todos supieran de su visita al médico, pero él insiste en que el pueblo cumplió lo prometido." },

      { q:"Which person values a change that affected somebody else more than themselves?",
        ok:"B", quote:"She is eleven and she can now go out of the front door",
        why:"Daniel se mudó por su hija, y lo que no lamenta ni un segundo es la libertad de ella. La pregunta no nombra a ninguna hija: hay que ver que <em>somebody else</em> es la niña." },

      { q:"Which person recommends a specific strategy to anyone thinking of doing the same?",
        ok:"C", quote:"find the thing that meets every week, whatever it is",
        why:"Kirsten es la única que da un consejo explícito, y lo marca con <em>if I were advising somebody</em>. Tomás dice qué habría hecho él, pero habla de sí mismo, no aconseja a nadie." },

      { q:"Which person had to take up a habit they had abandoned years earlier?",
        ok:"A", quote:"I had not owned one since I was twenty-six",
        why:"Nuria y el coche. La reformulación es doble: <em>take up a habit</em> por volver a conducir, y <em>years earlier</em> por <em>since I was twenty-six</em>. No aparece la palabra <em>habit</em> en ningún sitio." },

      { q:"Which person mentions a loss of privacy?",
        ok:"D", quote:"everybody knew I had been to the doctor before I got home",
        why:"Tomás echaba de menos ser anónimo. Fíjate en que el texto no usa la palabra <em>privacy</em>: dice <em>I missed being anonymous</em> y luego lo ilustra, y hay que unir las dos cosas." },

      { q:"Which person is indifferent to where their employer thinks they are?",
        ok:"A", quote:"my colleagues have never asked where I am",
        why:"Nuria, con ese remate de que le parece medio insultante y del todo cómodo. Es la única de las cuatro que menciona su trabajo." },

      { q:"Which person has found a compromise between the two ways of living?",
        ok:"D", quote:"drive out to the village most weekends",
        why:"Tomás vive en Valencia y va al pueblo los fines de semana, y admite que debió elegir eso desde el principio. La pregunta usa <em>compromise</em>, palabra que no aparece: está descrita, no nombrada." }
    ]
  }

  ]
});
