// ===============================
// SELECCIONAR ESTRELLAS
// ===============================

const estrellas = document.querySelectorAll(".botonStrellaSelecionada");

let valorSeleccionado = 0;

estrellas.forEach((estrella) => {

    estrella.addEventListener("click", () => {

        valorSeleccionado = Number(estrella.dataset.valor);

        estrellas.forEach((estrella, indice) => {

            if (indice < valorSeleccionado) {

                estrella.classList.add("colorParalasExtrellas");

            } else {

                estrella.classList.remove("colorParalasExtrellas");

            }

        });

    });

});


// ===============================
// USUARIO QUE INICIÓ SESIÓN
// ===============================

const usuarioLogueado = JSON.parse(
    localStorage.getItem("usuarioLogueado") || "null"
);


// ===============================
// CONTADOR DEL COMENTARIO
// ===============================

const comentario = document.getElementById("comentario");

const contador = document.querySelector(".cementoParedMareofijo");

const mensaje = document.querySelector(".escribeAlgoPorfavorVeamos");

const limite = 120;

contador.textContent = limite;

mensaje.style.display = "none";

comentario.addEventListener("input", () => {

    const letrasEscritas = comentario.value.length;

    const letrasDisponibles = limite - letrasEscritas;

    contador.textContent = letrasDisponibles;

    if (letrasDisponibles <= 0) {

        contador.textContent = "0";

        mensaje.textContent =
            "Has superado las letras disponibles";

        mensaje.style.display = "block";

        comentario.value =
            comentario.value.substring(0, limite);

    } else {

        mensaje.style.display = "none";

    }

});


// ===============================
// ENVIAR COMENTARIO A EXPRESS
// ===============================

const btnEnviarComentario =
    document.getElementById("btnEnviarComentario");

btnEnviarComentario.addEventListener("click", async () => {

    const textoComentario = comentario.value.trim();


    // ===============================
    // VERIFICAR USUARIO
    // ===============================

    if (!usuarioLogueado) {

        mensaje.textContent =
            "Debes iniciar sesión para dejar un comentario.";

        mensaje.style.display = "block";

        return;
    }


    // ===============================
    // VERIFICAR ID DEL USUARIO
    // ===============================

    if (!usuarioLogueado._id) {

        console.error(
            "El usuario no tiene un _id:",
            usuarioLogueado
        );

        mensaje.textContent =
            "No pudimos identificar tu usuario.";

        mensaje.style.display = "block";

        return;
    }


    // ===============================
    // VALIDAR ESTRELLAS
    // ===============================

    if (valorSeleccionado === 0) {

        mensaje.textContent =
            "Por favor selecciona una calificación.";

        mensaje.style.display = "block";

        return;
    }


    // ===============================
    // VALIDAR COMENTARIO
    // ===============================

    if (textoComentario === "") {

        mensaje.textContent =
            "Por favor escribe un comentario.";

        mensaje.style.display = "block";

        return;
    }


    try {

        const respuesta = await fetch(
            "http://localhost:3000/api/comentarios",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    usuarioId: usuarioLogueado._id,

                    estrellas: valorSeleccionado,

                    comentario: textoComentario

                })

            }
        );


        const resultado = await respuesta.json();


        if (!respuesta.ok) {

            mensaje.textContent =
                resultado.mensaje ||
                "No se pudo enviar el comentario.";

            mensaje.style.display = "block";

            return;
        }


        console.log(
            "✅ Comentario guardado:",
            resultado
        );
   
       //sitodo sale bien guardamo todo en sessionStorage
        localStorage.setItem("mensajeComentario","¡Gracias por tu comentario!");
        window.location.href = "./confirmacionRegistro.html";
        mensaje.style.display = "block";


        // ===============================
        // LIMPIAR FORMULARIO
        // ===============================

        comentario.value = "";

        contador.textContent = limite;


        estrellas.forEach((estrella) => {

            estrella.classList.remove(
                "colorParalasExtrellas"
            );

        });


        valorSeleccionado = 0;


    } catch (error) {

        console.error("❌ Error:", error);

        mensaje.textContent =
            "Ocurrió un error al enviar el comentario.";

        mensaje.style.display = "block";

    }

});