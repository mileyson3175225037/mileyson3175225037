
// PERDIDA-DE-CONTRASEÑA.HTML

const formulario = document.getElementById("formularioparaCanbiarloconHarina");
const contactoInput = document.getElementById("contactomaria");
const contactoInputplatano = document.getElementById("arrozquesoBanano");
const lequieroPonerundisplaynone = document.getElementById("loquiroAquinoescuchasloca"); 

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

const digitos12 = document.querySelectorAll('.digito');

digitos12.forEach((input, index) => {
    input.addEventListener('input', function() {
        // Permitir solo números
        this.value = this.value.replace(/[^0-9]/g, '');

        // Pasar al siguiente input
        if (this.value !== '' && index < digitos12.length - 1) {
            digitos12[index + 1].focus();
        }
    });

    input.addEventListener('keydown', function(e) {
        // Retroceder con Backspace
        if (e.key === 'Backspace' && this.value === '' && index > 0) {
            digitos12[index - 1].focus();
        }
    });
});

 
// aqui termina mi codigo para validar ingreso por medio de telefono

 