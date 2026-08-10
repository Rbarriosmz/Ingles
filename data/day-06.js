REGISTER_DAY({
  n: 6,
  title: "Preguntas y negaciones",
  minutes: 33,

  blocks: [

  /* ---------------------------------------------------------
     1. El auxiliar do
     --------------------------------------------------------- */
  { title: "El auxiliar que el español no tiene", items: [

    { type:"note", title:"En español la pregunta se hace con la voz. En inglés hace falta una pieza más",
      html:"<p><em>Trabajas los sábados</em> y <em>¿trabajas los sábados?</em> son la misma frase: solo cambia la entonación. El inglés no puede hacer eso. Necesita meter un <b>auxiliar</b> delante, y ese auxiliar es <code>do</code>, <code>does</code> o <code>did</code>.</p>" +
           "<table><tr><th></th><th>Afirmativa</th><th>Pregunta</th><th>Negativa</th></tr>" +
           "<tr><td>Presente</td><td><code>You work</code></td><td><code>Do you work?</code></td><td><code>You don't work</code></td></tr>" +
           "<tr><td>Presente 3ª pers.</td><td><code>She works</code></td><td><code>Does she work?</code></td><td><code>She doesn't work</code></td></tr>" +
           "<tr><td>Pasado</td><td><code>They went</code></td><td><code>Did they go?</code></td><td><code>They didn't go</code></td></tr></table>" +
           "<p>Dos consecuencias que se olvidan constantemente:</p>" +
           "<ul>" +
           "<li><b>El auxiliar se queda con la marca de tiempo y de persona, y el verbo principal se queda desnudo.</b> <span class='bad'>Did you went?</span> → <code>Did you go?</code> · <span class='bad'>Does she works?</span> → <code>Does she work?</code></li>" +
           "<li><b>La respuesta corta repite el auxiliar, no el verbo.</b> <em>¿Te gustó?</em> → <code>Yes, I did</code>, no <span class='bad'>Yes, I liked</span>.</li>" +
           "</ul>" +
           "<p>Y una excepción que simplifica mucho: con <b>to be</b> y con los <b>modales</b> (<em>can</em>, <em>will</em>, <em>should</em>…) no hace falta <em>do</em>, porque ellos mismos hacen de auxiliar: <code>Are you tired?</code>, <code>Can you help?</code></p>" },

    { type:"mcq",
      es:"¿Trabajas los sábados?",
      opts:["Work you on Saturdays?","Do you work on Saturdays?","Do you work the Saturdays?","Does you work on Saturdays?"],
      ok:1,
      trap:"Work you on Saturdays?",
      why:"Sin <em>do</em> la frase no es una pregunta en inglés, es una orden mal hecha. Y fíjate en el resto: los días de la semana llevan <b>on</b> y **no llevan artículo**, así que <em>los sábados</em> en general es <code>on Saturdays</code>." },

    { type:"mcq",
      es:"¿Dónde fuiste ayer?",
      opts:["Where did you go yesterday?","Where you went yesterday?","Where did you went yesterday?","Where went you yesterday?"],
      ok:0,
      trap:"Where did you went yesterday?",
      why:"Este es el error que más aguanta: sale bien la estructura de la pregunta y luego se marca el pasado dos veces. **Si está _did_, el verbo va en infinitivo sin _to_.** El pasado ya lo lleva el auxiliar. Lo mismo en negativa: <code>I didn't go</code>, nunca <span class='bad'>I didn't went</span>." },

    { type:"mcq",
      es:"No entiendo lo que quieres decir.",
      opts:["I not understand what you want to say.","I no understand what you mean.","I don't understand what you mean.","I don't understand what do you mean."],
      ok:2,
      trap:"I no understand what you mean.",
      why:"La negación también necesita auxiliar: <em>not</em> no puede ir suelto delante del verbo. Y <em>querer decir</em> es <b>mean</b>, un verbo entero: <em>want to say</em> es traducción palabra por palabra. La D falla por lo que viene en el tercer bloque de hoy." },

    { type:"gap",
      es:"—¿Te gustó la película? —Sí, mucho.",
      text:"Did you like the film? — Yes, I ___.",
      answer:["did"],
      why:"En español repites el verbo o dices «sí». En inglés **la respuesta corta repite el auxiliar de la pregunta**: <code>Do you…? Yes, I do</code>. <code>Did you…? Yes, I did</code>. <code>Are you…? Yes, I am</code>. Responder <em>Yes, I liked</em> suena a frase cortada por la mitad." }

  ]},

  /* ---------------------------------------------------------
     2. El orden de la pregunta
     --------------------------------------------------------- */
  { title: "El orden de la pregunta", items: [

    { type:"note", title:"Palabra interrogativa, auxiliar, sujeto, verbo. En ese orden",
      html:"<p>Todas las preguntas con <em>wh-</em> siguen el mismo molde:</p>" +
           "<p class='mono'><b>Where</b> · <b>did</b> · <b>you</b> · <b>go</b>? &nbsp;&nbsp; <b>How much</b> · <b>does</b> · <b>it</b> · <b>cost</b>?</p>" +
           "<p>Hay una sola excepción, y es la que más se falla: <b>cuando la palabra interrogativa es el sujeto, no hay auxiliar</b>. Compara:</p>" +
           "<ul>" +
           "<li><code>Who called you?</code> — quiero saber quién es el sujeto, así que no hace falta <em>did</em>.</li>" +
           "<li><code>Who did you call?</code> — el sujeto es <em>you</em>, y entonces sí.</li>" +
           "</ul>" +
           "<p>Y una diferencia de colocación que delata mucho: en español la preposición va delante (<em>¿con quién hablabas?</em>), en inglés se queda al final. <code>Who were you talking to?</code>, <code>What are you looking for?</code>, <code>Where does she come from?</code></p>" },

    { type:"mcq",
      es:"¿Cuánto cuesta enviar esto a España?",
      opts:["How much costs to send this to Spain?","How much does it cost to send this to Spain?","How much it costs to send this to Spain?","How much does cost to send this to Spain?"],
      ok:1,
      trap:"How much costs to send this to Spain?",
      why:"Faltan las dos piezas que el español no pone: el auxiliar <em>does</em> y el sujeto <em>it</em>. En español <em>cuesta</em> no necesita a nadie delante; en inglés cualquier verbo conjugado exige sujeto, y aquí el sujeto real (<em>to send this to Spain</em>) se ha ido al final, así que el hueco lo tapa <b>it</b>." },

    { type:"mcq",
      es:"¿Quién te dijo eso?",
      opts:["Who did tell you that?","Who did say you that?","Who told you that?","Who you told that?"],
      ok:2,
      trap:"Who did tell you that?",
      why:"<em>Who</em> es aquí el sujeto de la frase, así que la pregunta ya está en orden normal y **el auxiliar sobra**. La A no es imposible, pero con ese <em>did</em> acentuado significa «¿pero quién te lo dijo?», con tono de incredulidad. Y <em>decir algo a alguien</em> es <code>tell someone</code>, no <em>say someone</em>." },

    { type:"gap",
      es:"¿Con quién estabas hablando?",
      text:"Who were you ___ to?",
      answer:["talking","speaking","chatting"],
      why:"Lo importante de esta frase está al final: **el inglés deja la preposición colgando** donde el español la pone delante. <code>Who … to?</code>, <code>What … for?</code>, <code>Where … from?</code>. La versión con la preposición delante (<em>To whom were you talking?</em>) existe, pero suena a documento legal." }

  ]},

  /* ---------------------------------------------------------
     3. La pregunta indirecta
     --------------------------------------------------------- */
  { title: "La pregunta indirecta vuelve al orden normal", items: [

    { type:"note", title:"En cuanto la pregunta va dentro de otra frase, deja de ser pregunta",
      html:"<p>Esta es la regla que más frases estropea en el examen oral, porque justo aparece cuando intentas ser educado.</p>" +
           "<p>Pregunta directa: <code>Where is the station?</code> — con inversión.<br>" +
           "Pregunta indirecta: <code>Do you know where the station <b>is</b>?</code> — sin inversión.</p>" +
           "<p>Dentro de la segunda frase ya no hay pregunta: hay una oración normal, con su sujeto delante del verbo y sin auxiliar. Por eso:</p>" +
           "<ul>" +
           "<li><span class='bad'>Can you tell me where is the toilet?</span> → <code>Can you tell me where the toilet is?</code></li>" +
           "<li><span class='bad'>I don't know what does he want.</span> → <code>I don't know what he wants.</code></li>" +
           "<li><span class='bad'>She asked me where did I live.</span> → <code>She asked me where I lived.</code></li>" +
           "</ul>" +
           "<p>Las fórmulas que abren estas preguntas son las más útiles del examen oral: <code>Could you tell me…</code>, <code>Do you know…</code>, <code>I was wondering…</code>, <code>Would you mind telling me…</code>. Y si no hay palabra interrogativa, se usa <b>if</b> o <b>whether</b>: <code>Do you know if it's open?</code></p>" },

    { type:"mcq",
      es:"¿Sabes dónde está la estación?",
      opts:["Do you know where is the station?","Do you know where the station is?","You know where is the station?","Do you know where does the station is?"],
      ok:1,
      trap:"Do you know where is the station?",
      why:"La pregunta de verdad es <em>Do you know…?</em>. Lo que va detrás ya es información, no pregunta, así que vuelve al orden **sujeto + verbo**: <code>where the station is</code>. Es antiintuitivo porque en español la entonación interrogativa se mantiene hasta el final, y aquí se apaga en cuanto empieza la segunda parte." },

    { type:"mcq",
      es:"Me preguntó a qué hora empezaba la reunión.",
      opts:["She asked me what time did the meeting start.","She asked to me at what time started the meeting.","She asked me what time the meeting started.","She asked me what time was starting the meeting."],
      ok:2,
      trap:"She asked me what time did the meeting start.",
      why:"Dos cosas. Una: sin auxiliar, porque la pregunta está incrustada. Dos: <b>_ask_ no lleva _to_ delante de la persona</b>. <span class='bad'>She asked to me</span> es calco directo de <em>me preguntó a mí</em>. Se dice <code>ask someone</code>, igual que <code>tell someone</code>." },

    { type:"gap",
      es:"¿Me puedes decir cuánto cuesta?",
      text:"Can you tell me how much ___?",
      answer:["it costs","it is"],
      why:"Otra vez el sujeto <em>it</em> obligatorio y el orden normal detrás de <em>how much</em>. Si te sale <span class='bad'>how much does it cost</span> dentro de esta frase, es que has arrastrado el auxiliar de la pregunta directa: en cuanto hay <em>Can you tell me</em> delante, ese <em>does</em> desaparece." }

  ]},

  /* ---------------------------------------------------------
     4. Escuchar y hablar
     --------------------------------------------------------- */
  { title: "Escuchar y hablar", items: [

    { type:"listening", mode:"mcq",
      audio:"Would you mind telling me how long you've been waiting? I don't want to jump the queue.",
      question:"What does the speaker want to know?",
      opts:["Whether the other person is waiting for the same thing.","How long the other person has been there.","Whether they are allowed to go first.","Where the end of the queue is."],
      ok:1,
      why:"<code>Would you mind telling me…</code> es la fórmula más educada de todas, y detrás va, como toca, el orden normal: <em>how long you've been waiting</em>, sin auxiliar. La segunda frase explica el motivo: <em>jump the queue</em> es colarse, así que no está pidiendo pasar delante, está evitándolo." },

    { type:"speaking", seconds:60,
      prompt:"Acabas de llegar a una ciudad que no conoces. Haz seis preguntas en voz alta a alguien de allí: tres directas y tres indirectas, empezando con Could you tell me… o Do you know…",
      useful:["Excuse me, do you know…?","Could you tell me…?","Where's the nearest…?","How long does it take to…?","Is there a … near here?","Do you know if…?"],
      model:"Excuse me, sorry to bother you. Do you know if there's a chemist near here? And could you tell me how long it takes to walk to the station? I'm not sure whether I've got time to have a coffee first. Where's the nearest cash machine, by the way? One more thing: do you know what time the museum closes on Sundays? I read online that it shuts at two, but the website looked out of date. Thanks, you've been very helpful."
    }

  ]},

  /* ---------------------------------------------------------
     5. Cierre
     --------------------------------------------------------- */
  { title: "Cierre: todo mezclado", items: [

    { type:"mcq",
      es:"No sé por qué no me lo dijo.",
      opts:["I don't know why didn't she tell me.","I not know why she didn't say me.","I don't know why she didn't tell me.","I don't know why she not told me."],
      ok:2,
      trap:"I don't know why didn't she tell me.",
      why:"La negación de fuera necesita <em>don't</em>, la de dentro necesita <em>didn't</em>, y la parte incrustada va **en orden normal**. Tres decisiones distintas en una frase de siete palabras, y las tres se apoyan en algo que el español no marca." },

    { type:"gap",
      es:"¿A qué hora sale el próximo tren?",
      text:"What time ___ the next train leave?",
      answer:["does"],
      why:"Esta sí es pregunta directa, así que toca auxiliar. Y fíjate en que el verbo se queda en <em>leave</em>, sin la <em>-s</em> de tercera persona: esa marca ya está en <em>does</em>. Marcarla dos veces es el error del segundo ejercicio de hoy, y reaparece cada vez que hablas rápido." },

    { type:"listening", mode:"dictation",
      audio:"Could you tell me where the meeting is and what time it starts?",
      why:"Dos preguntas indirectas encadenadas, las dos en orden normal: <em>where the meeting is</em> y <em>what time it starts</em>. Si al escribirlas te ha salido <em>where is the meeting</em>, tienes el reflejo de la inversión todavía encendido, que es lo normal en la primera semana." }

  ]}

  ]
});
