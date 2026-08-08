 {
   //este corchete evita que se propague js scrip a otras pagina y aqui abre
   //aqui va el js script de index.html pero solo las peticiones a express

const formulario = document.getElementById("formulario-soat");
const inputPlaca = document.getElementById("placa");
const inputCedula = document.getElementById("cedula");
const resultado = document.querySelector(".todosLOSERRORESdelBaquen");

// Solo letras y números para la placa
inputPlaca.addEventListener("input", (e) => {

    e.target.value = e.target.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "");

});

// Solo números para la cédula
inputCedula.addEventListener("input", (e) => {

    e.target.value = e.target.value.replace(/\D/g, "");

});

// Enviar formulario
formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const placa = inputPlaca.value.trim();
    const cedula = inputCedula.value.trim();

    if (!placa || !cedula) {
        
        resultado.textContent= ("Todos los campos son obligatorios.")
        setTimeout(() => {
        resultado.textContent = "";
    }, 5000);
    return; // para detenelo asta que secumpla todo esatamente
    }

    try {



    const respuesta = await fetch("vehiculo.json");


    const vehiculos = await respuesta.json();


    const  respuestavehiculo = vehiculos.find((vehiculo) =>
        vehiculo.placa === placa &&
        vehiculo.cedula === cedula
    );
       /*
  
        const respuesta = await fetch("/api/cotizar", {
            method: "POST",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                placa,
                cedula
            })
         }); 
        */

        if (!respuesta.ok){
            throw new Error("No fue posible realizar la cotización, valida bien los datos.");
        }

        //const data = await respuesta.json();

        // Guardar los datos
        sessionStorage.setItem("cotizacion", JSON.stringify(respuestavehiculo));

       // Ir a la siguiente página
         window.location.href = "/repuestacontizacion.html";

    } catch (error) {

        resultado.textContent= `${error.message}` 
        setTimeout(() => {
        resultado.textContent = "";
        }, 5000); 

    }

});


//este corchete evita que se propague js scrip a otras pagina y aqui sierra
}