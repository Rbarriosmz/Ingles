/* =========================================================
   Simulacro · Reading & Use of English · Prueba 1

   Formato del Cambridge B2 First: mismo número de preguntas,
   mismo tipo de distractor y mismo reparto de dificultad que
   el examen real. Los textos y las preguntas son originales.
   ========================================================= */

REGISTER_EXAM({
  id: "ruoe-1",
  paper: "Reading & Use of English",
  title: "Prueba 1",
  minutes: 75,

  parts: [

  /* ---------------------------------------------------------
     Part 1 · Multiple-choice cloze · 8 huecos
     Mide vocabulario: colocaciones, phrasal verbs y matices.
     --------------------------------------------------------- */
  { n:1, type:"cloze", count:8,
    title:"Multiple-choice cloze",
    instructions:"Lee el texto y elige la palabra que mejor encaja en cada hueco. Se mide vocabulario: colocaciones y matices entre palabras parecidas.",
    heading:"The return of the night train",
    example:"(0) closed — «one by one the sleeper services were closed down»",
    text:"For years the night train looked like something from the past. Airlines were cheaper and quicker, and one by one the sleeper services across Europe were closed down. Then, quite suddenly, they started coming back.\n\n" +
         "The change was {1} by a mixture of climate and comfort. A night train from Vienna to Brussels {2} roughly a tenth of the carbon of the equivalent flight, and passengers began to {3} notice. At the same time, travellers had grown tired of reaching an airport two hours early only to lose an evening at the other end.\n\n" +
         "Night trains solve both problems at {4}. You get on at ten in the evening, have a drink in the bar, go to sleep and {5} up in the centre of another city, with the cost of a hotel already inside the ticket.\n\n" +
         "The comeback has not been {6} sailing. Carriages are expensive and most of the old ones were scrapped years ago. Booking a ticket across three borders is still far harder than it should be. But demand is {7} strong that operators have ordered new rolling stock for the first time in three decades, and routes that were unthinkable ten years ago now sell out months {8} advance.",
    gaps:[
      { opts:["driven","pushed","carried","taken"], ok:0,
        why:"<code>driven by</code> es la colocación normal para lo que impulsa un cambio. <em>Pushed by</em> existe pero es físico, empujar algo; es justo el calco de «impulsado por» que suena razonable y no se dice." },
      { opts:["makes","produces","does","gives"], ok:1,
        why:"Las emisiones **se producen**: <code>produce carbon</code>, <code>produce emissions</code>. <em>Make</em> serviría para fabricar un objeto, y aquí el español <em>producir</em> coincide, así que esta es de las fáciles si no te fías del <em>hacer</em> por defecto." },
      { opts:["take","make","do","give"], ok:0,
        why:"<code>take notice</code> es bloque cerrado: fijarse, darse cuenta. Es la familia del día 4: el sustantivo manda y hay que aprenderse el verbo que lo acompaña, porque no hay lógica que lo prediga." },
      { opts:["once","the same","one time","a time"], ok:0,
        why:"<code>at once</code> significa a la vez, y también inmediatamente. El español «a la vez» empuja hacia <em>at the same time</em>, que es correcto en general pero necesitaría el artículo y aquí no encaja con la preposición que ya está puesta." },
      { opts:["get","wake","stand","turn"], ok:1,
        why:"<code>wake up</code> es despertarse; <code>get up</code> es levantarse de la cama, que es lo siguiente. En un tren cama despiertas antes de levantarte, y el texto habla de abrir los ojos ya en otra ciudad." },
      { opts:["plain","clear","smooth","simple"], ok:0,
        why:"<code>plain sailing</code> es la expresión hecha para «coser y cantar». Las otras tres describen bien la idea por separado, pero la expresión solo funciona con <em>plain</em>: cambiar una palabra de un modismo lo rompe entero." },
      { opts:["such","so","too","very"], ok:1,
        why:"La estructura es <code>so + adjetivo + that</code>. Con <em>such</em> haría falta un sustantivo: <code>such strong demand that…</code>. Es de las preguntas que caen en todos los exámenes, y el error de mezclarlas es constante." },
      { opts:["in","on","at","by"], ok:0,
        why:"<code>in advance</code> es fijo: por adelantado. No hay razón que lo explique, y por eso conviene guardarlo como bloque entero junto con <code>in time</code>, <code>in person</code> y <code>in cash</code>." }
    ]
  },

  /* ---------------------------------------------------------
     Part 2 · Open cloze · 8 huecos
     Mide gramática: una sola palabra, casi siempre funcional.
     --------------------------------------------------------- */
  { n:2, type:"opencloze", count:8,
    title:"Open cloze",
    instructions:"Escribe UNA sola palabra en cada hueco. Casi siempre es una palabra gramatical: preposición, artículo, auxiliar, relativo o conjunción.",
    heading:"Why adults learn to cook",
    example:"(0) so — «people who learn to cook properly do so in their twenties»",
    text:"Cooking is one of the few skills that people are happy to admit they are bad {1}. Nobody announces that they cannot read, but plenty of adults will cheerfully explain that they live {2} takeaways and toast.\n\n" +
         "What changes their minds is rarely a cookery course. {3} is usually something far more ordinary: a flatmate who cooks, a bad result at the doctor's, or the discovery that a decent meal costs about {4} same as a poor one delivered to the door.\n\n" +
         "The first weeks are the hardest. Recipes assume knowledge {5} nobody ever taught you, and the results swing between burnt and raw. But {6} you have made the same dish four or five times, something shifts. You stop reading the recipe line by line and start tasting as you go.\n\n" +
         "That is the point {7} which cooking becomes cheaper, quicker and better than the alternative. It usually takes about three months, which is a {8} shorter than most people expect.",
    gaps:[
      { answer:["at"],
        why:"<code>be bad at</code> y <code>be good at</code>, siempre con <em>at</em>. El español «malo en» empuja hacia <em>in</em>, y ese es exactamente el fallo. Va en el mismo paquete que <code>interested in</code> y <code>worried about</code>: el adjetivo trae su preposición pegada." },
      { answer:["on","off"],
        why:"<code>live on something</code> es alimentarse de algo. <em>Live of</em> no existe, aunque el español «vivir de» lo pida a gritos. <em>Live off</em> también vale y suena algo más coloquial." },
      { answer:["it"],
        why:"El sujeto de relleno del día 2. La frase necesita alguien delante del verbo aunque no haya nadie, y ese hueco lo tapa <em>it</em>. Dejarlo vacío es el error que un hispanohablante no detecta al releer, porque en español la frase estaría completa." },
      { answer:["the"],
        why:"<code>the same as</code> es bloque fijo y siempre lleva artículo. Aquí el español coincide, así que el hueco es fácil si te fijas en <em>as</em>, que es la pista de que viene una comparación de igualdad." },
      { answer:["that","which"],
        why:"Relativo de objeto: el conocimiento que nadie te enseñó. Valen <em>that</em> y <em>which</em>. Curiosamente aquí también se podría omitir el relativo, pero el examen pide una palabra en el hueco, así que hay que ponerla." },
      { answer:["once","when","after"],
        why:"Necesitas una conjunción de tiempo. <em>Once</em> es la más precisa: «una vez que». Ojo con el tiempo verbal, porque detrás va presente perfecto y no futuro: el inglés no pone <em>will</em> después de estas conjunciones." },
      { answer:["at"],
        why:"<code>the point at which</code>, el momento en el que. Con <em>in</em> hablarías de un punto dentro de algo físico. Es la estructura formal de <code>the point where</code>, y en el examen la preposición delante del relativo cae a menudo." },
      { answer:["lot","good","great"],
        why:"<code>a lot shorter</code> intensifica el comparativo. <em>Very</em> no puede ir con comparativos: <span class='bad'>very shorter</span> es imposible. Los intensificadores del comparativo son <em>much</em>, <em>far</em>, <em>a lot</em> y <em>a good deal</em>." }
    ]
  },

  /* ---------------------------------------------------------
     Part 3 · Word formation · 8 huecos
     --------------------------------------------------------- */
  { n:3, type:"wordform", count:8,
    title:"Word formation",
    instructions:"Transforma la palabra base para que encaje en el hueco. Fíjate en si hace falta un sustantivo, un adjetivo, un adverbio o un negativo.",
    heading:"The quiet power of boredom",
    example:"(0) BORE → boredom",
    text:"Boredom has a terrible {1}. Parents treat it as something to be {2} at all costs, and adults reach for a phone the second a queue stops moving.\n\n" +
         "Yet psychologists have grown increasingly {3} about that instinct. Their {4} is straightforward: a mind with nothing to do does not switch off. It wanders, and a wandering mind turns out to be {5} good at solving problems it was not consciously working on.\n\n" +
         "In one well-known experiment, people who spent fifteen minutes on a deliberately {6} task went on to produce noticeably more {7} answers than a group who started work straight away.\n\n" +
         "None of this makes being bored enjoyable. But it does suggest that the {8} to sit still with your own thoughts is worth protecting.",
    gaps:[
      { root:"REPUTE", answer:["reputation"],
        why:"Hace falta un sustantivo detrás de <em>a terrible</em>. De <em>repute</em> sale <b>reputation</b>, con el sufijo <em>-ation</em>, que es el más productivo del inglés para sacar sustantivos de verbos: <em>inform → information</em>, <em>decide → decision</em>." },
      { root:"AVOID", answer:["avoided"],
        why:"<code>to be + participio</code>: algo que hay que evitar, así que va en pasiva. El hueco no pide una palabra nueva sino la forma correcta del verbo, y esa es una de las trampas de esta parte: no siempre hay que cambiar de categoría." },
      { root:"DOUBT", answer:["doubtful"],
        why:"Detrás de <em>grown increasingly</em> va un adjetivo. <b>Doubtful</b> con el sufijo <em>-ful</em>. Cuidado con <em>doubtless</em>, que existe pero significa lo contrario: sin duda." },
      { root:"ARGUE", answer:["argument"],
        why:"Sujeto de la frase, así que sustantivo: <b>argument</b>. Y ojo con el falso amigo del día 5: aquí <em>argument</em> es «razonamiento», no una discusión con gritos, porque el contexto es lo que sostienen los psicólogos." },
      { root:"SURPRISE", answer:["surprisingly"],
        why:"Modifica al adjetivo <em>good</em>, así que toca adverbio: <b>surprisingly</b>. La cadena entera es <em>surprise → surprising → surprisingly</em>, y el examen suele pedir el último eslabón para ver si sabes qué modifica a qué." },
      { root:"MIND", answer:["mindless"],
        why:"Adjetivo delante de <em>task</em>, y el sentido pide algo que no exige pensar: <b>mindless</b>, con el sufijo negativo <em>-less</em>. Es el mismo mecanismo de <em>careless</em>, <em>useless</em> y <em>hopeless</em>." },
      { root:"CREATE", answer:["creative"],
        why:"Adjetivo delante de <em>answers</em>: <b>creative</b>. No <em>creational</em> ni <em>creating</em>. Aquí también funciona la pista de la posición: entre <em>more</em> y un sustantivo solo cabe un adjetivo." },
      { root:"ABLE", answer:["ability"],
        why:"Detrás de <em>the</em> va un sustantivo: <b>ability</b>. Fíjate en que el adjetivo pierde la <em>-le</em> y coge <em>-ility</em>. El negativo sería <em>inability</em>, que también cae mucho en esta parte." }
    ]
  },

  /* ---------------------------------------------------------
     Part 4 · Key word transformations · 6 frases
     --------------------------------------------------------- */
  { n:4, type:"transform", count:6,
    title:"Key word transformations",
    instructions:"Reescribe la segunda frase para que signifique lo mismo que la primera. Usa la palabra clave sin cambiarla y escribe entre DOS y CINCO palabras.",
    items:[
      { from:"I haven't been to the cinema for two years.",
        key:"LAST", max:5,
        before:"The ", after:" to the cinema was two years ago.",
        answer:["last time i went","last time i was"],
        why:"El present perfect con <em>for</em> se convierte en <code>the last time + past simple</code>. Es la transformación más repetida del examen, y el fallo típico es dejar el verbo en presente perfecto dentro de la segunda frase." },

      { from:"They cancelled the meeting because of the weather.",
        key:"CALLED", max:5,
        before:"The meeting ", after:" because of the weather.",
        answer:["was called off","had been called off"],
        why:"Dos cambios a la vez: activa a pasiva y verbo normal a phrasal. <code>call off</code> es cancelar, y en pasiva mantiene la partícula pegada: <em>was called off</em>. Separar el phrasal aquí lo rompe." },

      { from:"It's a pity I didn't take the earlier train.",
        key:"WISH", max:5,
        before:"I ", after:" the earlier train.",
        answer:["wish i had taken","wish i'd taken"],
        why:"Lamentar algo del pasado pide <code>wish + past perfect</code>. El error de manual es poner <em>wish I took</em>, que lamentaría el presente. El español «ojalá hubiera cogido» ya te da la pista del pluscuamperfecto." },

      { from:"Someone should have told me about the change.",
        key:"BEEN", max:5,
        before:"I ", after:" about the change.",
        answer:["should have been told"],
        why:"Pasiva con modal perfecto: <code>should have been + participio</code>. Son cuatro palabras seguidas que hay que colocar en el orden exacto, y la palabra clave <em>BEEN</em> te confirma que la pasiva es obligatoria." },

      { from:"It wasn't necessary for you to wait.",
        key:"NEED", max:5,
        before:"You ", after:".",
        answer:["needn't have waited","did not need to wait","didn't need to wait"],
        why:"<code>needn't have waited</code> dice que esperaste sin que hiciera falta. <code>didn't need to wait</code> deja abierto si esperaste o no. Las dos se aceptan aquí porque la frase original no aclara qué pasó." },

      { from:"I'm sure she forgot about the appointment.",
        key:"MUST", max:5,
        before:"She ", after:" about the appointment.",
        answer:["must have forgotten"],
        why:"Deducción sobre el pasado: <code>must have + participio</code>. Para la deducción negativa sería <em>can't have forgotten</em>, nunca <span class='bad'>mustn't have</span>, que significa una prohibición." }
    ]
  },

  /* ---------------------------------------------------------
     Part 5 · Multiple choice reading · 6 preguntas
     --------------------------------------------------------- */
  { n:5, type:"reading", count:6,
    title:"Multiple choice",
    heading:"Reading Part 5",
    instructions:"Lee el texto y elige la mejor respuesta. Los distractores están apoyados en el texto: casi todos repiten palabras que aparecen en él.",
    text:[
      "Ellen Mayhew did not set out to spend her life inside church towers. She trained as a metallurgist and spent eleven years testing aircraft components in a laboratory outside Bristol, work she describes without much enthusiasm as thorough and quiet. The change came through her father, who rang bells at the parish church and complained one Sunday that the fifth bell had developed a sound he could only call sour.",
      "She went to look, mostly to stop him talking about it. What she found was a bell cast in 1743 with a hairline crack running from the lip, invisible unless you knew where to put your thumb. She also found that almost nobody in Britain could repair it. There were foundries that could melt the bell down and cast a new one, which is what the church had been advised to do, and there were four or five people who could weld a crack closed and leave the original metal singing. Her father's church could not afford the first and could not find the second.",
      "Mayhew spent two years persuading one of those four people to teach her. Bell welding is done cold, over weeks, using a process that has more in common with dentistry than with heavy industry: the crack is ground out, filled in tiny stages, and the whole bell is heated and cooled on a schedule that can run to a fortnight. Rush it and the bell survives but the note dies, which she says is the worst outcome, because the church has paid for something that looks mended and is not.",
      "The economics are strange. A job takes between six weeks and four months and she turns down more work than she accepts, yet she has never advertised and does not intend to. Most of her customers are village churches with fundraising committees and no money, and she prices accordingly, subsidising them with occasional work for cathedrals and, once, a shipping company that wanted a bell restored for a boardroom.",
      "What she resists is being described as a craftsperson keeping a dying trade alive. The phrase irritates her. Bell welding is not dying, she points out; it was never large. Four people could always meet the demand of a country with forty thousand hanging bells, because bells break rarely and last for centuries. The risk is not that the work will disappear but that the chain will break: if the four become three and then two, the knowledge stops being passed on, and after that the only option left is melting.",
      "She has taken on two apprentices in the last five years. One left. The other, a former sound engineer, is now four years into what Mayhew estimates is a seven-year training, and can already be left alone with an eighteenth-century bell, which she describes as the only qualification that means anything."
    ],
    glossary:[
      {w:"set out to", d:"proponerse"},
      {w:"cast", d:"fundir (una campana)"},
      {w:"hairline crack", d:"grieta finísima"},
      {w:"foundry", d:"fundición"},
      {w:"weld", d:"soldar"},
      {w:"grind out", d:"desbastar, rebajar"},
      {w:"fortnight", d:"quince días"},
      {w:"turn down", d:"rechazar"},
      {w:"trade", d:"oficio"},
      {w:"apprentice", d:"aprendiz"}
    ],
    questions:[
      { q:"What first brought Mayhew into contact with the problem?",
        opts:[
          "She had always been interested in church bells.",
          "Her laboratory work involved testing bell metal.",
          "She went to investigate mainly to end her father's complaints.",
          "Her father asked her to use her professional training to help."
        ],
        ok:2,
        why:"El texto lo dice con ironía: <em>mostly to stop him talking about it</em>. La D es el distractor fuerte porque ella sí es metalúrgica y el padre sí se quejó, pero en ningún momento le pide ayuda profesional: es ella la que va, y por hartazgo." },

      { q:"What was the church's difficulty once the crack was found?",
        opts:[
          "Neither of the two available solutions was open to them.",
          "Nobody in Britain was able to repair a bell of that age.",
          "The bell was too old to be melted down and recast.",
          "They had been given advice that turned out to be wrong."
        ],
        ok:0,
        why:"Había dos caminos, fundir y soldar: no podían pagar el primero y no encontraban a nadie para el segundo. La B exagera el <em>almost nobody</em> del texto hasta convertirlo en nadie, que es la manipulación más común de esta parte." },

      { q:"Why does Mayhew consider a rushed repair the worst result?",
        opts:[
          "The bell is likely to crack again within a few years.",
          "The bell looks repaired but has lost its sound.",
          "The process cannot be started a second time.",
          "The heating schedule becomes impossible to control."
        ],
        ok:1,
        why:"<em>The bell survives but the note dies</em>, y la iglesia ha pagado por algo que parece arreglado y no lo está. La A suena muy razonable y es lo que cualquiera supondría de una soldadura mal hecha, pero el texto no lo menciona." },

      { q:"What does the text say about how she charges for her work?",
        opts:[
          "She charges cathedrals and village churches the same rate.",
          "She advertises selectively to reach wealthier customers.",
          "She lowers her price for churches and makes it up elsewhere.",
          "She accepts most of the work she is offered to stay solvent."
        ],
        ok:2,
        why:"<em>She prices accordingly, subsidising them with occasional work for cathedrals</em>. La D dice justo lo contrario de <em>she turns down more work than she accepts</em>, y la B contradice <em>she has never advertised</em>: dos distractores construidos invirtiendo frases del texto." },

      { q:"Why does the description «keeping a dying trade alive» annoy her?",
        opts:[
          "Bell welding has in fact been growing in recent years.",
          "The trade was never big, so it cannot be shrinking now.",
          "She does not think of herself as a craftsperson at all.",
          "The real danger is that the knowledge stops being handed on."
        ],
        ok:3,
        why:"Aquí hay dos opciones apoyadas en el texto y hay que elegir la que responde a la pregunta. La B recoge un argumento que ella da, pero la razón de fondo, la que el párrafo desarrolla hasta el final, es la cadena que se rompe: cuatro pasan a tres, luego a dos, y el conocimiento deja de transmitirse." },

      { q:"What does the last paragraph suggest about the surviving apprentice?",
        opts:[
          "He has finished his training faster than expected.",
          "He is trusted with valuable work before completing his training.",
          "He was chosen because of his experience with sound.",
          "He is likely to replace Mayhew when she retires."
        ],
        ok:1,
        why:"Lleva cuatro años de siete y ya se le puede dejar solo con una campana del XVIII. La A confunde «puede trabajar solo» con «ha terminado», y la C toma un dato cierto, que era ingeniero de sonido, y le inventa una relación causal que el texto no establece." }
    ]
  },

  /* ---------------------------------------------------------
     Part 6 · Gapped text · 6 huecos, 7 frases (sobra una)
     --------------------------------------------------------- */
  { n:6, type:"gappedtext", count:6,
    title:"Gapped text",
    instructions:"Coloca la frase que encaja en cada hueco. Hay siete frases y seis huecos: una sobra. Fíjate en los pronombres y los conectores, que son las costuras que unen una frase con la anterior y con la siguiente.",
    heading:"The woman who drew the ocean floor",
    text:"In 1952 Marie Tharp was working in a basement office at Columbia University, forbidden from going to sea because she was a woman. {1} What she had instead were thousands of pages of depth readings, collected by male colleagues on ships in the North Atlantic and handed to her as columns of numbers.\n\n" +
         "Her job was to turn those columns into pictures. Working by hand, she plotted each reading onto a long sheet of paper and joined them into cross-sections of the sea bed. {2} It ran down the centre of the ocean like a seam, and at its middle there was a deep notch.\n\n" +
         "Tharp thought the notch was a rift valley, a place where the floor of the ocean was slowly pulling apart. That idea was dangerous. {3} Her supervisor, Bruce Heezen, dismissed her interpretation as girl talk and told her to do the whole thing again.\n\n" +
         "She did it again. The rift was still there. {4} When those were plotted on the same scale, the earthquakes fell in a line that ran exactly along the valley she had drawn.\n\n" +
         "Heezen changed his mind, and the two of them worked together for the next twenty years. {5} It appeared in 1977, the year he died, and copies of it still hang in classrooms and government offices around the world.\n\n" +
         "Tharp's name was left off many of the early papers, and for decades the discovery was described as Heezen's. {6} She lived long enough to see that change, dying in 2006 at the age of eighty-six.",
    options:[
      { id:"A", t:"What settled the argument was an unrelated map, this one of earthquake epicentres." },
      { id:"B", t:"After six profiles she noticed something that none of the numbers had suggested on their own: a mountain range." },
      { id:"C", t:"Sonar had been developed during the war to hunt submarines, and its peacetime uses were still being worked out." },
      { id:"D", t:"Their finished map of the whole ocean floor took twenty years to complete." },
      { id:"E", t:"The rule was not written down anywhere, but nobody in the department thought to question it." },
      { id:"F", t:"Recognition came slowly, and mostly after she had stopped working." },
      { id:"G", t:"It implied continental drift, which most geologists of the time regarded as close to nonsense." }
    ],
    gaps:[
      { ok:"E",
        why:"<em>The rule</em> solo puede referirse a la prohibición de embarcar que acaba de mencionarse. Es la costura hacia atrás más clara del texto: un artículo definido delante de un sustantivo que no ha aparecido antes obliga a buscar a qué se refiere." },
      { ok:"B",
        why:"La frase siguiente empieza con <em>It ran down the centre of the ocean</em>, y ese <em>it</em> necesita un singular al que referirse. <em>A mountain range</em> lo es. Además <em>after six profiles</em> encadena con el trabajo de trazar secciones que se describe justo antes." },
      { ok:"G",
        why:"<em>That idea was dangerous</em> pide una explicación de por qué lo era, y la G la da: implicaba la deriva continental. El <em>it</em> inicial recoge <em>that idea</em>, y lo que viene después, el desprecio del supervisor, es la consecuencia." },
      { ok:"A",
        why:"La frase siguiente dice <em>when <b>those</b> were plotted</em>, en plural, y necesita un antecedente: los epicentros. Ojo con la trampa de leer solo hacia atrás: <em>the rift was still there</em> no anticipa nada, y es el hueco donde más gente se equivoca." },
      { ok:"D",
        why:"<em>It appeared in 1977</em> necesita un sujeto singular que pueda aparecer, y el mapa terminado lo es. Además <em>took twenty years</em> encadena con los veinte años de trabajo conjunto que se acaban de mencionar." },
      { ok:"F",
        why:"<em>She lived long enough to see <b>that</b> change</em> exige que antes se haya nombrado un cambio. El reconocimiento que llega tarde lo es. La frase también contrasta con el olvido descrito justo antes, que es la otra costura." }
    ],
    extraWhy:"Es verosímil, encaja de tema y menciona el sonar, que es de donde salían las mediciones. Pero **no cose nada**: ninguna frase posterior recoge nada de lo que dice. Esa es la prueba que hay que aplicar siempre a la que sobra." },

  /* ---------------------------------------------------------
     Part 7 · Multiple matching · 10 preguntas, 4 secciones
     --------------------------------------------------------- */
  { n:7, type:"matching", count:10,
    title:"Multiple matching",
    instructions:"Cuatro personas que cambiaron de profesión pasados los cuarenta. Decide en qué sección se dice cada cosa. Lo que se busca no es la palabra repetida sino la idea reformulada.",
    heading:"Starting again at forty",
    sections:[
      { id:"A", title:"Dan, abogado y ahora ebanista",
        text:[
          "I was thirty-nine when I made my first chair and forty-three when I finally stopped practising law. The money question is the one everybody asks and it is easily the least interesting: I earn roughly a third of what I did, and I knew that going in. What genuinely surprised me was the tiredness, or rather the absence of it. I had assumed physical work would leave me exhausted, and instead I sleep better than I have at any point since university. The hardest part was telling people. My father asked me twice, in the same conversation, whether I had actually been sacked. I had eighteen months of savings behind me, and that is the only honest reason this worked. Without them I would have crawled back to the firm inside a year."
        ] },
      { id:"B", title:"Priya, profesora y ahora programadora",
        text:[
          "Everyone assumes I left because of the behaviour or the workload, and it was neither. I loved being in a classroom. What finished me was the paperwork, and the sense that the paperwork was the point. I taught myself to code in the evenings for two years before I applied for a single job, which people describe as impressive and I would describe as slow. My salary roughly doubled, and I feel uncomfortable about how much difference that has made to my life. What I miss, and I did not expect to miss it, is having a hundred and fifty people who need me by name every single day. Nobody in an office needs you like that, and I am not sure anyone should."
        ] },
      { id:"C", title:"Martin, militar y ahora enfermero",
        text:[
          "I had been a soldier for twenty-two years when I started retraining at forty-one. People expect the two jobs to have nothing to do with each other, and they are wrong: both are shift work, both are about staying calm in a room where somebody else cannot. The training was far harder than I had allowed for, mostly because I had completely forgotten how to sit an examination. I was the oldest person in my cohort by about fifteen years and the only one who turned up without a laptop. What I had not anticipated at all was how much of the work is talking to families rather than to patients, and that turned out to be the part I am best at."
        ] },
      { id:"D", title:"Elena, banca y ahora panadera",
        text:[
          "I did not have a plan, whatever I may have said at the time. I had a redundancy payment and a stubborn idea, and the two are not the same as a plan. I opened the bakery eleven months after leaving the bank and it lost money steadily for two years. My husband kept his job throughout, and that is the honest answer to how we ate. I get up at four. People find that detail romantic, and I would like to say plainly that it is neither romantic nor terrible, it is simply a fact of the work. If somebody asks me whether it was worth doing, I say yes without hesitating, and then I tell them not to attempt it unless there is another income in the house."
        ] }
    ],
    glossary:[
      {w:"be sacked", d:"ser despedido"},
      {w:"savings", d:"ahorros"},
      {w:"workload", d:"carga de trabajo"},
      {w:"cohort", d:"promoción, grupo"},
      {w:"allow for", d:"prever, contar con"},
      {w:"redundancy payment", d:"indemnización por despido"},
      {w:"stubborn", d:"testarudo"},
      {w:"turn up", d:"presentarse, aparecer"}
    ],
    questions:[
      { q:"Which person says the change was only possible because of money they had put aside beforehand?",
        ok:"A", quote:"I had eighteen months of savings behind me",
        why:"Dan lo dice sin rodeos: dieciocho meses de ahorros, y sin ellos habría vuelto al bufete. Elena también habla de dinero, pero el suyo es una indemnización y sobre todo el sueldo de su marido, que es otra cosa: dinero que entra, no dinero apartado antes." },

      { q:"Which person depended on someone else's earnings while the new business lost money?",
        ok:"D", quote:"My husband kept his job throughout",
        why:"Elena. La palabra <em>income</em> aparece dos veces en su sección y la segunda es un consejo directo: no lo intentes sin otro sueldo en casa." },

      { q:"Which person learned the new skill alone before looking for work in the field?",
        ok:"B", quote:"I taught myself to code in the evenings for two years",
        why:"Priya, dos años por las tardes antes de echar una sola solicitud. Martin también se formó de nuevo, pero de forma reglada y en una promoción con compañeros, que es justo lo contrario de aprender solo." },

      { q:"Which person found the academic side of retraining unexpectedly hard?",
        ok:"C", quote:"I had completely forgotten how to sit an examination",
        why:"Martin. Fíjate en que la pregunta dice <em>unexpectedly</em> y él dice <em>far harder than I had allowed for</em>: la reformulación es exactamente eso, y no aparece la palabra <em>unexpected</em> en ningún sitio." },

      { q:"Which person mentions a relative questioning whether the decision had really been their own?",
        ok:"A", quote:"whether I had actually been sacked",
        why:"El padre de Dan le pregunta dos veces si en realidad lo habían echado, o sea, si de verdad se fue él. Es una reformulación bastante indirecta y de las que más se fallan." },

      { q:"Which person feels uneasy about the importance of their higher salary?",
        ok:"B", quote:"I feel uncomfortable about how much difference that has made",
        why:"Priya. Dan también habla de dinero, pero en su caso gana menos y dice que es la parte menos interesante: ninguna incomodidad, solo desinterés." },

      { q:"Which person says the old and new jobs have more in common than others assume?",
        ok:"C", quote:"both are shift work, both are about staying calm",
        why:"Martin lo dice y además explica en qué: turnos y mantener la calma. La pregunta esconde la respuesta detrás de <em>people expect… and they are wrong</em>." },

      { q:"Which person misses being relied on by a large number of people?",
        ok:"B", quote:"a hundred and fifty people who need me by name",
        why:"Priya. Es la única que habla de echar algo de menos, y el detalle del número exacto es la marca de la sección." },

      { q:"Which person rejects the idea that part of their routine is appealing?",
        ok:"D", quote:"People find that detail romantic",
        why:"Elena, sobre levantarse a las cuatro: ni romántico ni terrible, simplemente parte del trabajo. La pregunta usa <em>appealing</em> donde el texto usa <em>romantic</em>, que es el tipo de sinónimo que hay que saber ver." },

      { q:"Which person was surprised by a physical effect of the new work?",
        ok:"A", quote:"I sleep better than I have at any point since university",
        why:"Dan esperaba acabar agotado y duerme mejor que nunca. Es un efecto físico y él mismo lo marca como sorpresa: <em>what genuinely surprised me was the tiredness, or rather the absence of it</em>." }
    ]
  }

  ]
});
