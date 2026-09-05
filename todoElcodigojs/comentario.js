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
// CONTADOR DEL COMENTARIO
// ===============================

const comentario = document.getElementById("comentario");
const contador = document.querySelector(".cementoParedMareofijo");
const mensaje = document.querySelector(".escribeAlgoPorfavorVeamos");

const limite = 500;

contador.textContent = limite;

mensaje.style.display = "none";

comentario.addEventListener("input", () => {

    const letrasEscritas = comentario.value.length;
    const letrasDisponibles = limite - letrasEscritas;

    contador.textContent = letrasDisponibles;

    if (letrasDisponibles <= 0) {

        contador.textContent = "0";

        mensaje.textContent = "Has superado las letras disponibles";
        mensaje.style.display = "block";

        comentario.value = comentario.value.substring(0, limite);

    } else {

        mensaje.style.display = "none";

    }

});


// ===============================
// ENVIAR COMENTARIO A EXPRESS
// ===============================

const btnEnviarComentario = document.getElementById("btnEnviarComentario");

btnEnviarComentario.addEventListener("click", async () => {

    const textoComentario = comentario.value.trim();

    // Validar estrellas
    if (valorSeleccionado === 0) {

        mensaje.textContent = "Por favor selecciona una calificación.";
        mensaje.style.display = "block";

        return;
    }

    // Validar comentario
    if (textoComentario === "") {

        mensaje.textContent = "Por favor escribe un comentario.";
        mensaje.style.display = "block";

        return;
    }

    try {

        const respuesta = await fetch("http://localhost:3000/api/comentarios", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                estrellas: valorSeleccionado,
                comentario: textoComentario
            })

        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {

            mensaje.textContent = resultado.mensaje || "No se pudo enviar el comentario.";
            mensaje.style.display = "block";

            return;
        }

        console.log(resultado);

        mensaje.textContent = "¡Gracias por tu comentario!";
        mensaje.style.display = "block";

        // Limpiar formulario
        comentario.value = "";
        contador.textContent = limite;

        estrellas.forEach((estrella) => {
            estrella.classList.remove("colorParalasExtrellas");
        });

        valorSeleccionado = 0;

    } catch (error) {

        console.error("Error:", error);

        mensaje.textContent = "Ocurrió un error al enviar el comentario.";
        mensaje.style.display = "block";

    }

});