// ===============================
// ESTRELLAS
// ===============================

const estrellas = document.querySelectorAll(".botonStrellaSelecionada");

estrellas.forEach((estrella) => {

    estrella.addEventListener("click", () => {

        const valorSeleccionado = Number(estrella.dataset.valor);

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