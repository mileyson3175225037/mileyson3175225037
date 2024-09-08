/* aqui voy a poner todo el codigo script de el index.html */

/* qui va todo lo que tiene que ver con las flechas del  */
// Obtener referencias a los elementos
const scrollContainer = document.getElementById('scrollContainer');
const arriva = document.getElementById('flecha-arriva');
const abajo  = document.getElementById('flecha-abajo');

// Definir la cantidad de desplazamiento (en píxeles)
const scrollAmount = 50;

// Función para desplazarse hacia arriba
arriva.addEventListener('click', function() {
    scrollContainer.scrollBy({
        top: -scrollAmount, // Desplazar hacia arriba
        behavior: 'smooth'  // Desplazamiento suave
    });
});

// Función para desplazarse hacia abajo
abajo.addEventListener('click', function() {
    scrollContainer.scrollBy({
        top: scrollAmount,  // Desplazar hacia abajo
        behavior: 'smooth'  // Desplazamiento suave
    });
});





/* aqui va a terminar todo el scrip de el archivo html*/