/* =========================================================
   La Trampa — cuentas

   Aquí NO hay contraseñas en claro: solo el SHA-256 con sal,
   iterado 12.000 veces. Aun así, recuerda lo que dice la
   cabecera de assets/auth.js: esto es una cerradura para
   separar perfiles, no un sistema de seguridad. La web es
   estática y no hay servidor que valide nada.

   ---------------------------------------------------------
   PARA CAMBIAR UNA CONTRASEÑA O AÑADIR UNA CUENTA
   ---------------------------------------------------------
   1. Abre la web y pulsa F12 para ver la consola.
   2. Escribe:

        LT_AUTH.hash("la-contraseña-nueva")

   3. Copia la cadena de 64 caracteres que devuelve y pégala
      en el campo `hash` de la cuenta correspondiente.
   4. Guarda, haz commit y push.

   Si cambias `salt` o `rounds`, todos los hashes existentes
   dejan de valer y hay que regenerarlos.

   El progreso de cada cuenta vive en localStorage bajo la
   clave `latrampa.v1.<id>`. Cambiar el `id` de una cuenta
   equivale a empezar de cero: el progreso anterior sigue
   guardado bajo el id viejo, pero deja de leerse.
   ========================================================= */

window.USERS = {

  salt: "la-trampa/2026/rbarriosmz",
  rounds: 12000,

  list: [

    { id: "adm1",
      name: "adm1",
      hash: "08c1c6dda0f24dfe7338c447026bc7f301a23b54c03b8f161a70a72c296009f3" },

    { id: "adm2",
      name: "adm2",
      hash: "4e61a5ef24897daafdd3b9e83aaecf3202b5568537b056da503b8a52779afc8a" }

  ]

};
