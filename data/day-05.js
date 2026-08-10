REGISTER_DAY({
  n: 5,
  title: "Falsos amigos",
  minutes: 35,

  blocks: [

  /* ---------------------------------------------------------
     1. Los cuatro más caros
     --------------------------------------------------------- */
  { title: "Los cuatro que más caro salen", items: [

    { type:"note", title:"El falso amigo no se detecta, y ese es el problema",
      html:"<p>Un error de gramática lo notas al releer. Un falso amigo no: la palabra existe, está bien escrita y encaja en la frase. Simplemente significa otra cosa, y quien te escucha entiende algo distinto de lo que querías decir sin que ninguno de los dos se entere.</p>" +
           "<table><tr><th>Dices</th><th>Y significa</th><th>Querías decir</th></tr>" +
           "<tr><td><span class='bad'>actually</span></td><td>en realidad</td><td>currently, at the moment</td></tr>" +
           "<tr><td><span class='bad'>eventually</span></td><td>al final, con el tiempo</td><td>possibly, occasionally</td></tr>" +
           "<tr><td><span class='bad'>assist</span></td><td>ayudar</td><td>attend</td></tr>" +
           "<tr><td><span class='bad'>realize</span></td><td>darse cuenta</td><td>carry out, do</td></tr>" +
           "<tr><td><span class='bad'>sensible</span></td><td>sensato</td><td>sensitive</td></tr>" +
           "<tr><td><span class='bad'>embarrassed</span></td><td>avergonzado</td><td>pregnant</td></tr></table>" +
           "<p>Ese último merece una nota aparte, porque es el que más caro sale en una reunión: <code>I'm embarrassed</code> es «me da vergüenza». <em>Embarazada</em> es <code>pregnant</code>.</p>" +
           "<p>Dos más que aparecen todo el rato en el examen: <b>attend</b> no lleva preposición (<code>attend the meeting</code>, no <span class='bad'>attend to</span>) y <b>discuss</b> tampoco (<code>discuss the budget</code>, no <span class='bad'>discuss about</span>).</p>" },

    { type:"mcq",
      es:"Actualmente trabajo en una empresa de energía.",
      opts:["Actually I work in an energy company.","I actually work for an energy company.","I currently work for an energy company.","At the actuality I work in an energy company."],
      ok:2,
      trap:"Actually I work in an energy company.",
      why:"<em>Actually</em> significa «en realidad», y sirve para corregir a alguien: <code>Actually, it was Tuesday</code>. Para «actualmente» se dice <b>currently</b>, <b>at the moment</b> o <b>these days</b>. Y se trabaja **_for_ una empresa**, no <em>in</em>: <em>in</em> es para el sector, <code>I work in energy</code>." },

    { type:"mcq",
      es:"Eventualmente puede haber retrasos en la entrega.",
      opts:["Eventually there may be delays in the delivery.","There may occasionally be delays in the delivery.","Eventually can be delays in the delivery.","There may eventually be delays with the delivery."],
      ok:1,
      trap:"Eventually there may be delays in the delivery.",
      why:"En español <em>eventualmente</em> quiere decir «de vez en cuando» o «llegado el caso». En inglés <em>eventually</em> significa **«al final, después de un tiempo»**: <code>He eventually agreed</code>. Si escribes <em>eventually</em> en un correo de trabajo, el cliente entiende que los retrasos son seguros y solo falta saber cuándo." },

    { type:"mcq",
      es:"Me di cuenta de que había olvidado las llaves.",
      opts:["I realised I'd forgotten my keys.","I gave myself account that I had forgotten the keys.","I realised of that I had forgotten the keys.","I noticed me that I had forgotten my keys."],
      ok:0,
      trap:"I realised of that I had forgotten the keys.",
      why:"Dos capas. La primera: <em>realise</em> es «darse cuenta», no «realizar»; para eso está <code>carry out</code>. La segunda es más silenciosa: **_realise_ no lleva preposición**, porque el <em>de</em> del español no se traduce. Lo mismo con <code>remember something</code> y <code>enter a room</code>." },

    { type:"gap",
      es:"Asistí a la reunión pero no dije nada.",
      text:"I ___ the meeting but I didn't say anything.",
      answer:["attended","went to","was at"],
      why:"<em>Assist</em> es «ayudar», así que <span class='bad'>I assisted the meeting</span> significa que echaste una mano a la reunión. Y <em>attend</em> va directo al objeto, sin <em>to</em>: el <em>a</em> del español no tiene equivalente aquí, igual que no lo tenía en <em>vi a Marta</em> el primer día." }

  ]},

  /* ---------------------------------------------------------
     2. La segunda tanda
     --------------------------------------------------------- */
  { title: "La segunda tanda", items: [

    { type:"note", title:"Nueve más, con el par de al lado",
      html:"<p>La forma útil de aprenderlos no es memorizar el falso amigo, sino <b>el par</b>: la palabra que creías y la que de verdad necesitas.</p>" +
           "<table><tr><th>Español</th><th>Inglés correcto</th><th>Y lo que NO es</th></tr>" +
           "<tr><td>soportar, aguantar</td><td><code>stand</code>, <code>put up with</code></td><td>support = apoyar</td></tr>" +
           "<tr><td>discutir, reñir</td><td><code>argue</code>, <code>have an argument</code></td><td>discuss = hablar de</td></tr>" +
           "<tr><td>pretender, tener intención</td><td><code>intend</code>, <code>mean to</code></td><td>pretend = fingir</td></tr>" +
           "<tr><td>librería</td><td><code>bookshop</code></td><td>library = biblioteca</td></tr>" +
           "<tr><td>éxito</td><td><code>success</code></td><td>exit = salida</td></tr>" +
           "<tr><td>largo</td><td><code>long</code></td><td>large = grande</td></tr>" +
           "<tr><td>constipado</td><td><code>have a cold</code></td><td>constipated = estreñido</td></tr>" +
           "<tr><td>carpeta</td><td><code>folder</code></td><td>carpet = moqueta</td></tr>" +
           "<tr><td>argumento (de una novela)</td><td><code>plot</code></td><td>argument = discusión</td></tr></table>" },

    { type:"mcq",
      es:"Es una persona muy sensata, siempre da buenos consejos.",
      opts:["She's a very sensitive person, she always gives good advice.","She's a very sensible person, she always gives good advice.","She's a person very sensible, she always gives good advices.","She's a very sensate person, she always gives a good advice."],
      ok:1,
      trap:"She's a very sensitive person, she always gives good advice.",
      why:"El par se cruza entero: <b>sensible</b> es «sensato» y <b>sensitive</b> es «sensible». Decir de tu jefa que es <em>sensitive</em> cuando quieres decir que es sensata la describe como alguien que se ofende con facilidad. Y <em>advice</em> es incontable, como viste el miércoles." },

    { type:"mcq",
      es:"Me da vergüenza pedir ayuda.",
      opts:["I'm embarrassed to ask for help.","I have shame to ask help.","It gives me shame to ask for the help.","I'm ashamed of asking for the help."],
      ok:0,
      trap:"It gives me shame to ask for the help.",
      why:"La estructura española <em>me da</em> no se traduce nunca literalmente: en inglés el sentimiento se es, no se recibe. Y hay un matiz entre las dos palabras: <em>embarrassed</em> es la vergüenza social del momento; <b>_ashamed_ es la vergüenza moral</b>, mucho más grave, de haber hecho algo mal." },

    { type:"mcq",
      es:"No soporto las reuniones de los lunes por la mañana.",
      opts:["I don't support the meetings of Monday morning.","I can't support the Monday morning meetings.","I can't stand Monday morning meetings.","I don't hold the meetings of the Monday mornings."],
      ok:2,
      trap:"I can't support the Monday morning meetings.",
      why:"<em>Support</em> es «apoyar»: <code>I support the proposal</code>. Para aguantar algo que te molesta, <code>can't stand</code> o <code>can't put up with</code>. Fíjate además en <em>Monday morning meetings</em>: en inglés los sustantivos se apilan como adjetivos, sin <em>of</em> y sin plural." },

    { type:"gap",
      es:"Estuvimos hablando del presupuesto durante una hora.",
      text:"We ___ the budget for an hour.",
      answer:["discussed","talked about"],
      why:"<em>Discuss</em> es «tratar un tema», sin bronca y **sin preposición**: <span class='bad'>discuss about</span> es de los errores más frecuentes en el Use of English. Si de verdad hubo bronca, la palabra es <code>argue</code>: <code>we argued about the budget</code>." }

  ]},

  /* ---------------------------------------------------------
     3. Lectura
     --------------------------------------------------------- */
  { title: "Leer sin traducir", items: [

    { type:"reading",
      title:"The interview that tells you nothing",
      text:[
        "Most companies still choose people much as they did fifty years ago: a conversation of forty minutes across a table, followed by a feeling. Managers trust that feeling completely. Researchers have spent decades explaining, politely, that they should not.",
        "The problem with an unstructured interview is that it mainly measures how comfortable somebody is in an unstructured interview. Studies going back to the 1980s put its ability to predict how well a person will actually do the job at around 0.2 on a scale where 1 is perfect and 0 is a coin toss. That is not nothing, but it is a great deal less than managers assume.",
        "One experiment makes the point uncomfortably well. Students were asked to interview candidates, some of whom had secretly been told to answer every question at random, regardless of what they were asked. The interviewers rarely noticed. Many of them rated the random candidates as warm, coherent and easy to talk to, and several said afterwards that they had built a good rapport.",
        "What does work is duller. Structured interviews, where every candidate gets the same questions in the same order and the answers are scored against an agreed list of criteria, roughly double the accuracy. Work samples do better still: give the person a small piece of the actual job and watch what happens.",
        "So why does nobody do it? Partly because structured interviews are unpleasant for everyone involved. They feel mechanical, they take longer to prepare, and they take away the part managers enjoy most, which is the sense that they can read people. Firms that have switched usually say the first few rounds felt cold, and that they got used to it.",
        "The uncomfortable conclusion is not that interviews are useless. It is that the part of the interview managers value most, the free conversation and the gut feeling at the end, is precisely the part that tells them least."
      ],
      glossary:[
        {w:"hire", d:"contratar"},
        {w:"rate", d:"valorar, puntuar"},
        {w:"coin toss", d:"cara o cruz, azar"},
        {w:"rapport", d:"conexión, buena sintonía"},
        {w:"dull", d:"aburrido, soso"},
        {w:"work sample", d:"prueba práctica"},
        {w:"take away", d:"quitar"},
        {w:"gut feeling", d:"corazonada, instinto"},
        {w:"get used to", d:"acostumbrarse a"}
      ],
      questions:[
        { q:"According to the text, what does an unstructured interview mainly measure?",
          opts:[
            "How much relevant experience the candidate has.",
            "How at ease the candidate is in that kind of conversation.",
            "How honestly the candidate answers difficult questions.",
            "How well the candidate has prepared for the meeting."
          ],
          ok:1,
          why:"Segundo párrafo, casi con esas palabras: mide lo cómoda que se siente la persona en una entrevista sin estructura. La D es el distractor bueno, porque el texto habla de preparación, pero de la del entrevistador, no de la del candidato." },

        { q:"What was surprising about the experiment with random answers?",
          opts:[
            "The candidates found it impossible to answer at random for long.",
            "The interviewers spotted the trick almost immediately.",
            "The interviewers generally failed to notice and gave positive assessments.",
            "The students refused to take part once they understood the design."
          ],
          ok:2,
          why:"<em>The interviewers rarely noticed</em>, y encima describieron a esos candidatos como cercanos y coherentes. La B dice exactamente lo contrario usando las mismas palabras del texto, que es la forma más habitual de construir un distractor en la parte 5 del examen." },

        { q:"Why, according to the writer, do few companies use structured interviews?",
          opts:[
            "They are more expensive to run than ordinary interviews.",
            "There is no clear evidence that they work better.",
            "Candidates complain that the questions are too difficult.",
            "They feel mechanical and remove the manager's sense of judging people."
          ],
          ok:3,
          why:"Quinto párrafo: resultan desagradables, cuesta más prepararlas y quitan al jefe la parte que más le gusta. La B es tentadora si has leído en diagonal, pero el texto dice justo lo contrario: la evidencia existe y es de los años ochenta." },

        { q:"What is the writer's final point?",
          opts:[
            "Interviews should be abolished and replaced by work samples.",
            "The most valued part of the interview is the least informative one.",
            "Managers are generally bad at their jobs.",
            "Companies have improved their hiring a lot in the last fifty years."
          ],
          ok:1,
          why:"La última frase lo dice sin rodeos: lo que más valoran los jefes, la conversación libre y la corazonada, es lo que menos información aporta. La A se pasa: el texto empieza el párrafo diciendo <em>the conclusion is not that interviews are useless</em>." }
      ]
    }

  ]},

  /* ---------------------------------------------------------
     4. Escribir
     --------------------------------------------------------- */
  { title: "Escribir", items: [

    { type:"writing", kind:"email",
      title:"Un correo corto, sin falsos amigos",
      prompt:"Un compañero inglés te escribe: puede pasarse el jueves para preparar juntos la presentación. El jueves no puedes. Contéstale, propón el viernes y ofrécele algo concreto que puedas adelantar tú. Entre 50 y 80 palabras.",
      min:50, max:80,
      checklist:[
        "No has usado assist para decir «asistir»: si aparece, es porque alguien ayuda a alguien.",
        "No has usado actually para decir «actualmente».",
        "No hay ningún discuss about ni attend to: los dos van sin preposición.",
        "Has rechazado el jueves con una fórmula inglesa (I'm afraid, Unfortunately) en vez de traducir «lo siento» literalmente.",
        "Los adjetivos van delante del sustantivo y ninguno lleva -s.",
        "Has cerrado con algo natural: Let me know, See you on Friday, Thanks."
      ],
      model:"Hi Tom,\n\nThanks for offering. I'm afraid Thursday doesn't work for me, as I have to attend a team meeting all afternoon. Would Friday morning suit you instead?\n\nIn the meantime I'll put together the first four slides and send them over on Thursday evening, so we only have to discuss the conclusions when we meet.\n\nLet me know if Friday is a problem.\n\nBest,\nAna"
    }

  ]},

  /* ---------------------------------------------------------
     5. Cierre
     --------------------------------------------------------- */
  { title: "Cierre: todo mezclado", items: [

    { type:"match", mode:"pairs",
      es:"Une cada palabra inglesa con lo que significa de verdad.",
      instruction:"Pulsa una palabra de la izquierda y luego su significado",
      pairs:[
        {l:"actually",   r:"en realidad"},
        {l:"eventually", r:"al final, con el tiempo"},
        {l:"sensible",   r:"sensato"},
        {l:"pretend",    r:"fingir"},
        {l:"support",    r:"apoyar"},
        {l:"library",    r:"biblioteca"}
      ],
      why:"Las seis existen en español con una forma parecida y las seis significan otra cosa. El que más caro sale por escrito es <em>actually</em>, porque encaja en cualquier frase sin chirriar y cambia el sentido sin que nadie lo note." },

    { type:"mcq",
      es:"Al final me di cuenta de que había discutido con él por una tontería.",
      opts:["I eventually realised I'd argued with him over something silly.","Actually I realised of that I had discussed with him for a silly thing.","Finally I gave myself account that I had discussed with him about a stupid thing.","Eventually I realised that I had discussed with him for a silly topic."],
      ok:0,
      trap:"Eventually I realised that I had discussed with him for a silly topic.",
      why:"Aquí <em>eventually</em> sí es correcto, porque significa «al final»: es el único sitio del día donde toca. Lo que falla en la D es <em>discussed</em>, que sería una conversación tranquila sobre presupuestos; si hubo bronca, es <b>argue</b>. Y se discute <em>over</em> o <em>about</em> algo, nunca <em>for</em>." },

    { type:"gap",
      es:"Fingió que no me había visto.",
      text:"He ___ he hadn't seen me.",
      answer:["pretended"],
      why:"<em>Pretend</em> es «fingir». Para «pretender» en el sentido de tener intención se dice <code>intend to</code> o <code>mean to</code>: <code>I didn't mean to interrupt</code>. Es un falso amigo que se cuela mucho por escrito porque la frase queda perfectamente gramatical y solo cambia lo que estás acusando a alguien de hacer." },

    { type:"listening", mode:"dictation",
      audio:"I'm afraid I can't attend the meeting, but I support the proposal.",
      why:"Dos falsos amigos seguidos en su uso correcto: <em>attend</em> como «asistir» y <em>support</em> como «apoyar». Y <code>I'm afraid</code> no es miedo: es la forma inglesa de decir «lo siento, pero» antes de una mala noticia. Sale en casi todos los correos de trabajo." }

  ]}

  ]
});
