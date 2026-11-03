
// PERDIDA-DE-CONTRASEÑA.HTML

const formulario = document.getElementById("formularioparaCanbiarloconHarina");
const contactoInput = document.getElementById("contactomaria");
const contactoInputplatano = document.getElementById("arrozquesoBanano");
const lequieroPonerundisplaynone = document.getElementById("loquiroAquinoescuchasloca"); 
const paraquitarloRemplazarlo =document.getElementById("otroCOTENEDORotroContenido")

contactoInput.addEventListener("input", () => {

    const contacto = contactoInput.value.trim();
    const esCorreo = contacto.includes("@") && contacto.includes(".");
    const esCelular = /^3\d{9}$/.test(contacto);
    if (esCorreo || esCelular) {
        contactoInput.style.border = "";
    } else {
        contactoInput.style.border = "2px solid red";
    }
});

// ENVIAR FORMULARIO
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();


   //COMPROBAR SI YA EXISTE UNA PERSONA
    const usuarioLogueado45 = JSON.parse(localStorage.getItem("usuarioLogueado")|| "null");
    const usuarioRegistrado23  = JSON.parse(localStorage.getItem("usuarioRegistrado")|| "null");
    
     if (usuarioRegistrado23 !== null || usuarioLogueado45 !== null) { 
        contactoInputplatano.textContent = "Ya existe una persona registrada o ingresada. Debe cerrar sesión primero."; 
        setTimeout(() => {
             contactoInputplatano.textContent = "";
             }, 5000); 
             return;
          }

    const contacto = contactoInput.value.trim();
    // VALIDACIONES
    // Validar correo
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validar celular colombiano de 10 dígitos
    const celularValido = /^3\d{9}$/;


    // COMPROBAR SI ES CORREO O CELULAR
    if (!correoValido.test(contacto) && !celularValido.test(contacto)) {
        contactoInput.style.border = "2px solid red";
        contactoInputplatano.textContent =
            "Ingresa un correo electrónico o un número de celular válido.";
        contactoInput.focus();
        setTimeout(() => {
            contactoInputplatano.textContent = "";
        }, 5000);

        return;
    }

    // SI LLEGAMOS AQUÍ, EL FORMATO ES CORRECTO
    contactoInput.style.border = "";
    console.log("Contacto válido:", contacto);
    
    // FETCH AL BACKEND
    try {

        const respuesta = await fetch("http://localhost:3000/api/perdida-clave", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contacto: contacto
            })

        });

        const resultado = await respuesta.json();
        console.log("Respuesta del servidor:", resultado);
       
        // SI EL SERVIDOR DEVUELVE ERROR
        if (!respuesta.ok) {
            contactoInputplatano.textContent = resultado.mensaje || "No fue posible procesar la solicitud.";
            setTimeout(() => {
            contactoInputplatano.textContent = "";
           }, 5000);
           return;
        }

        // RESPUESTA CORRECTA
        console.log("Código enviado correctamente");
        formulario.classList.add("nuevocambioparamiscontenedorDigito");
        lequieroPonerundisplaynone.classList.remove("nuevocambioparamiscontenedorDigito");
        // Guardar el contacto para poder utilizarlo al verificar el OTP
         localStorage.setItem("contactoRecuperacion", contacto);
       
        // Aquí después podemos mostrar el contenedor
        // donde están los 6 dígitos.

    } catch (error) {

        console.error("Error al hacer fetch:", error);

        contactoInputplatano.textContent = "Ocurrió un inconveniente. Por favor, inténtalo nuevamente.";
        setTimeout(() => {
            contactoInputplatano.textContent = "";
        }, 5000);

        return;
    }

});










// aqui va todo el js script de los digitos para ingresar y validar pormedio de correo o numero telefonico  

// Párrafo donde mostraremos los mensajes de error
const parrafoartemoLOCO = document.getElementById("arrozquesoBanano");

// Los 4 cuadritos donde el usuario escribe el OTP
const digitos12 = document.querySelectorAll(".digito");


// Recorrer cada uno de los cuadritos
digitos12.forEach( (input, index) => {

    // Cuando el usuario escriba un número
    input.addEventListener("input",  async function  () {

        // Permitir solamente números
        this.value = this.value.replace(/[^0-9]/g, "");


        // Pasar automáticamente al siguiente cuadrito
        if (
            this.value !== "" &&
            index < digitos12.length - 1
        ) {
            digitos12[index + 1].focus();
        }


        // Comprobar si todos los cuadritos están llenos
        const todosLlenos = Array.from(digitos12)
            .every(input => input.value !== "");


        // Si los 4 cuadritos están llenos
        if (todosLlenos) {

            // Juntar los 4 números
            const otp = Array.from(digitos12)
                .map(input => input.value)
                .join("");


            console.log("OTP completo:", otp);

            // Limpiar mensaje anterior
            parrafoartemoLOCO.textContent = "";


            try {

                const contacto = localStorage.getItem("contactoRecuperacion");
                // Enviar el OTP a Express
                const respuesta = await fetch(
                    "http://localhost:3000/api/verificar-otp",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            contacto: contacto,
                            otp: otp
                        })
                    }
                );


                // Convertir la respuesta de Express a JSON
                const resultado = await respuesta.json();


                console.log("Respuesta de Express:", resultado);


                // Si el OTP es correcto
                if (respuesta.ok) {
                  // Guardamos temporalmente el ID del usuario
                 // que Express nos devuelve después de verificar el OTP
                  sessionStorage.setItem("usuarioRecuperacionId", resultado.usuarioId );
                  parrafoartemoLOCO.style.color = "green";
                
                  lequieroPonerundisplaynone.classList.add("nuevocambioparamiscontenedorDigito");
                  paraquitarloRemplazarlo.classList.remove("nuevocambioparamiscontenedorDigito");
                    // Aquí después podemos mostrar
                    // el formulario para cambiar la contraseña.

                }


                // Si el OTP es incorrecto o expiró
                else {

                    parrafoartemoLOCO.textContent =
                        resultado.mensaje ||
                        "El código es incorrecto o ha expirado.";

                    parrafoartemoLOCO.style.color = "red";


                    // Vaciar los 4 cuadritos
                    digitos12.forEach(input => {
                        input.value = "";
                    });


                    // Volver al primer cuadrito
                    digitos12[0].focus();
                }


            } catch (error) {

                console.error(
                    "Error al verificar el OTP:",
                    error
                );


                parrafoartemoLOCO.textContent =
                    "No pudimos verificar el código.";

                parrafoartemoLOCO.style.color = "red";
            }
        }
    });


    // Controlar la tecla Backspace
    input.addEventListener("keydown", function(e) {

        // Si el cuadrito está vacío y presiona Backspace
        if (
            e.key === "Backspace" &&
            this.value === "" &&
            index > 0
        ) {

            // Volver al cuadrito anterior
            digitos12[index - 1].focus();
        }
    });

});
// aqui termina mi codigo para validar ingreso por medio de telefono

 












// aqui vamos a poner el cambio de contraseña y que se vuelva a repetir 

// Capturamos el formulario
const formularioCambioContraseña = document.getElementById(
    "otroCOTENEDORotroContenido"
);

// Capturamos el primer input
const nuevaContraseña = document.getElementById(
    "nuevaContraseña"
);

// Capturamos el segundo input
const repetirContraseña = document.getElementById(
    "repetirContraseña"
);

// Párrafo donde mostraremos errores o mensajes
const mensajeCambioContraseña = document.getElementById(
    "arrozquesoBanano"
);


// Escuchamos cuando el usuario envía el formulario
formularioCambioContraseña.addEventListener("submit", async function(event) {

    // Evitamos que el formulario recargue la página
    event.preventDefault();


    // Limpiamos mensajes anteriores
    mensajeCambioContraseña.textContent = "";


    // Quitamos espacios al principio y al final
    const contraseña1 = nuevaContraseña.value.trim();
    const contraseña2 = repetirContraseña.value.trim();


    // Comprobamos que los dos campos tengan información
    if (!contraseña1 || !contraseña2) {

        mensajeCambioContraseña.textContent =
            "Debes ingresar y repetir la contraseña.";

        return;
    }


    // Comprobamos que las contraseñas sean iguales
    if (contraseña1 !== contraseña2) {

        mensajeCambioContraseña.textContent =
            "Las contraseñas no coinciden.";

        return;
    }


    // Comprobamos la longitud
    if (contraseña1.length < 4 || contraseña1.length > 8) {

        mensajeCambioContraseña.textContent =
            "La contraseña debe tener entre 4 y 8 caracteres.";

        return;
    }


    // Si todo está correcto, enviamos la contraseña a Express
    try {
         
        // Recuperamos el ID del usuario que verificó correctamente el OTP
        const usuarioId = sessionStorage.getItem("usuarioRecuperacionId");
        console.log("🆔 ID recuperado del sessionStorage:",usuarioId);
        console.log("🔐 Enviando nueva contraseña a Express");

        const respuesta = await fetch(
            "http://localhost:3000/api/contrasena-cambiada",
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

               // Enviamos el ID y la nueva contraseña a Express
                  body: JSON.stringify({
                  usuarioId: usuarioId,
                  contraseña: contraseña1
                })
                
            }
        );


        // Convertimos la respuesta de Express a JSON
        const resultado = await respuesta.json();

        localStorage.setItem("mensajeCambioContraseña","Contraseña cambiada correctamente");
        formularioCambioContraseña.reset();
        window.location.href = "./confirmacionRegistro.html";
    


    } catch (error) {

        console.error("Error:", error);

        mensajeCambioContraseña.textContent =
            "No pudimos cambiar la contraseña.";
    }

});


//aqui termina  el cambio de contraseña y que se vuelva a repetir 