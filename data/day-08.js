REGISTER_DAY({
  n: 8,
  title: "Present perfect y past simple",
  minutes: 33,

  blocks: [

  /* ---------------------------------------------------------
     1. La regla que lo decide todo
     --------------------------------------------------------- */
  { title: "El tiempo que más te delata", items: [

    { type:"note", title:"El español y el inglés parten el pasado por sitios distintos",
      html:"<p>En español eliges entre <em>he hecho</em> y <em>hice</em> por <b>cuándo</b> pasó: hoy, esta semana y este año piden <em>he hecho</em>; ayer y el año pasado piden <em>hice</em>.</p>" +
           "<p>En inglés la frontera es otra: se elige por <b>si el momento está cerrado o no</b>.</p>" +
           "<table><tr><th></th><th>Present perfect</th><th>Past simple</th></tr>" +
           "<tr><td>Cuándo</td><td>Sin decir cuándo, o en un periodo abierto</td><td>Momento terminado y concreto</td></tr>" +
           "<tr><td>Ejemplo</td><td><code>I've been to Rome</code></td><td><code>I went to Rome in 2019</code></td></tr>" +
           "<tr><td>Idea</td><td>Cuenta para ahora</td><td>Se quedó allí</td></tr></table>" +
           "<p><b>La regla que resuelve el 80% de los casos:</b> si en la frase hay un momento cerrado (<em>yesterday</em>, <em>in 2019</em>, <em>last week</em>, <em>two years ago</em>, <em>when I was ten</em>), va past simple. Sin excepciones, aunque el español use el perfecto.</p>" +
           "<p>Por eso <em>esta mañana he desayunado tarde</em>, dicho por la tarde, es <code>I had breakfast late this morning</code>: la mañana ya se cerró.</p>" },

    { type:"mcq",
      es:"Estuve en Roma en 2019.",
      opts:["I was in Rome in 2019.","I've gone to Rome in 2019.","I am in Rome in 2019.","I've been to Rome in 2019."],
      ok:0,
      trap:"I've been to Rome in 2019.",
      why:"<em>In 2019</em> es un momento cerrado, así que **past simple sin discusión**. Y guarda la diferencia: <code>I've been to</code> significa que fuiste y volviste; <code>I've gone to</code> significa que estás allí ahora y no has vuelto." },

    { type:"mcq",
      es:"¿Alguna vez has probado el sushi?",
      opts:["Are you ever trying sushi?","Do you ever try sushi?","Did you ever try sushi?","Have you ever tried sushi?"],
      ok:3,
      trap:"Did you ever try sushi?",
      why:"Preguntar por una experiencia de toda la vida, sin fijar cuándo, es el uso más puro del present perfect. La marca es <em>ever</em>: pregunta por el periodo abierto que va desde que naciste hasta ahora, y ese periodo no se ha cerrado." },

    { type:"mcq",
      es:"He perdido las llaves. No puedo entrar.",
      opts:["I had lost my keys. I can't get in.","I lost my keys. I can't get in.","I have lost my keys. I can't get in.","I was losing my keys. I can't get in."],
      ok:2,
      trap:"I lost my keys. I can't get in.",
      why:"El present perfect se usa cuando lo pasado **sigue teniendo consecuencia ahora**: las perdí y por eso ahora no entro. La B no está mal escrita, pero cuenta un hecho terminado y desconectado; en inglés americano se acepta más, en el examen se espera el perfecto." },

    { type:"gap",
      es:"Ayer terminé el informe.",
      text:"I ___ the report yesterday.",
      answer:["finished","completed"],
      why:"<em>Yesterday</em> cierra el momento, así que past simple. Este es el hueco donde más cae un hispanohablante, porque en español muchos dicen «ayer he terminado». En inglés esa combinación es imposible: <span class='bad'>I have finished it yesterday</span>." }

  ]},

  /* ---------------------------------------------------------
     2. Been / gone y las marcas del perfecto
     --------------------------------------------------------- */
  { title: "Las marcas que piden perfecto", items: [

    { type:"note", title:"Palabras que arrastran el tiempo verbal detrás",
      html:"<p>Hay marcas que casi siempre traen present perfect, porque describen un periodo que sigue abierto:</p>" +
           "<ul>" +
           "<li><code>ever</code> y <code>never</code> — <em>Have you ever…?</em>, <em>I've never…</em></li>" +
           "<li><code>just</code> — <em>I've just finished</em>, acabo de terminar</li>" +
           "<li><code>already</code> y <code>yet</code> — <em>She's already left</em>, <em>He hasn't arrived yet</em></li>" +
           "<li><code>this week</code>, <code>today</code>, <code>this year</code> — mientras no hayan terminado</li>" +
           "<li><code>so far</code>, <code>up to now</code>, <code>lately</code>, <code>recently</code></li>" +
           "</ul>" +
           "<p>Y una pareja que conviene no mezclar:</p>" +
           "<table><tr><th>Frase</th><th>Significa</th></tr>" +
           "<tr><td><code>She's been to Paris</code></td><td>Fue y ya ha vuelto</td></tr>" +
           "<tr><td><code>She's gone to Paris</code></td><td>Se fue y sigue allí</td></tr></table>" +
           "<p>El español usa <em>ha estado</em> y <em>se ha ido</em>, así que la distinción existe; lo que falla es asociarla al verbo correcto.</p>" },

    { type:"mcq",
      es:"—¿Dónde está Ana? —Se ha ido a Londres.",
      opts:["She's been to London.","She's gone to London.","She went to London.","She's being in London."],
      ok:1,
      trap:"She's been to London.",
      why:"Preguntamos dónde está ahora, así que la respuesta tiene que decir que **sigue fuera**: <code>she's gone</code>. Con <em>she's been</em> estarías diciendo que ya volvió, que es justo lo contrario de lo que la pregunta necesita." },

    { type:"mcq",
      es:"Acabo de hablar con él.",
      opts:["I've just spoken to him.","I am just speaking to him.","I just have spoken to him.","I just spoke with him."],
      ok:0,
      trap:"I just spoke with him.",
      why:"<em>Acabar de</em> es <code>have just + participio</code>, y <em>just</em> va **entre el auxiliar y el participio**, no delante del todo. Fíjate también en que se habla <em>to</em> alguien, aunque <em>speak with</em> se oiga en americano." },

    { type:"gap",
      es:"Nunca he visto esa película.",
      text:"I've ___ seen that film.",
      answer:["never"],
      why:"<em>Never</em> ya es negativo, así que el auxiliar va en afirmativo: <code>I've never seen</code>, nunca <span class='bad'>I haven't never seen</span>. La doble negación del español aquí no se traduce." }

  ]},

  /* ---------------------------------------------------------
     3. Cuando cambia el sentido
     --------------------------------------------------------- */
  { title: "Cuando el tiempo cambia el sentido", items: [

    { type:"note", title:"La misma frase con dos tiempos cuenta dos historias",
      html:"<p>No es una cuestión de estilo: elegir mal cambia lo que entiende quien te escucha.</p>" +
           "<table><tr><th>Frase</th><th>Qué entiende</th></tr>" +
           "<tr><td><code>I lived in Berlin for five years</code></td><td>Ya no vivo allí</td></tr>" +
           "<tr><td><code>I've lived in Berlin for five years</code></td><td>Sigo viviendo allí</td></tr>" +
           "<tr><td><code>Did you see Ana?</code></td><td>En un momento concreto que los dos sabemos</td></tr>" +
           "<tr><td><code>Have you seen Ana?</code></td><td>La estoy buscando ahora</td></tr></table>" +
           "<p>Con biografías de gente viva y muerta pasa igual: <code>Picasso painted…</code> pero <code>My sister has painted…</code>, porque el periodo de tu hermana sigue abierto y el de Picasso está cerrado.</p>" },

    { type:"mcq",
      es:"Trabajo aquí desde hace tres años. (y sigo)",
      opts:["I'm working here for three years.","I work here for three years.","I worked here for three years.","I've worked here for three years."],
      ok:3,
      trap:"I work here for three years.",
      why:"Algo que empezó en el pasado y **sigue pasando** pide present perfect, aunque el español use presente. Con <em>I work here</em> estarías hablando de tu rutina, sin decir desde cuándo, y con <em>I worked</em> darías a entender que ya no trabajas ahí." },

    { type:"mcq",
      es:"Shakespeare escribió 37 obras.",
      opts:["Shakespeare had written 37 plays.","Shakespeare has written 37 plays.","Shakespeare wrote 37 plays.","Shakespeare was writing 37 plays."],
      ok:2,
      trap:"Shakespeare has written 37 plays.",
      why:"Shakespeare no va a escribir más: su periodo está cerrado, así que past simple. La prueba práctica: si el sujeto ya no puede añadir nada a esa cuenta, no cabe el present perfect." },

    { type:"gap",
      es:"—¿Has visto a Marta? —Sí, la vi esta mañana.",
      text:"Have you seen Marta? — Yes, I ___ her this morning.",
      answer:["saw"],
      why:"La pregunta va en perfecto porque la busca ahora, pero la respuesta añade **cuándo**, y ese cuándo ya está cerrado. Es el patrón más común en conversación: se pregunta en perfecto y se responde en pasado simple en cuanto se concreta el momento." }

  ]},

  /* ---------------------------------------------------------
     4. Lectura
     --------------------------------------------------------- */
  { title: "Leer sin traducir", items: [

    { type:"reading",
      title:"The shop that refuses to grow",
      text:[
        "There is a hardware shop on a side street in Leeds that has been run by the same family since 1911. It has never had a website, it does not deliver, and it closes at one o'clock on Wednesdays for reasons nobody under sixty fully understands.",
        "By every measure taught in business schools, it should have disappeared decades ago. Three national chains have opened branches within a mile of it since 1990. Two of them have already closed.",
        "Ivy Marsden, who took over from her father in 1998, has heard the question about the website so many times that she now answers it before it is asked. 'People think I'm sentimental,' she says. 'I'm not. I've done the arithmetic. If I sell online I need a warehouse, and if I need a warehouse I need to sell four times as much, and to sell four times as much I need to stop knowing what people are doing with the things they buy.'",
        "That last point is the one she considers decisive. When a customer asks for a particular screw, Marsden asks what it is for, and roughly a third of the time she sells them something cheaper than what they came in for, or nothing at all. She has calculated that this costs her about eleven thousand pounds a year in lost sales. She has also calculated, less precisely, that it is why the shop has survived four recessions.",
        "The chains cannot copy it. A shop assistant on a nine-month contract has no reason to learn what a customer is building, and no authority to talk them out of a purchase. 'They're not worse than me,' she says, without much charity. 'They're just newer, every year, for ever.'",
        "Marsden is sixty-four and has no children. She has spent the last three years training a former customer who came in one day to buy a hinge and mentioned he had been made redundant. Whether that counts as a succession plan or an accident is, she admits, a matter of interpretation."
      ],
      glossary:[
        {w:"hardware shop", d:"ferretería"},
        {w:"branch", d:"sucursal"},
        {w:"take over", d:"hacerse cargo"},
        {w:"screw", d:"tornillo"},
        {w:"talk somebody out of", d:"disuadir a alguien de"},
        {w:"recession", d:"crisis económica"},
        {w:"hinge", d:"bisagra"},
        {w:"be made redundant", d:"ser despedido por reducción de plantilla"},
        {w:"succession plan", d:"plan de relevo"}
      ],
      questions:[
        { q:"What does the writer say about the three national chains?",
          opts:[
            "All of them are still trading near the shop.",
            "Two of them have gone out of business.",
            "They opened before Marsden took over the shop.",
            "They forced the shop to change its opening hours."
          ],
          ok:1,
          why:"<em>Two of them have already closed</em>. Fíjate en el tiempo verbal: present perfect con <em>already</em>, porque el periodo sigue abierto y la tercera podría cerrar también. La C juega con las fechas: las cadenas llegaron desde 1990 y ella tomó el relevo en 1998, así que al menos algunas fueron antes." },

        { q:"Why does Marsden reject the idea of selling online?",
          opts:[
            "Growing would force her to lose contact with what customers need.",
            "Her father made her promise not to change the business.",
            "She feels a sentimental attachment to the old way of working.",
            "She has never understood how websites work."
          ],
          ok:0,
          why:"Ella misma desmonta lo sentimental: <em>I'm not. I've done the arithmetic</em>. La cadena de razonamiento acaba en dejar de saber qué hace la gente con lo que compra, y eso es lo que no quiere perder. La C es el distractor más fuerte porque el texto la nombra para negarla." },

        { q:"What does Marsden do about a third of the time?",
          opts:[
            "She refuses to serve customers who cannot explain their project.",
            "She orders a special part from a supplier.",
            "She charges less than the price on the label.",
            "She recommends something cheaper, or nothing at all."
          ],
          ok:3,
          why:"Pregunta qué van a hacer con la pieza y acaba vendiendo algo más barato o nada. La C suena parecida pero es otra cosa: rebajar el precio no es vender un producto distinto." },

        { q:"What is her attitude towards the staff in the chain stores?",
          opts:[
            "She thinks they are badly trained and careless.",
            "She blames them for the decline of small shops.",
            "She considers them no worse, but structurally unable to do her job.",
            "She has tried to hire several of them."
          ],
          ok:2,
          why:"<em>They're not worse than me. They're just newer, every year, for ever</em>. El problema no es la persona sino el contrato de nueve meses. El texto añade <em>without much charity</em>, que despista: el tono es seco, pero el juicio no es sobre su calidad." },

        { q:"What does the last paragraph suggest about the future of the shop?",
          opts:[
            "Marsden has decided to close it when she retires.",
            "Her successor arrived by chance rather than by design.",
            "She is training one of her own children to take over.",
            "She has already sold the business to a former customer."
          ],
          ok:1,
          why:"Un cliente entró a comprar una bisagra, contó que lo habían despedido, y tres años después es su aprendiz. Ella misma duda de si llamarlo plan o accidente. La D confunde formar a alguien con venderle el negocio." }
      ]
    }

  ]},

  /* ---------------------------------------------------------
     5. Cierre
     --------------------------------------------------------- */
  { title: "Cierre: todo mezclado", items: [

    { type:"order",
      es:"Nunca he trabajado en una empresa tan grande.",
      words:["I","have","never","worked","for","such","a","big","company"],
      trap:"I have never worked in a company so big.",
      why:"Tres cosas a la vez: <em>never</em> entre el auxiliar y el participio, el adjetivo delante del sustantivo, y <code>such a + adjetivo + sustantivo</code> para el «tan» del español. Y se trabaja **for** una empresa, no <em>in</em>." },

    { type:"mcq",
      es:"El mes pasado cambié de trabajo y todavía no me he acostumbrado.",
      opts:["Last month I changed jobs and I still haven't got used to it.","Last month I changed jobs and I still don't get used to it.","Last month I've changed jobs and I don't still get used to it.","Last month I've changed jobs and I still haven't got used to it."],
      ok:0,
      trap:"Last month I've changed jobs and I still haven't got used to it.",
      why:"Los dos tiempos conviven en la misma frase y cada uno por su motivo: <em>last month</em> cierra el momento y pide pasado simple; <em>still</em> con negativa describe algo que sigue sin pasar y pide perfecto. Cambiar uno de los dos rompe la frase entera." },

    { type:"listening", mode:"dictation",
      audio:"I've lived here for ten years, but I only learnt the language last summer.",
      why:"La frase entera es el resumen del día: <em>I've lived</em> porque sigue viviendo aquí, y <em>I learnt</em> porque <em>last summer</em> está cerrado. Si al escribirla has puesto los dos en el mismo tiempo, ahí tienes lo que hay que practicar." }

  ]}

  ]
});
