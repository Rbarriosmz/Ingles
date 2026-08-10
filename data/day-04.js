REGISTER_DAY({
  n: 4,
  title: "make, do, take y have",
  minutes: 30,

  blocks: [

  /* ---------------------------------------------------------
     1. make o do
     --------------------------------------------------------- */
  { title: "make o do", items: [

    { type:"note", title:"El español tiene «hacer». El inglés tiene cuatro verbos y ninguna regla fiable",
      html:"<p>Aquí no hay lógica que salve: son <b>bloques fijos</b> y se aprenden de memoria, como el género de las palabras en alemán. Pero hay una tendencia que acierta bastantes veces:</p>" +
           "<ul>" +
           "<li><b>make</b> → crear algo que antes no existía. <code>make a decision</code>, <code>make a mistake</code>, <code>make progress</code>, <code>make money</code>, <code>make friends</code>, <code>make an effort</code>, <code>make a noise</code>, <code>make sure</code>.</li>" +
           "<li><b>do</b> → realizar una actividad o una tarea, muchas veces sin nombrar el resultado. <code>do the shopping</code>, <code>do the washing-up</code>, <code>do your homework</code>, <code>do exercise</code>, <code>do research</code>, <code>do business</code>, <code>do someone a favour</code>, <code>do your best</code>.</li>" +
           "</ul>" +
           "<p>La tendencia falla lo suficiente como para que no puedas fiarte de ella: <code>do harm</code> no crea nada y <code>make the bed</code> no crea una cama. Por eso el método que funciona es aprender el bloque entero, con su sustantivo pegado, y no el verbo suelto.</p>" +
           "<p>Un aviso: <em>realizar</em> no es <span class='bad'>realize</span>. <em>Realize</em> es «darse cuenta». Para «realizar un estudio» se dice <code>carry out a study</code> o simplemente <code>do a study</code>." },

    { type:"mcq",
      es:"Tengo que tomar una decisión antes del viernes.",
      opts:["I have to take a decision before Friday.","I have to do a decision before Friday.","I have to make a decision before Friday.","I have to have a decision before Friday."],
      ok:2,
      trap:"I have to take a decision before Friday.",
      why:"El español dice <em>tomar</em>, así que la mano se va a <em>take</em>. En inglés una decisión **se fabrica**: <code>make a decision</code>. Existe <em>take a decision</em> en registro muy formal británico, pero es minoritario y en el examen se espera <em>make</em>. Con esa misma lógica: <code>make a choice</code>, <code>make a plan</code>." },

    { type:"mcq",
      es:"He cometido un error en el informe.",
      opts:["I've made a mistake in the report.","I've done a mistake in the report.","I've committed a mistake in the report.","I've had a mistake in the report."],
      ok:0,
      trap:"I've committed a mistake in the report.",
      why:"<em>Commit</em> existe, pero se reserva para delitos: <code>commit a crime</code>, <code>commit fraud</code>. Un error se fabrica: <code>make a mistake</code>. Es de los bloques más rentables porque aparece constantemente, tanto hablando como escribiendo." },

    { type:"mcq",
      es:"Los sábados hago la compra y luego hago algo de ejercicio.",
      opts:["On Saturdays I make the shopping and then I make exercise.","On Saturdays I do the shopping and then I do some exercise.","On Saturdays I do the shopping and then I make exercise.","On Saturdays I make the shopping and then I do exercise."],
      ok:1,
      trap:"On Saturdays I make the shopping and then I make exercise.",
      why:"Las dos son tareas rutinarias, y las tareas van con <em>do</em>: <code>do the shopping</code>, <code>do the cleaning</code>, <code>do the washing-up</code>, <code>do exercise</code>. Fíjate en que <em>exercise</em> es incontable en este sentido, por eso <em>some</em> y no <em>an</em>." },

    { type:"gap",
      es:"Hicimos muchos progresos el mes pasado.",
      text:"We ___ a lot of progress last month.",
      answer:["made"],
      why:"<code>make progress</code> es bloque fijo. Y guarda esto porque cae en el examen: **_progress_ es incontable**, así que no tiene plural. <span class='bad'>many progresses</span> es imposible; se dice <code>a lot of progress</code> o <code>good progress</code>." }

  ]},

  /* ---------------------------------------------------------
     2. take y have
     --------------------------------------------------------- */
  { title: "take y have", items: [

    { type:"note", title:"take para lo que se coge o lleva tiempo, have para lo que se experimenta",
      html:"<ul>" +
           "<li><b>take</b> → <code>take a photo</code>, <code>take an exam</code>, <code>take notes</code>, <code>take a break</code>, <code>take your time</code>, <code>take part in</code>, <code>take place</code>, <code>take medicine</code>, <code>take the bus</code>.</li>" +
           "<li><b>have</b> → <code>have breakfast</code>, <code>have a shower</code>, <code>have a look</code>, <code>have a rest</code>, <code>have fun</code>, <code>have a party</code>, <code>have an argument</code>, <code>have a problem</code>.</li>" +
           "</ul>" +
           "<p>Dos avisos que ahorran errores:</p>" +
           "<p><b>Uno.</b> <code>take place</code> significa «tener lugar», no «tomar sitio». <code>The meeting takes place on Tuesday</code>.</p>" +
           "<p><b>Dos.</b> Con <em>have</em> de experiencia, el inglés puede usar continuo: <code>I'm having lunch</code>. Con <em>have</em> de posesión, no: <span class='bad'>I'm having a car</span> está mal, se dice <code>I have a car</code>.</p>" },

    { type:"mcq",
      es:"¿Me haces una foto delante de la catedral?",
      opts:["Can you make me a photo in front of the cathedral?","Can you do me a photo in front of the cathedral?","Can you take a photo of me in front of the cathedral?","Can you take me a photo in front of the cathedral?"],
      ok:2,
      trap:"Can you make me a photo in front of the cathedral?",
      why:"Las fotos se cogen, no se hacen: <code>take a photo</code>. Y ojo con la opción D, que es la trampa fina: <em>take me a photo</em> significaría «cógeme una foto para mí» (de un montón). Si la foto es de tu cara, es **_a photo of me_**." },

    { type:"mcq",
      es:"Voy a darme una ducha antes de cenar.",
      opts:["I'm going to give me a shower before the dinner.","I'm going to do a shower before dinner.","I'm going to make a shower before dinner.","I'm going to have a shower before dinner."],
      ok:3,
      trap:"I'm going to give me a shower before the dinner.",
      why:"El español usa <em>darse</em> y el reflexivo, y ninguna de las dos cosas existe aquí. En inglés británico la ducha se tiene: <code>have a shower</code>. En americano se coge: <code>take a shower</code>. Las dos valen en el examen; lo que no vale es <em>give</em>. Y <em>dinner</em> va sin artículo, como viste ayer." },

    { type:"gap",
      es:"¿Puedo echar un vistazo antes de decidir?",
      text:"Can I ___ a look before I decide?",
      answer:["have","take"],
      why:"<code>have a look</code> y <code>take a look</code> valen las dos. Lo que no vale es traducir <em>echar</em>: <span class='bad'>throw a look</span> no significa nada. Este patrón de <em>have + sustantivo</em> es muy inglés y suena mucho más natural que el verbo solo: <code>have a chat</code>, <code>have a think</code>, <code>have a go</code>." }

  ]},

  /* ---------------------------------------------------------
     3. Bloques sueltos
     --------------------------------------------------------- */
  { title: "Bloques que hay que memorizar enteros", items: [

    { type:"mcq",
      es:"Me hizo una pregunta muy difícil.",
      opts:["She made me a very difficult question.","She asked me a very difficult question.","She did me a very difficult question.","She put me a very difficult question."],
      ok:1,
      trap:"She made me a very difficult question.",
      why:"Aquí no hay ningún <em>hacer</em>: las preguntas **se preguntan**. <code>ask a question</code> es el bloque, y la persona va sin preposición justo detrás: <code>ask me a question</code>. La misma lógica en <code>ask a favour</code>, aunque el favor sí se hace: <code>do me a favour</code>." },

    { type:"mcq",
      es:"Hicimos una fiesta para su cumpleaños.",
      opts:["We did a party for her birthday.","We made a party for her birthday.","We had a party for her birthday.","We celebrated a party for her birthday."],
      ok:2,
      trap:"We made a party for her birthday.",
      why:"Las fiestas se tienen: <code>have a party</code>, o en registro más coloquial <code>throw a party</code>. Y la opción D es un calco de <em>celebrar una fiesta</em>: en inglés <em>celebrate</em> va con lo que se celebra, no con el evento. <code>We celebrated her birthday</code>." },

    { type:"gap",
      es:"Tienes que hacer el examen en junio.",
      text:"You have to ___ the exam in June.",
      answer:["take","sit","do","resit"],
      why:"El examen se coge (<em>take</em>) o se sienta uno a él (<em>sit</em>, muy británico). Lo que no se hace es <em>make</em>. Y guarda el aviso para mañana: **_pass_ no es «hacer», es «aprobar»**. Si dices <code>I passed the exam</code> estás diciendo que lo aprobaste, no que lo hiciste." }

  ]},

  /* ---------------------------------------------------------
     4. Escuchar y hablar
     --------------------------------------------------------- */
  { title: "Escuchar y hablar", items: [

    { type:"listening", mode:"mcq",
      audio:"I'll do my best to get it finished by Friday, but I can't make any promises.",
      question:"How confident is the speaker about the deadline?",
      opts:["He is certain the work will be ready on time.","He has already finished the work.","He will try hard, but he is not guaranteeing it.","He is refusing to do the work at all."],
      ok:2,
      why:"Dos bloques en una frase: <code>do my best</code> (esforzarse al máximo) y <code>make a promise</code> (prometer). Juntos significan «lo intento, pero no me comprometo», que es el registro con el que un inglés dice que no está seguro sin decirlo. Traducido literalmente parecería mucho más firme de lo que es." },

    { type:"speaking", seconds:60,
      prompt:"Cuenta qué haces un sábado normal, de la mañana a la noche. Mete al menos cinco bloques con make, do, take o have.",
      useful:["I usually have…","I do the…","I take…","then I make…","I try to make time for…"],
      model:"On a normal Saturday I get up late and have a big breakfast, which is the one thing I never do during the week. Then I do the shopping, because if I leave it until Sunday the supermarket is impossible. In the afternoon I try to do some exercise, usually a long walk, and I take my camera with me if the weather is good. In the evening we normally have friends over and make dinner together, nothing complicated. If I've had a hard week I don't make any plans at all and just take it easy." }

  ]},

  /* ---------------------------------------------------------
     5. Cierre
     --------------------------------------------------------- */
  { title: "Cierre: todo mezclado", items: [

    { type:"mcq",
      es:"Hazme un favor: no hagas ruido cuando entres.",
      opts:["Make me a favour: don't do noise when you enter.","Do me a favour: don't make any noise when you come in.","Do me a favour: don't do noise when you enter.","Make me a favour: don't make noise when you come in."],
      ok:1,
      trap:"Make me a favour: don't do noise when you enter.",
      why:"El mismo <em>hacer</em> español pide dos verbos distintos en la misma frase: el favor se hace (<code>do me a favour</code>) y el ruido se fabrica (<code>make noise</code>). Y <em>entrar</em> en una habitación es <code>come in</code>: <em>enter</em> existe pero suena a informe de policía." },

    { type:"gap",
      es:"Voy a tomarme un descanso de diez minutos.",
      text:"I'm going to ___ a ten-minute break.",
      answer:["have","take"],
      why:"<code>have a break</code> o <code>take a break</code>, las dos. Fíjate de paso en <em>ten-minute</em>: cuando un número acompaña al sustantivo como adjetivo, **va con guion y en singular**. <span class='bad'>a ten-minutes break</span> es un error muy visible por escrito." },

    { type:"listening", mode:"dictation",
      audio:"Take your time and make sure you've done everything on the list.",
      why:"Tres bloques del día en nueve palabras: <code>take your time</code>, <code>make sure</code> y <code>done everything</code>. Si al escribirlo has dudado en alguno, ese es el que te falta por fijar. Estos tres aparecen a diario en correos de trabajo." }

  ]}

  ]
});
