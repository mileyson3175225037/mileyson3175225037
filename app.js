//aqui va toda las peticones para ingresar usuario
const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")|| "null");
//aqui va todo cuando alguien se registra
const usuarioQuenoseConfunda = JSON.parse(localStorage.getItem("usuarioRegistrado")|| "null");
 

//vamos a quitar o borrar el localStorage tanto de la clase como la respusta del registro que obtubimos
const eliminarSalir= document.getElementById("paraCerrarSecion");
    eliminarSalir.addEventListener("click", ()=>{
    localStorage.removeItem("registroCompletado");
    localStorage.removeItem("usuarioRegistrado");
    localStorage.removeItem("usuarioLogueado");
    
})


//aqui va toda la repuesta del usuario ya registrado y que esta en el contenedor tenisNegras
const contenedormiloniaTonia = document.querySelector(".aquiVaelDiplaynoneparaocultarelcontenedortesnisnegra");
const registroCompletado1234 = localStorage.getItem("registroCompletado"); 
if (registroCompletado1234 === "true") {
     contenedormiloniaTonia.classList.remove( "aquiVaelDiplaynoneparaocultarelcontenedortesnisnegra" );
}

//si existe un usuario que haiga ingresado no me funcionara el registro

if (usuarioLogueado !== null) {

    // Existe un usuario logueado
    document.getElementById("nombreComplotodelUsuario").textContent =
        usuarioLogueado.nombre;
    
    //vamos a comprovoar si alguin hizo un click y agrego la imagen del usuario   
    
        if (usuarioLogueado && usuarioLogueado.imagen){
            //quitamos el icono para agregar la imagen 
            document.querySelector("#nuevaClaseAgregada").style.display = "none";
            const imagenrecibidaContenedor= document.getElementById("idparaagregarIMAGENusuario")
           // Creamos el elemento <img>
            const imagen = document.createElement("img");
           // Le ponemos la URL de Cloudinary que viene de MongoDB
           imagen.src ="usuarioLogueado.usuario.imagen"    //  usuarioLogueado.imagen;
           imagen.style.width = "99%";
           imagen.style.height = "99%";
           imagen.style.objectFit = "cover";
           imagen.style.marginLeft = "auto";
           imagen.style.marginRight = "auto";
           imagen.style.border = "1px solid rgb(75, 74, 74)";
           imagen.style.borderRadius = "50%";
           
           imagenrecibidaContenedor.appendChild(imagen);
        }else {
           document.querySelector("#nuevaClaseAgregada").style.display = " ";
        }

} else if (usuarioQuenoseConfunda !== null){

    // No hay usuario logueado, pero sí hay usuario registrado
    document.getElementById("nombreComplotodelUsuario").textContent =
        usuarioQuenoseConfunda.nombre;

} else {

    // No existe ninguno usuario ni registrado ni iniciado el cual va a quedar en blanco
}



//aqui aqui termina toda la repuesta del usuario ya registrado y que esta en el contenedor tenisNegras









//aqui va todo sobre la imagen que guardamos en cloudinary
const filo = document.getElementById("idparaagregarIMAGENusuario");

if (filo) {

    filo.addEventListener("click", () => {

        const input = document.createElement("input");

        input.type = "file";
        input.accept = "image/*";

        input.addEventListener("change", async () => {

            const archivo = input.files[0];

            if (!archivo) {
                return;
            }

            console.log("Imagen seleccionada:", archivo);

            const formData = new FormData();

            formData.append("imagen", archivo);

            try {

                console.log("Enviando imagen a Express...");

                const respuesta = await fetch("http://localhost:3000/api/imagen", {
                    method: "POST",
                    body: formData
                });

                const datos = await respuesta.json();

                if (!respuesta.ok) {
                    console.error("Error:", datos);
                    return;
                }

                console.log("Imagen subida correctamente");
                console.log("URL de Cloudinary:", datos.url);
                // Guardamos la URL en localStorage para usarla en la página de registro 
                localStorage.setItem("urlImagen", datos.url);

            } catch (error) {

                console.error("Error:", error);

            }

        });

        input.click();

    });

}























// aqui va todo la configuracion del reloj colombia
const ZONA_HORARIA = "America/Bogota";

function obtenerHoraBogota() {
    const ahora = new Date();

    // Obtener hora, minuto y segundo de Bogotá
    const partesHora = new Intl.DateTimeFormat("en-US", {
        timeZone: ZONA_HORARIA,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }).formatToParts(ahora);

    const hora = {};
    
    partesHora.forEach(parte => {
        if (parte.type !== "literal") {
            hora[parte.type] = parte.value;
        }
    });

    // Obtener fecha de Bogotá
    const partesFecha = new Intl.DateTimeFormat("en-US", {
        timeZone: ZONA_HORARIA,
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).formatToParts(ahora);

    const fecha = {};

    partesFecha.forEach(parte => {
        if (parte.type !== "literal") {
            fecha[parte.type] = parte.value;
        }
    });

    return {
        hora: hora.hour,
        minuto: hora.minute,
        segundo: hora.second,
        amPM: hora.dayPeriod,

        dia: fecha.day,
        mes: fecha.month,
        anio: fecha.year,

        milisegundo: ahora.getMilliseconds()
    };
}


function actualizarReloj() {

    const tiempo = obtenerHoraBogota();

    const hora = document.getElementById("hora");
    const minuto = document.getElementById("minuto");
    const segundo = document.getElementById("segundo");
    const mili = document.getElementById("mili");
    const amPM = document.getElementById("amPM");
    const dia = document.getElementById("dia");
    const mes = document.getElementById("mes");
    const anio = document.getElementById("anio");

    // Si esta página no tiene el reloj, no hacemos nada
    if (!hora || !minuto || !segundo || !mili || !amPM || !dia || !mes || !anio) {
        return;
    }

    hora.textContent = tiempo.hora;
    minuto.textContent = tiempo.minuto;
    segundo.textContent = tiempo.segundo;

    mili.textContent =
        String(tiempo.milisegundo).padStart(3, "0");

    amPM.textContent = tiempo.amPM;

    dia.textContent = tiempo.dia;
    mes.textContent = tiempo.mes;
    anio.textContent = tiempo.anio;

    requestAnimationFrame(actualizarReloj);
}

// Iniciar reloj
actualizarReloj();
// aqui termina todo la configuracion del reloj colombia










//aqui va todo el codigo del scanner




//aqui termina todo el codigo del scaner 