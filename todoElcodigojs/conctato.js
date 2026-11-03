                            
//formularioContacto
const formulario =document.getElementById("formularioContacto");
//boton submit
const botonCambio =document.getElementById("botoncorreo");
//aqui validaremos el textarea
const textares =document.getElementById("JsScripttextarea");
//icono para quitarle la clase
const icono =document.getElementById("quitarlelACLASE");

const parrafoerrores= document.getElementById("parrafoseñal");
 let registroIngresado;
 let paloma = false;

//inportamos nuesto local storage tanto de ingreso como de registrado
const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")|| "null");
const usuarioQuenoseConfunda = JSON.parse(localStorage.getItem("usuarioRegistrado")|| "null");


botonCambio.addEventListener("click", function(){
    paloma= true
    if(usuarioLogueado){
       registroIngresado = usuarioLogueado;
    }else if(usuarioQuenoseConfunda){
       registroIngresado = usuarioQuenoseConfunda;
    }
     
})


formulario.addEventListener("submit", async function(e){
    e.preventDefault()

    if (!paloma) {
        parrafoerrores.textContent="Debes seleccionar correo electrónico";
        setTimeout(() => {
         parrafoerrores.textContent = "";
        }, 5000);
        return;
    }
     icono.classList.remove("ClaseDisplaynone")
     botonCambio.classList.add("botenBorde")

   if(registroIngresado == null){
    parrafoerrores.textContent="Debes ingresar o registrarte"
    setTimeout(() => {
         parrafoerrores.textContent = "";
        }, 5000);
        return;
   }

   if(textares.value === ""){
      parrafoerrores.textContent="Debes escribir algo"
    setTimeout(() => {
         parrafoerrores.textContent = "";
        }, 5000);
        return;
   }
   
   const datosContacto = {
    nombre: registroIngresado.nombre,
    correo: registroIngresado.correo,
    celular: registroIngresado.celular,
    mensaje: textares.value
};

try {

    const respuesta = await fetch("http://localhost:3000/api/contacto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosContacto)
    });

    const datos = await respuesta.json();

    console.log(datos);

    if (datos.exito) {
        formulario.reset();
        parrafoerrores.textContent = "Mensaje enviado correctamente.";
        localStorage.setItem("mensagecontacto", "¡Mensaje enviado correctamente!");
        window.location.href = "./confirmacionRegistro.html";
        paloma = false;

        setTimeout(() => {
            parrafoerrores.textContent = "";
        }, 5000);

    }

} catch (error) {

    console.error("Error:", error);

    parrafoerrores.textContent =
        "No se pudo enviar el mensaje. Inténtalo nuevamente.";

    setTimeout(() => {
        parrafoerrores.textContent = "";
    }, 5000);
}
  
})


