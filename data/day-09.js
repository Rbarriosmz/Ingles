REGISTER_DAY({
  n: 9,
  title: "for, since, ago, yet, already",
  minutes: 30,

  blocks: [

  /* ---------------------------------------------------------
     1. for y since
     --------------------------------------------------------- */
  { title: "El «desde» español se parte en dos", items: [

    { type:"note", title:"for mide cuánto, since dice desde cuándo",
      html:"<p>El español usa <em>desde</em> y <em>desde hace</em> casi indistintamente. El inglés reparte el trabajo entre dos palabras y no las mezcla nunca:</p>" +
           "<table><tr><th></th><th>Va con</th><th>Ejemplo</th></tr>" +
           "<tr><td><code>for</code></td><td>Una <b>duración</b></td><td><code>for three years</code>, <code>for a long time</code>, <code>for ages</code></td></tr>" +
           "<tr><td><code>since</code></td><td>Un <b>punto de partida</b></td><td><code>since 2019</code>, <code>since Monday</code>, <code>since I was a child</code></td></tr></table>" +
           "<p>La prueba es sencilla: si detrás puedes contar el tiempo (tres años, dos horas), va <em>for</em>. Si detrás hay una fecha o un momento del calendario, va <em>since</em>.</p>" +
           "<p>Y una consecuencia que se olvida: <b>ninguna de las dos va con presente simple</b>. <span class='bad'>I live here since 2019</span> es imposible; toca <code>I've lived here since 2019</code>.</p>" },

    { type:"mcq",
      es:"Vivo aquí desde 2019.",
      opts:["I've lived here for 2019.","I've lived here since 2019.","I'm living here since 2019.","I live here since 2019."],
      ok:1,
      trap:"I live here since 2019.",
      why:"Dos decisiones. <em>2019</em> es un punto de partida, así que <b>since</b>. Y como la acción sigue, el tiempo es present perfect: el presente simple con <em>since</em> no existe en inglés, aunque en español sea lo normal." },

    { type:"mcq",
      es:"Llevamos esperando dos horas.",
      opts:["We've been waiting for two hours.","We're waiting since two hours.","We've waited since two hours.","We wait for two hours."],
      ok:0,
      trap:"We're waiting since two hours.",
      why:"<em>Two hours</em> es duración, así que <b>for</b>. Y el «llevar + gerundio» del español se dice con <code>have been + -ing</code>: describe algo que empezó antes y sigue en marcha ahora mismo." },

    { type:"gap",
      es:"No la veo desde el verano pasado.",
      text:"I haven't seen her ___ last summer.",
      answer:["since"],
      why:"<em>Last summer</em> es un momento del calendario, no una cantidad, así que <b>since</b>. Si quisieras la duración tendrías que reformular: <code>for a year</code>. El error de decir <span class='bad'>since a year</span> viene de mezclar las dos." }

  ]},

  /* ---------------------------------------------------------
     2. ago y el pasado simple
     --------------------------------------------------------- */
  { title: "ago, la palabra que cierra el momento", items: [

    { type:"note", title:"ago va detrás y arrastra past simple",
      html:"<p><code>ago</code> significa «hace», pero se coloca <b>detrás</b> de la cantidad: <code>two years ago</code>, no <span class='bad'>ago two years</span>.</p>" +
           "<p>Y lo importante: <b><em>ago</em> cierra el momento</b>, así que pide past simple, nunca perfecto.</p>" +
           "<ul>" +
           "<li><code>I moved here three years ago.</code> — pasado simple</li>" +
           "<li><code>I've lived here for three years.</code> — perfecto, mismo hecho contado al revés</li>" +
           "<li><span class='bad'>I've moved here three years ago.</span> — imposible</li>" +
           "</ul>" +
           "<p>Las tres frases hablan de lo mismo. Elegir una u otra cambia si estás mirando el momento en que ocurrió o el tiempo que llevas.</p>" },

    { type:"mcq",
      es:"Empecé el curso hace seis meses.",
      opts:["I started the course ago six months.","I started the course since six months.","I've started the course six months ago.","I started the course six months ago."],
      ok:3,
      trap:"I've started the course six months ago.",
      why:"<em>Ago</em> y el present perfect son incompatibles: uno cierra el momento y el otro lo mantiene abierto. Y va detrás de la cantidad, que es lo contrario del orden español." },

    { type:"mcq",
      es:"Hace mucho que no hablamos.",
      opts:["We didn't speak for a long time.","We don't speak since a long time.","We haven't spoken for a long time.","We haven't spoken since a long time."],
      ok:2,
      trap:"We haven't spoken since a long time.",
      why:"<em>A long time</em> es duración, así que <b>for</b>. La A no es agramatical, pero cuenta un periodo terminado del pasado; aquí la falta de contacto llega hasta hoy, y eso pide perfecto." },

    { type:"gap",
      es:"Nos conocimos hace diez años.",
      text:"We met ten years ___.",
      answer:["ago"],
      why:"Detrás de la cantidad, siempre. Y fíjate en <em>met</em>: pasado simple, porque <em>ago</em> ya ha cerrado el momento. En español dirías «nos conocemos desde hace diez años», que en inglés sería otra frase: <code>we've known each other for ten years</code>." }

  ]},

  /* ---------------------------------------------------------
     3. yet, already, still
     --------------------------------------------------------- */
  { title: "yet, already y still", items: [

    { type:"note", title:"Tres palabras que el español resuelve con «ya» y «todavía»",
      html:"<table><tr><th>Palabra</th><th>Uso</th><th>Dónde va</th></tr>" +
           "<tr><td><code>already</code></td><td>Ya, antes de lo esperado</td><td>Entre auxiliar y verbo</td></tr>" +
           "<tr><td><code>yet</code></td><td>Todavía no / ¿ya?</td><td>Al final de la frase</td></tr>" +
           "<tr><td><code>still</code></td><td>Todavía, sigue igual</td><td>Antes del verbo, o detrás de <em>to be</em></td></tr></table>" +
           "<ul>" +
           "<li><code>She's already left.</code> — ya se ha ido</li>" +
           "<li><code>He hasn't arrived yet.</code> — todavía no ha llegado</li>" +
           "<li><code>Have you finished yet?</code> — ¿ya has terminado?</li>" +
           "<li><code>I still don't understand.</code> — sigo sin entender</li>" +
           "</ul>" +
           "<p>La diferencia fina entre las dos negativas: <code>He hasn't arrived yet</code> es neutro, se le espera. <code>He still hasn't arrived</code> añade impaciencia, lleva un rato de retraso. Fíjate en que <em>still</em> se pone <b>delante</b> del auxiliar negativo.</p>" },

    { type:"mcq",
      es:"Todavía no ha llegado el paquete.",
      opts:["The parcel hasn't yet arrived.","The parcel hasn't arrived yet.","The parcel doesn't arrive yet.","The parcel hasn't arrived still."],
      ok:1,
      trap:"The parcel hasn't arrived still.",
      why:"<em>Yet</em> en negativa va **al final de la frase**. La A no es incorrecta en registro escrito formal, pero suena rígida; en el examen se espera la B. Y <em>still</em> no puede ir al final: iría delante de <em>hasn't</em>." },

    { type:"mcq",
      es:"Ya he comido, gracias.",
      opts:["I've already eaten, thanks.","I have eaten yet, thanks.","I already have eaten, thanks.","I've eaten already, thanks."],
      ok:0,
      trap:"I already have eaten, thanks.",
      why:"<em>Already</em> va entre el auxiliar y el participio. La D no está mal (al final también se admite, con matiz de sorpresa), pero la posición estándar es la del medio. Lo que no vale es delante del auxiliar." },

    { type:"gap",
      es:"Sigo sin entender por qué lo hizo.",
      text:"I ___ don't understand why he did it.",
      answer:["still"],
      why:"<em>Still</em> se coloca **delante del auxiliar negativo**, y esa posición es la que marca la impaciencia. Con <em>yet</em> la frase sería imposible: <em>yet</em> no funciona con presente simple negativo de esta forma." }

  ]},

  /* ---------------------------------------------------------
     4. Escuchar
     --------------------------------------------------------- */
  { title: "Escuchar", items: [

    { type:"listening", mode:"mcq",
      audio:"I've been trying to reach her since Tuesday, but she still hasn't picked up, and I sent the email three days ago.",
      question:"What is the speaker's situation?",
      opts:[
        "He plans to call her on Tuesday and send an email afterwards.",
        "He has decided to stop trying to contact her.",
        "She answered on Tuesday but has not replied to the email.",
        "He has been calling for days without success and is getting impatient."
      ],
      ok:3,
      why:"Las tres marcas del día en una frase: <em>since Tuesday</em> fija el punto de partida, <em>still hasn't</em> añade impaciencia, y <em>three days ago</em> cierra el momento del correo y por eso lleva pasado simple. Juntas cuentan a alguien que lleva días intentándolo." },

    { type:"listening", mode:"dictation",
      audio:"She's already finished, but I haven't started yet.",
      why:"Comprueba las dos posiciones: <em>already</em> en medio y <em>yet</em> al final. Son el mismo «ya» del español en dos sitios distintos, y confundirlos es lo más común de este bloque." }

  ]},

  /* ---------------------------------------------------------
     5. Cierre
     --------------------------------------------------------- */
  { title: "Cierre: todo mezclado", items: [

    { type:"match", mode:"classify",
      es:"Cada expresión pide una palabra y solo una.",
      instruction:"Pulsa una ficha y luego su columna",
      groups:["for","since","ago"],
      items:[
        {t:"two weeks", g:0}, {t:"a long time", g:0},
        {t:"2019", g:1}, {t:"I was a child", g:1},
        {t:"three days ___", g:2}, {t:"a moment ___", g:2}
      ],
      why:"La prueba es mecánica: si detrás hay una cantidad de tiempo, <b>for</b>; si hay un momento del calendario, <b>since</b>; y si la cantidad va seguida de la palabra, <b>ago</b>, que además obliga a pasado simple." },

    { type:"mcq",
      es:"Llevo aquí desde las nueve y todavía no me han atendido.",
      opts:["I am here from nine and they don't serve me yet.","I'm here since nine and they still haven't served me.","I've been here since nine and they still haven't served me.","I've been here for nine and they haven't served me still."],
      ok:2,
      trap:"I'm here since nine and they still haven't served me.",
      why:"<em>Nine</em> es una hora concreta, así que <b>since</b>, y el presente simple no vale: <code>I've been here</code>. En la segunda mitad, <em>still</em> delante del auxiliar negativo para marcar que ya llevas demasiado." },

    { type:"gap",
      es:"¿Ya has terminado el informe?",
      text:"Have you finished the report ___?",
      answer:["yet"],
      why:"En pregunta, <em>yet</em> significa «ya» y va al final. Con <em>already</em> la pregunta cambiaría de tono: <code>Have you already finished?</code> expresa sorpresa por lo rápido que ha sido." }

  ]}

  ]
});
