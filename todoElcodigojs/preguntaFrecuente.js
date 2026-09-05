const preguntas = document.querySelectorAll(".tituloPregunta");

preguntas.forEach((pregunta) => {

    pregunta.addEventListener("click", () => {

        const contenedor = pregunta.parentElement;

        contenedor.classList.toggle("activa");

    });

});