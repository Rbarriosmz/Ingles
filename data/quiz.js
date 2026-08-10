/* =========================================================
   Banco de preguntas rápidas

   Diez preguntas por tema, pensadas para responder en unos
   diez segundos: enunciado corto, cuatro opciones y una
   explicación de una línea.

   El motor también saca preguntas de las lecciones y de los
   simulacros ya escritos, pero esas son largas. Estas están
   hechas a propósito para el reloj.

   Añadir un tema es añadir una clave a este objeto, siempre
   que la etiqueta exista en tagNames de curriculum.js.
   ========================================================= */

REGISTER_QUIZ({

/* ---------------------------------------------------------
   Orden de las palabras
   --------------------------------------------------------- */
'word-order': [
  { q:"Un coche rojo", opts:["a car red","a red car","red a car","a car of red"], ok:1,
    why:"El adjetivo va siempre delante del sustantivo." },
  { q:"Siempre llego tarde", opts:["Always I arrive late","I arrive always late","I always arrive late","I arrive late always"], ok:2,
    why:"El adverbio de frecuencia se mete entre el sujeto y el verbo." },
  { q:"Estoy siempre cansado", opts:["I always am tired","I am always tired","Always I am tired","I am tired always"], ok:1,
    why:"Con <em>to be</em> el adverbio va detrás, no delante." },
  { q:"Hablo inglés bien", opts:["I speak well English","I well speak English","I speak English well","Well I speak English"], ok:2,
    why:"Nunca se mete nada entre el verbo y su objeto." },
  { q:"Una casa blanca pequeña", opts:["a white small house","a small white house","a house small and white","a small and white house"], ok:1,
    why:"El tamaño va antes que el color, y sin <em>and</em>." },
  { q:"Fuimos a Roma el año pasado", opts:["We went last year to Rome","We went to Rome last year","Last year went we to Rome","We to Rome went last year"], ok:1,
    why:"Al final de la frase: primero el lugar, después el tiempo." },
  { q:"Le di el libro a Ana", opts:["I gave to Ana the book","I gave the book Ana","I gave Ana the book","I gave to Ana book"], ok:2,
    why:"Con dos objetos, la persona va primero y sin preposición." },
  { q:"Son problemas difíciles", opts:["They're difficults problems","They're difficult problems","They're problems difficult","They're problem difficults"], ok:1,
    why:"El adjetivo inglés no tiene plural nunca." },
  { q:"Me gusta mucho esta película", opts:["I like very much this film","I like this film very much","I very much like this film","I like much this film"], ok:1,
    why:"<em>Very much</em> va al final, no entre verbo y objeto." },
  { q:"Ayer vi a Marta", opts:["Yesterday saw I Marta","I saw yesterday Marta","I saw Marta yesterday","Yesterday I saw to Marta"], ok:2,
    why:"Sujeto, verbo, objeto y luego el tiempo. Y sin la <em>a</em> personal." }
],

/* ---------------------------------------------------------
   Sujeto obligatorio
   --------------------------------------------------------- */
'subject': [
  { q:"Llueve mucho aquí", opts:["Rains a lot here","It rains a lot here","There rains a lot here","Is raining a lot here"], ok:1,
    why:"El tiempo atmosférico va con <em>it</em>." },
  { q:"Tengo 30 años", opts:["I have 30 years","I have 30 years old","I'm 30 years old","I've got 30 years"], ok:2,
    why:"La edad se es, no se tiene." },
  { q:"Hay mucha gente", opts:["There is a lot of people","There are a lot of people","Have a lot of people","It has a lot of people"], ok:1,
    why:"<em>People</em> es plural: pide <em>are</em>." },
  { q:"Es difícil aparcar", opts:["Is difficult to park","It's difficult to park","There is difficult to park","It's difficult park"], ok:1,
    why:"<code>it's + adjetivo + to + verbo</code>." },
  { q:"Tengo frío", opts:["I have cold","I have a cold","I'm cold","It's cold to me"], ok:2,
    why:"<em>I have a cold</em> sería que estás resfriado." },
  { q:"Son las nueve", opts:["Are the nine","It's nine o'clock","There are nine","It has nine"], ok:1,
    why:"La hora siempre con <em>it</em> y en singular." },
  { q:"Había tres personas", opts:["There was three people","There were three people","It had three people","Had three people"], ok:1,
    why:"Pasado de <em>hay</em> en plural: <em>there were</em>." },
  { q:"Tienes razón", opts:["You have reason","You have right","You're right","You have the reason"], ok:2,
    why:"<em>Reason</em> es motivo, no acierto." },
  { q:"No hay leche", opts:["There isn't milk","There aren't milk","Hasn't milk","It hasn't milk"], ok:0,
    why:"<em>Milk</em> es incontable: verbo en singular." },
  { q:"Hace mucho calor", opts:["It does a lot of heat","It's very hot","There is very hot","It makes a lot of hot"], ok:1,
    why:"El <em>hacer</em> del tiempo no se traduce." }
],

/* ---------------------------------------------------------
   Artículos
   --------------------------------------------------------- */
'article': [
  { q:"Los perros son leales", opts:["The dogs are loyal","Dogs are loyal","A dogs are loyal","The dog are loyal"], ok:1,
    why:"Hablando en general, sin artículo y en plural." },
  { q:"Hablo inglés", opts:["I speak the English","I speak English","I speak a English","I speak an English"], ok:1,
    why:"Los idiomas nunca llevan artículo." },
  { q:"Voy al trabajo en tren", opts:["I go to the work in train","I go to work by train","I go to work in the train","I go to the work by train"], ok:1,
    why:"<em>Work</em> sin artículo, transporte con <em>by</em>." },
  { q:"Tardo una hora", opts:["It takes me a hour","It takes me an hour","I take an hour","It takes me one hour"], ok:1,
    why:"La <em>h</em> es muda, así que suena a vocal: <em>an</em>." },
  { q:"Es una universidad americana", opts:["It's a American university","It's an American university","It's the American university","It's American university"], ok:1,
    why:"El artículo mira a la palabra que va justo detrás." },
  { q:"Soy profesor", opts:["I'm teacher","I'm a teacher","I'm the teacher","I am one teacher"], ok:1,
    why:"Un contable en singular no puede ir desnudo." },
  { q:"La vida es cara", opts:["The life is expensive","Life is expensive","A life is expensive","Lifes are expensive"], ok:1,
    why:"Los abstractos en general van sin artículo." },
  { q:"El desayuno es a las ocho", opts:["The breakfast is at eight","Breakfast is at eight","Breakfast is at the eight","A breakfast is at eight"], ok:1,
    why:"Las comidas, sin artículo. Y las horas tampoco lo llevan." },
  { q:"Es el mejor del barrio", opts:["It's the best of the neighbourhood","It's the best in the neighbourhood","It's best in the neighbourhood","It's the better of the neighbourhood"], ok:1,
    why:"El superlativo va con <em>in</em>, no con <em>of</em>." },
  { q:"Necesito un consejo", opts:["I need an advice","I need advices","I need some advice","I need a advice"], ok:2,
    why:"<em>Advice</em> es incontable: ni <em>an</em> ni plural." }
],

/* ---------------------------------------------------------
   Colocaciones: make, do, take, have
   --------------------------------------------------------- */
'collocation': [
  { q:"Tomar una decisión", opts:["take a decision","make a decision","do a decision","have a decision"], ok:1,
    why:"Una decisión se fabrica: <em>make</em>." },
  { q:"Cometer un error", opts:["do a mistake","commit a mistake","make a mistake","have a mistake"], ok:2,
    why:"<em>Commit</em> se reserva para delitos." },
  { q:"Hacer la compra", opts:["make the shopping","do the shopping","take the shopping","have the shopping"], ok:1,
    why:"Las tareas rutinarias van con <em>do</em>." },
  { q:"Hacer una foto", opts:["make a photo","do a photo","take a photo","have a photo"], ok:2,
    why:"Las fotos se cogen: <em>take</em>." },
  { q:"Darse una ducha", opts:["give a shower","have a shower","do a shower","make a shower"], ok:1,
    why:"En británico la ducha se tiene; en americano se coge." },
  { q:"Hacer una pregunta", opts:["make a question","do a question","ask a question","put a question"], ok:2,
    why:"Las preguntas se preguntan, no se hacen." },
  { q:"Hacer una fiesta", opts:["do a party","make a party","have a party","celebrate a party"], ok:2,
    why:"<em>have a party</em>, o <em>throw a party</em>." },
  { q:"Hacer un esfuerzo", opts:["make an effort","do an effort","take an effort","have an effort"], ok:0,
    why:"<em>make an effort</em>, bloque cerrado." },
  { q:"Echar un vistazo", opts:["throw a look","have a look","do a look","make a look"], ok:1,
    why:"El <em>echar</em> español no se traduce." },
  { q:"Tomarse un descanso", opts:["make a break","do a break","take a break","give a break"], ok:2,
    why:"<em>take a break</em> o <em>have a break</em>." }
],

/* ---------------------------------------------------------
   Falsos amigos
   --------------------------------------------------------- */
'false-friend': [
  { q:"Actualmente trabajo aquí", opts:["Actually I work here","I currently work here","I actually work here","At the actuality I work here"], ok:1,
    why:"<em>Actually</em> es «en realidad»." },
  { q:"Asistí a la reunión", opts:["I assisted the meeting","I attended the meeting","I assisted to the meeting","I attended to the meeting"], ok:1,
    why:"<em>Assist</em> es ayudar. Y <em>attend</em> no lleva <em>to</em>." },
  { q:"Me di cuenta", opts:["I realised","I realised of it","I gave myself account","I noticed me"], ok:0,
    why:"<em>Realise</em> no lleva preposición." },
  { q:"Es muy sensata", opts:["She's very sensitive","She's very sensible","She's very sensate","She's very sensual"], ok:1,
    why:"<em>Sensible</em> es sensato; <em>sensitive</em> es sensible." },
  { q:"No soporto esto", opts:["I don't support this","I can't support this","I can't stand this","I don't hold this"], ok:2,
    why:"<em>Support</em> es apoyar." },
  { q:"Hablamos del presupuesto", opts:["We discussed about the budget","We discussed the budget","We argued the budget","We discussed on the budget"], ok:1,
    why:"<em>Discuss</em> no lleva <em>about</em>." },
  { q:"Fingió estar enfermo", opts:["He pretended to be ill","He intended to be ill","He pretended being ill","He tried to be ill"], ok:0,
    why:"<em>Pretend</em> es fingir; pretender es <em>intend</em>." },
  { q:"Voy a la librería", opts:["I'm going to the library","I'm going to the bookshop","I'm going to the bookstore library","I'm going to the librery"], ok:1,
    why:"<em>Library</em> es biblioteca." },
  { q:"Me da vergüenza", opts:["It gives me shame","I have shame","I'm embarrassed","I'm embarrassing"], ok:2,
    why:"Y ojo: <em>embarazada</em> es <em>pregnant</em>." },
  { q:"Al final lo consiguió", opts:["Eventually he managed it","Actually he managed it","Finally he could it","At the end he managed it"], ok:0,
    why:"<em>Eventually</em> sí es «al final, con el tiempo»." }
],

/* ---------------------------------------------------------
   Preguntas y negaciones
   --------------------------------------------------------- */
'question': [
  { q:"¿Trabajas los sábados?", opts:["Work you on Saturdays?","Do you work on Saturdays?","Does you work on Saturdays?","You work on the Saturdays?"], ok:1,
    why:"La pregunta necesita el auxiliar <em>do</em>." },
  { q:"¿Dónde fuiste ayer?", opts:["Where did you went?","Where you went?","Where did you go?","Where went you?"], ok:2,
    why:"Si está <em>did</em>, el verbo va en infinitivo." },
  { q:"No entiendo", opts:["I not understand","I no understand","I don't understand","I doesn't understand"], ok:2,
    why:"La negación también pide auxiliar." },
  { q:"¿Sabes dónde está?", opts:["Do you know where is it?","Do you know where it is?","You know where is it?","Do you know where does it is?"], ok:1,
    why:"La pregunta incrustada vuelve al orden normal." },
  { q:"¿Cuánto cuesta?", opts:["How much costs?","How much it costs?","How much does it cost?","How much does cost?"], ok:2,
    why:"Hace falta el auxiliar y el sujeto <em>it</em>." },
  { q:"¿Quién te llamó?", opts:["Who did call you?","Who called you?","Who you called?","Who did you called?"], ok:1,
    why:"Si <em>who</em> es el sujeto, no hay auxiliar." },
  { q:"¿Con quién hablabas?", opts:["With who you talked?","Who were you talking to?","To who were you talking?","Who you were talking with?"], ok:1,
    why:"La preposición se queda al final." },
  { q:"—¿Te gustó? —Sí", opts:["Yes, I liked","Yes, I did","Yes, I do","Yes, I am"], ok:1,
    why:"La respuesta corta repite el auxiliar." },
  { q:"Me preguntó dónde vivía", opts:["She asked me where did I live","She asked to me where I lived","She asked me where I lived","She asked me where lived I"], ok:2,
    why:"Sin auxiliar dentro, y <em>ask</em> sin <em>to</em>." },
  { q:"¿A qué hora sale?", opts:["What time it leaves?","What time does it leave?","What time does it leaves?","What time leaves it?"], ok:1,
    why:"El auxiliar se queda la <em>-s</em> de tercera persona." }
],

/* ---------------------------------------------------------
   Preposiciones
   --------------------------------------------------------- */
'preposition': [
  { q:"Depende de ti", opts:["It depends of you","It depends on you","It depends from you","It depends in you"], ok:1,
    why:"<em>depend on</em>, siempre." },
  { q:"Se me da mal", opts:["I'm bad in it","I'm bad at it","I'm bad on it","I'm bad with it"], ok:1,
    why:"<em>good at</em> y <em>bad at</em>." },
  { q:"Llegué a Madrid", opts:["I arrived to Madrid","I arrived at Madrid","I arrived in Madrid","I arrived Madrid"], ok:2,
    why:"Ciudades y países con <em>in</em>; sitios pequeños con <em>at</em>." },
  { q:"El lunes", opts:["in Monday","at Monday","on Monday","the Monday"], ok:2,
    why:"Los días llevan <em>on</em>." },
  { q:"Estoy interesado en esto", opts:["interested on this","interested in this","interested for this","interested about this"], ok:1,
    why:"<em>interested in</em>." },
  { q:"Voy en autobús", opts:["I go in bus","I go by bus","I go on bus","I go with bus"], ok:1,
    why:"Transporte con <em>by</em> y sin artículo." },
  { q:"Estoy buscando las llaves", opts:["I'm looking the keys","I'm searching the keys","I'm looking for the keys","I'm looking to the keys"], ok:2,
    why:"<em>look for</em> es buscar." },
  { q:"La razón de esto", opts:["the reason of this","the reason for this","the reason to this","the reason by this"], ok:1,
    why:"<em>reason for</em>." },
  { q:"Escucha esto", opts:["Listen this","Listen at this","Listen to this","Hear to this"], ok:2,
    why:"<em>listen to</em> siempre lleva <em>to</em>." },
  { q:"Durante dos horas", opts:["during two hours","for two hours","by two hours","in two hours"], ok:1,
    why:"<em>for</em> mide duración; <em>during</em> dice cuándo." }
],

/* ---------------------------------------------------------
   Phrasal verbs
   --------------------------------------------------------- */
'phrasal': [
  { q:"Nos quedamos sin leche", opts:["We ran out of milk","We ran of milk","We got out of milk","We ended milk"], ok:0,
    why:"<em>run out of</em>." },
  { q:"Apágalo", opts:["Turn off it","Turn it off","Off turn it","Turn it of"], ok:1,
    why:"Con pronombre, el phrasal se separa." },
  { q:"Me rendí", opts:["I gave up","I gave me up","I gave up me","I got up"], ok:0,
    why:"<em>give up</em> es rendirse." },
  { q:"Cuidar de alguien", opts:["look after someone","look for someone","look at someone","look up someone"], ok:0,
    why:"<em>look after</em> es cuidar." },
  { q:"Cancelaron el partido", opts:["They called the match","They called off the match","They put off the match to nothing","They cut the match"], ok:1,
    why:"<em>call off</em> es cancelar." },
  { q:"Me levanto a las siete", opts:["I wake up at seven","I get up at seven","I stand up at seven","I raise at seven"], ok:1,
    why:"<em>wake up</em> es despertarse; <em>get up</em>, levantarse." },
  { q:"Búscalo en el diccionario", opts:["Look it for","Look for it up","Look it up","Look up it"], ok:2,
    why:"<em>look up</em> separable: el pronombre va en medio." },
  { q:"Se me ocurrió una idea", opts:["I came up with an idea","I came with an idea","I came up an idea","I got up an idea"], ok:0,
    why:"<em>come up with</em> es ocurrírsele a uno." },
  { q:"Se llevan bien", opts:["They get on well","They get well","They take on well","They go on well"], ok:0,
    why:"<em>get on with someone</em>." },
  { q:"Lo dejé (un hábito)", opts:["I gave it out","I left it up","I gave it up","I put it up"], ok:2,
    why:"<em>give up</em> también para dejar un vicio." }
],

/* ---------------------------------------------------------
   Tiempos verbales
   --------------------------------------------------------- */
'tense': [
  { q:"Vivo aquí desde 2019", opts:["I live here since 2019","I'm living here since 2019","I've lived here since 2019","I lived here since 2019"], ok:2,
    why:"Algo que sigue pasando: present perfect." },
  { q:"Trabajo aquí desde hace dos años", opts:["I work here for two years","I've worked here for two years","I'm working here for two years","I worked here for two years"], ok:1,
    why:"<em>for</em> mide la duración; el tiempo es perfecto." },
  { q:"Estuve en Roma en 2019", opts:["I've been to Rome in 2019","I was in Rome in 2019","I've gone to Rome in 2019","I am in Rome in 2019"], ok:1,
    why:"Con fecha cerrada, past simple." },
  { q:"Todavía no ha llegado", opts:["He hasn't arrived yet","He hasn't arrived still","He didn't arrive yet","He doesn't arrive yet"], ok:0,
    why:"<em>yet</em> en negativa va al final." },
  { q:"Mañana veo a Ana (cita hecha)", opts:["I will see Ana tomorrow","I'm seeing Ana tomorrow","I see Ana tomorrow","I'm going to see Ana tomorrow"], ok:1,
    why:"Planes cerrados: presente continuo." },
  { q:"Va a llover (nubes negras)", opts:["It will rain","It's going to rain","It rains","It would rain"], ok:1,
    why:"Con pruebas a la vista: <em>going to</em>." },
  { q:"Te llamo luego (decidido ahora)", opts:["I'm calling you later","I call you later","I'll call you later","I'm going to call you later"], ok:2,
    why:"Decisión del momento: <em>will</em>." },
  { q:"Cuando llegue, te aviso", opts:["When he will arrive, I'll tell you","When he arrives, I'll tell you","When he arrive, I tell you","When he'll arrive, I tell you"], ok:1,
    why:"Detrás de <em>when</em> no va futuro." },
  { q:"Llevo una hora esperando", opts:["I wait for an hour","I'm waiting for an hour","I've been waiting for an hour","I waited for an hour"], ok:2,
    why:"Present perfect continuo para lo que sigue en curso." },
  { q:"Ya había salido cuando llegué", opts:["He already left when I arrived","He had already left when I arrived","He has already left when I arrived","He was already leaving when I arrived"], ok:1,
    why:"Lo anterior a otro pasado: past perfect." }
],

/* ---------------------------------------------------------
   Formación de palabras
   --------------------------------------------------------- */
'word-formation': [
  { q:"DECIDE → sustantivo", opts:["decidement","decision","deciding","decidance"], ok:1,
    why:"<em>decide → decision</em>." },
  { q:"ABLE → sustantivo", opts:["ableness","ability","abilement","abling"], ok:1,
    why:"Pierde <em>-le</em> y coge <em>-ility</em>." },
  { q:"CARE → adjetivo negativo", opts:["uncareful","careless","discareful","incareful"], ok:1,
    why:"El sufijo <em>-less</em> ya es el negativo." },
  { q:"SURPRISE → adverbio", opts:["surprisely","surprisedly","surprisingly","surprisement"], ok:2,
    why:"<em>surprise → surprising → surprisingly</em>." },
  { q:"POSSIBLE → negativo", opts:["unpossible","impossible","dispossible","nonpossible"], ok:1,
    why:"Delante de <em>p</em>, el negativo es <em>im-</em>." },
  { q:"INFORM → sustantivo", opts:["informations","informing","information","informment"], ok:2,
    why:"Y es incontable: nunca <em>informations</em>." },
  { q:"SUCCESS → adjetivo", opts:["successive","successful","successing","successous"], ok:1,
    why:"<em>Successive</em> significa consecutivo, otra cosa." },
  { q:"STRONG → sustantivo", opts:["strongness","strongth","strength","strongity"], ok:2,
    why:"Cambia la raíz: <em>strong → strength</em>." },
  { q:"AGREE → sustantivo", opts:["agreeness","agreement","agreation","agreeance"], ok:1,
    why:"<em>-ment</em> sobre el verbo entero." },
  { q:"HAPPY → sustantivo negativo", opts:["unhappyness","unhappiness","inhappiness","dishappiness"], ok:1,
    why:"La <em>y</em> pasa a <em>i</em> antes de <em>-ness</em>." }
],

/* ---------------------------------------------------------
   Contables e incontables
   --------------------------------------------------------- */
'countable': [
  { q:"Una buena noticia", opts:["a good news","a good new","some good news","good newses"], ok:2,
    why:"<em>News</em> es incontable pese a la <em>-s</em>." },
  { q:"Mucha gente", opts:["many people","much people","a lot of peoples","much peoples"], ok:0,
    why:"<em>People</em> es contable y plural." },
  { q:"Poco dinero", opts:["few money","a few money","little money","a little moneys"], ok:2,
    why:"<em>Money</em> es incontable: <em>little</em>." },
  { q:"Demasiado ruido", opts:["too many noise","too much noise","too many noises here","too much noises"], ok:1,
    why:"<em>Noise</em> incontable: <em>much</em>." },
  { q:"Dos rebanadas de pan", opts:["two breads","two slices of bread","two pieces of breads","two loafs of breads"], ok:1,
    why:"Los incontables necesitan envase." },
  { q:"Un mueble", opts:["a furniture","one furniture","a piece of furniture","a furnitures"], ok:2,
    why:"<em>Furniture</em> no se cuenta." },
  { q:"¿Cuántos consejos te dio?", opts:["How many advices","How much advice","How many advice","How much advices"], ok:1,
    why:"<em>Advice</em> incontable: <em>how much</em>." },
  { q:"El equipaje", opts:["the luggages","the luggage","a luggage","many luggages"], ok:1,
    why:"<em>Luggage</em> siempre en singular." },
  { q:"Pocos amigos", opts:["little friends","a little friends","few friends","much friends"], ok:2,
    why:"Contable: <em>few</em>, no <em>little</em>." },
  { q:"Los deberes", opts:["the homeworks","a homework","the homework","many homeworks"], ok:2,
    why:"<em>Homework</em> es incontable." }
]

});
