//aqui va toda las peticones para ingresar usuario
const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")|| "null");
//aqui va todo cuando alguien se registra
const usuarioQuenoseConfunda = JSON.parse(localStorage.getItem("usuarioRegistrado")|| "null");
 
const filo = document.getElementById("idparaagregarIMAGENusuario");

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
if (registroCompletado1234 === "true"){
     contenedormiloniaTonia.classList.remove( "aquiVaelDiplaynoneparaocultarelcontenedortesnisnegra" );
}


    // Existe un usuario logueado
        if (usuarioLogueado){
            document.getElementById("nombreComplotodelUsuario").textContent = usuarioLogueado.nombre;
            //quitamos el icono para agregar la primera letra del nombre 
            document.querySelector("#nuevaClaseAgregada").style.display = "none";
            filo.textContent = usuarioLogueado.nombre.charAt(0).toUpperCase();
            
          } else if (usuarioQuenoseConfunda){
             document.getElementById("nombreComplotodelUsuario").textContent = usuarioQuenoseConfunda.nombre;
            //quitamos el icono para agregar la primera letra del nombre 
            document.querySelector("#nuevaClaseAgregada").style.display = "none";
            filo.textContent = usuarioQuenoseConfunda.nombre.charAt(0).toUpperCase();
        }else{
            document.querySelector("#nuevaClaseAgregada").style.display = " ";
        }

        

//




//aqui va todo sobre la imagen que guardamos en cloudinary
//lo voy a comentar para un fururo utilizarlo
/* */
/* 
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

*/














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
















//js script para cotisar el soat y esta en el index.html

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
         window.location.href = "./repuestacontizacion.html";

    } catch (error) {

        resultado.textContent= `${error.message}` 
        setTimeout(() => {
        resultado.textContent = "";
        }, 5000); 

    }

});


//aqui termina el js script para cotisar el soat y esta en el index.html










//aqui va el codigo para el carruser que esta en index.html 

// ============================================================
// OBTENER COMENTARIOS
// ============================================================

async function obtenerComentarios() {

    try {

        // ====================================================
        // PEDIR LOS COMENTARIOS AL BACKEND
        // ====================================================

        const respuesta = await fetch(
            "http://localhost:3000/api/comentarios"
        );

        const resultado = await respuesta.json();

        console.log(
            "✅ Comentarios recibidos:",
            resultado.comentarios
        );


        // ====================================================
        // PADRE DEL CARRUSEL
        // ====================================================

        const contenedorComentarios =
            document.querySelector(
                ".hijoDecomentarioDelosClientes"
            );


        if (!contenedorComentarios) {

            console.error(
                "❌ No existe .hijoDecomentarioDelosClientes"
            );

            return;
        }


        // ====================================================
        // LIMPIAR LOS COMENTARIOS ANTERIORES
        // ====================================================

        contenedorComentarios.innerHTML = "";


        // ====================================================
        // CREAR LOS COMENTARIOS
        // ====================================================

        resultado.comentarios.forEach(
            (comentario) => {

                // ============================================
                // CONTENEDOR INDIVIDUAL
                // ============================================

                const contenedor =
                    document.createElement("div");

                contenedor.classList.add(
                    "comentarioIndividual"
                );


                // ============================================
                // PRIMERA LETRA
                // ============================================

                const primeraLetra =
                    document.createElement("div");

                primeraLetra.classList.add(
                    "primeraLetra"
                );

                primeraLetra.textContent =
                    comentario.nombre
                        .charAt(0)
                        .toUpperCase();


                // ============================================
                // NOMBRE
                // ============================================

                const nombre =
                    document.createElement("div");

                nombre.classList.add(
                    "nombreComentario"
                );

                nombre.textContent =
                    comentario.nombre;


                // ============================================
                // ESTRELLAS
                // ============================================

                const estrellas =
                    document.createElement("div");

                estrellas.classList.add(
                    "estrellasComentario"
                );

                estrellas.textContent =
                    "⭐".repeat(
                        comentario.estrellas
                    );


                // ============================================
                // DESCRIPCIÓN
                // ============================================

                const descripcion =
                    document.createElement("div");

                descripcion.classList.add(
                    "descripcionComentario"
                );

                descripcion.textContent =
                    comentario.comentario;


                // ============================================
                // METER TODO DENTRO DEL COMENTARIO
                // ============================================

                contenedor.appendChild(
                    primeraLetra
                );

                contenedor.appendChild(
                    nombre
                );

                contenedor.appendChild(
                    estrellas
                );

                contenedor.appendChild(
                    descripcion
                );


                // ============================================
                // METER EL COMENTARIO DIRECTAMENTE
                // EN EL CONTENEDOR PADRE
                // ============================================

                contenedorComentarios.appendChild(
                    contenedor
                );

            }
        );


        // ====================================================
        // INICIAR EL CARRUSEL
        // ====================================================

        iniciarCarrusel(
            contenedorComentarios
        );


    } catch (error) {

        console.error(
            "❌ Error al obtener comentarios:",
            error
        );

    }

}


// ============================================================
// FUNCIÓN DEL CARRUSEL
// ============================================================

function iniciarCarrusel(padre) {

    // ========================================================
    // OBTENER LOS HIJOS
    // ========================================================

    const comentarios =
        Array.from(
            padre.querySelectorAll(
                ".comentarioIndividual"
            )
        );


    // Si no hay comentarios, no hacemos nada
    if (comentarios.length === 0) {

        return;

    }


    // ========================================================
    // DUPLICAR LOS COMENTARIOS
    // ========================================================

    // Guardamos los comentarios originales
    const originales =
        comentarios.slice();


    // Creamos una copia de cada comentario
    originales.forEach(
        (comentario) => {

            const copia =
                comentario.cloneNode(true);

            padre.appendChild(copia);

        }
    );


    // ========================================================
    // VARIABLES
    // ========================================================

    // Velocidad del movimiento
    let velocidad = 0.3;

    // Posición horizontal
    let posicion = 0;

    // Pausa automática
    let pausa = false;

    // Arrastre con mouse
    let arrastrando = false;

    // Posición inicial del mouse
    let posicionInicialMouse = 0;

    // Posición del carrusel al comenzar a arrastrar
    let posicionInicial = 0;

    // Temporizador
    let tiempoParaReanudar;


    // ========================================================
    // ESPERAR A QUE EL NAVEGADOR CALCULE LOS TAMAÑOS
    // ========================================================

    requestAnimationFrame(() => {

        // ====================================================
        // OBTENER LOS COMENTARIOS ACTUALES
        // ====================================================

        const todosLosComentarios =
            Array.from(
                padre.querySelectorAll(
                    ".comentarioIndividual"
                )
            );


        // ====================================================
        // POSICIÓN DEL PRIMER COMENTARIO DUPLICADO
        // ====================================================

        const primerDuplicado =
            todosLosComentarios[
                originales.length
            ];


        // ====================================================
        // CALCULAR CUÁNTO MIDE EL GRUPO ORIGINAL
        // ====================================================

        const anchoGrupo =
            primerDuplicado.offsetLeft;


        console.log(
            "📏 Ancho del grupo:",
            anchoGrupo
        );


        // ====================================================
        // FUNCIÓN PARA APLICAR LA POSICIÓN
        // ====================================================

        function aplicarMovimiento() {

            // Movemos solamente los hijos.
            // El padre NO recibe ningún transform.

            todosLosComentarios.forEach(
                (comentario, indice) => {

                    const posicionOriginal =
                        comentario.offsetLeft;

                    const nuevaPosicion =
                        posicionOriginal - posicion;

                    comentario.style.transform =
                        `translateX(${-posicion}px)`;

                }
            );

        }


        // ====================================================
        // MOVIMIENTO AUTOMÁTICO
        // ====================================================

        function mover() {

            // Mientras no esté pausado
            // y no estemos arrastrando

            if (
                !pausa &&
                !arrastrando
            ) {

                posicion += velocidad;

            }


            // =================================================
            // CUANDO TERMINA EL PRIMER GRUPO
            // =================================================

            if (
                posicion >= anchoGrupo
            ) {

                posicion -=
                    anchoGrupo;

            }


            // =================================================
            // SI EL USUARIO ARRASTRA HACIA LA DERECHA
            // =================================================

            if (
                posicion < 0
            ) {

                posicion +=
                    anchoGrupo;

            }


            // =================================================
            // APLICAR MOVIMIENTO
            // =================================================

            aplicarMovimiento();


            // =================================================
            // CONTINUAR ANIMACIÓN
            // =================================================

            requestAnimationFrame(
                mover
            );

        }


        // ====================================================
        // INICIAR MOVIMIENTO
        // ====================================================

        mover();


        // ====================================================
        // PAUSAR DURANTE 10 SEGUNDOS
        // ====================================================

        function pausarPor10Segundos() {

            pausa = true;


            // Cancelar temporizador anterior
            clearTimeout(
                tiempoParaReanudar
            );


            // Crear nuevo temporizador
            tiempoParaReanudar =
                setTimeout(
                    () => {

                        pausa = false;

                    },
                    10000
                );

        }


        // ====================================================
        // CLICK
        // ====================================================

        padre.addEventListener(
            "click",
            () => {

                pausarPor10Segundos();

            }
        );


        // ====================================================
        // PRESIONAR BOTÓN IZQUIERDO DEL MOUSE
        // ====================================================

        padre.addEventListener(
            "mousedown",
            (evento) => {

                // Solo botón izquierdo
                if (
                    evento.button !== 0
                ) {

                    return;

                }


                // Pausar durante 10 segundos
                pausarPor10Segundos();


                // Activar arrastre
                arrastrando = true;


                // Cambiar cursor
                padre.classList.add(
                    "arrastrando"
                );


                // Guardar posición del mouse
                posicionInicialMouse =
                    evento.pageX;


                // Guardar posición actual
                posicionInicial =
                    posicion;


                evento.preventDefault();

            }
        );


        // ====================================================
        // MOVER EL MOUSE MIENTRAS ESTÁ PRESIONADO
        // ====================================================

        padre.addEventListener(
            "mousemove",
            (evento) => {

                if (!arrastrando) {

                    return;

                }


                // Diferencia del movimiento
                const movimiento =
                    evento.pageX -
                    posicionInicialMouse;


                // Calcular nueva posición
                posicion =
                    posicionInicial -
                    movimiento;


                // =================================================
                // MANTENER LA POSICIÓN ENTRE 0 Y EL ANCHO
                // =================================================

                while (
                    posicion >= anchoGrupo
                ) {

                    posicion -=
                        anchoGrupo;

                }


                while (
                    posicion < 0
                ) {

                    posicion +=
                        anchoGrupo;

                }


                // Aplicar movimiento inmediatamente
                aplicarMovimiento();

            }
        );


        // ====================================================
        // SOLTAR EL BOTÓN DEL MOUSE
        // ====================================================

        padre.addEventListener(
            "mouseup",
            () => {

                arrastrando = false;


                padre.classList.remove(
                    "arrastrando"
                );

            }
        );


        // ====================================================
        // SI EL MOUSE SALE DEL CONTENEDOR
        // ====================================================

        padre.addEventListener(
            "mouseleave",
            () => {

                if (arrastrando) {

                    arrastrando = false;


                    padre.classList.remove(
                        "arrastrando"
                    );

                }

            }
        );


        // ====================================================
        // EVITAR DRAG NATIVO
        // ====================================================

        padre.addEventListener(
            "dragstart",
            (evento) => {

                evento.preventDefault();

            }
        );

    });

}


// ============================================================
// EJECUTAR
// ============================================================

obtenerComentarios();

// aqui es el  FIN DEL CARRUSEL
