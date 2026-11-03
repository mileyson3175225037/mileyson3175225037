

// contenedor definitovo para cambiar los datos del usuario bien sea registrado o ingresado
  const formularioModificarUsuario =document.getElementById("agregemolesESTO");
// IMPORTANTE:
// Esta variable debe estar fuera del botón porque
// posteriormente la vamos a utilizar para verificar el OTP.

let correoParaModificar = null;




//llenamos los campos para mostrar la informacion del usuario
//aqui termina todo los campos que 



// ======================================================
// VAMOS A PONER A FUNCIONAR LOS BOTONES PARA ENVIAR EL OTP
// BIEN SEA AL CORREO O AL WHATSAPP
// ======================================================

// ======================================================
// CONTENEDOR PRINCIPAL
// ======================================================

// Lo importamos para posteriormente ocultarlo.
const formularioParaponerledisplasnone =
    document.getElementById("quierloponerleDisplayBlock");


// ======================================================
// CONTENEDOR DONDE ESTÁN LOS CUADRITOS DEL OTP
// ======================================================

const contenedorOTP =
    document.getElementById("contenedorOTPModificarUsuario");


// ======================================================
// BOTÓN PARA ENVIAR OTP AL CORREO
// ======================================================

const botonprecionado =
    document.getElementById("btnCorreoModificarUsuario");


// ======================================================
// PÁRRAFO DONDE MOSTRAREMOS LOS MENSAJES
// ======================================================

const mensaje =document.getElementById("mensajeModificarUsuario");



// ======================================================
// BUSCAMOS LOS DOS LOCALSTORAGE
// ======================================================


// Este contiene la información del usuario que INICIÓ SESIÓN.
const usuarioLogueado =
    JSON.parse(
        localStorage.getItem("usuarioLogueado") || "null"
    );


// Este contiene la información del usuario que SE REGISTRÓ.
const usuarioQuenoseConfunda =
    JSON.parse(
        localStorage.getItem("usuarioRegistrado") || "null"
    );


// ======================================================
// CUANDO PRESIONAMOS EL BOTÓN CORREO
// ======================================================

botonprecionado.addEventListener("click", async function () {

    console.log(
        "🟢 SE PRESIONÓ EL BOTÓN CORREO",
        botonprecionado
    );


    // ==================================================
    // LIMPIAMOS MENSAJE ANTERIOR
    // ==================================================

    mensaje.textContent = "";


    // ==================================================
    // VARIABLE DONDE VAMOS A GUARDAR EL CORREO
    // ==================================================

    let correoUsuario = null;


    // ==================================================
    // PRIMERO MIRAMOS SI HAY USUARIO INGRESADO
    // ==================================================

    if (usuarioLogueado) {

        // El correo está directamente aquí:
        // usuarioLogueado.correo

        correoUsuario = usuarioLogueado.correo;


    // ==================================================
    // SI NO HAY USUARIO INGRESADO,
    // MIRAMOS SI HAY UNO REGISTRADO
    // ==================================================

    } else if (usuarioQuenoseConfunda) {

        // El correo está directamente aquí:
        // usuarioQuenoseConfunda.correo

        correoUsuario = usuarioQuenoseConfunda.correo;


    // ==================================================
    // SI NO EXISTE NINGUNO
    // ==================================================

    } else {

        mensaje.textContent =
            "No hay ningún usuario ingresado o registrado.";

        return;
    }


    // ==================================================
    // COMPROBAMOS QUE EXISTE EL CORREO
    // ==================================================

    if (!correoUsuario) {

        mensaje.textContent =
            "No pudimos encontrar el correo del usuario.";

        return;
    }


    // ==================================================
    // GUARDAMOS EL CORREO
    // ==================================================

    // AQUÍ ESTABA EL PROBLEMA.
    //
    // Guardamos el correo en una variable que está
    // disponible para todo este archivo JavaScript.
    //
    // Después la utilizaremos para verificar el OTP.

    correoParaModificar = correoUsuario;


    console.log(
        "📧 Correo guardado para verificar OTP:",
        correoParaModificar
    );


    // ==================================================
    // MOSTRAMOS EL CORREO EN CONSOLA
    // ==================================================

    console.log(
        "📧 Correo para enviar OTP:",
        correoUsuario
    );


    // ==================================================
    // AQUÍ YA PODEMOS ENVIAR EL OTP A EXPRESS
    // ==================================================

    try {

        const respuesta = await fetch(
            "http://localhost:3000/api/otp-modificar-usuario",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    correo: correoUsuario
                })
            }
        );


        // ==================================================
        // RECIBIMOS LA RESPUESTA DE EXPRESS
        // ==================================================

        const resultado =
            await respuesta.json();


        console.log(
            "📩 Respuesta de Express:",
            resultado
        );


        // ==================================================
        // SI EXPRESS RESPONDIÓ CORRECTAMENTE
        // ==================================================

        if (respuesta.ok) {

            mensaje.textContent =
                resultado.mensaje;


            // ==================================================
            // OCULTAMOS EL CONTENEDOR PRINCIPAL
            // ==================================================

            formularioParaponerledisplasnone.classList.add(
                "bianchiUmedo"
            );


            // ==================================================
            // MOSTRAMOS LOS CUADRITOS DEL OTP
            // ==================================================

            contenedorOTP.classList.remove(
                "bianchiUmedo"
            );


        } else {

            mensaje.textContent =
                resultado.mensaje ||
                "No pudimos enviar el código.";
        }


    } catch (error) {

        // ==================================================
        // ERROR DE CONEXIÓN CON EXPRESS
        // ==================================================

        console.error(
            "❌ Error enviando OTP:",
            error
        );


        mensaje.textContent =
            "No pudimos comunicarnos con el servidor.";
    }

});
// aqui termina el codigo para  poner a funcionar los botenes para enviar el otp bien sea al correo o al whatsapp














// aqui va todo el js script de los digitos para ingresar y validar pormedio de correo o numero telefonico  


// ======================================================
// CORREO DEL USUARIO AL QUE SE LE ENVIÓ EL OTP
// ======================================================


// ======================================================
// CUADROS DEL OTP
// ======================================================

const digitos12 =
    document.querySelectorAll(".digito");


// ======================================================
// RECORREMOS LOS CUADROS
// ======================================================

digitos12.forEach((input, index) => {


    // ==================================================
    // CUANDO EL USUARIO ESCRIBE
    // ==================================================

    input.addEventListener("input", async function () {

        // Solo permitimos números.
        this.value =
            this.value.replace(/[^0-9]/g, "");


        // ==================================================
        // PASAMOS AL SIGUIENTE CUADRO
        // ==================================================

        if (
            this.value !== "" &&
            index < digitos12.length - 1
        ) {

            digitos12[index + 1].focus();
        }


        // ==================================================
        // JUNTAMOS LOS 4 DÍGITOS
        // ==================================================

        let otpIngresado = "";


        digitos12.forEach(function (cuadro) {

            otpIngresado += cuadro.value;

        });


        console.log(
            "🔢 OTP ingresado:",
            otpIngresado
        );


        // ==================================================
        // CUANDO YA TENEMOS LOS 4 DÍGITOS
        // ==================================================

        if (otpIngresado.length === 4) {


            // Comprobamos que tengamos el correo.
            if (!correoParaModificar) {

                console.error(
                    "❌ No tenemos el correo para verificar el OTP."
                );

                return;
            }


            // ==================================================
            // ENVIAMOS EL OTP A EXPRESS
            // ==================================================

            try {

                const respuesta = await fetch(
                    "http://localhost:3000/api/verificar-otp-modificar-usuario",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            correo:
                                correoParaModificar,

                            otp:
                                otpIngresado
                        })
                    }
                );


                // ==================================================
                // RECIBIMOS LA RESPUESTA
                // ==================================================

                const resultado =
                    await respuesta.json();


                console.log(
                    "📩 Respuesta de verificación:",
                    resultado
                );


                // ==================================================
                // OTP CORRECTO
                // ==================================================

                if (respuesta.ok) {

                    mensaje.textContent ="✅ Código correcto.";

                    // ==================================================
                    // OCULTAMOS EL CONTENEDOR DEL OTP
                    // ==================================================
                    contenedorOTP.classList.add("bianchiUmedo");
                    // ==================================================
                    // AQUÍ MOSTRAMOS EL FORMULARIO
                    // PARA MODIFICAR EL USUARIO
                    // ==================================================
                    formularioModificarUsuario.classList.remove("bianchiUmedo");
                    
                          //aqui llenamos los input de registro
                          document.getElementById("nombreCompleto").value =usuarioLogueado.nombre;
                          document.getElementById("numeroDocumento").value = usuarioLogueado.documento;
                          document.getElementById("correoElectronico").value = usuarioLogueado.correo;
                          document.getElementById("numeroCelular").value = usuarioLogueado.celular;
                          //aqui termina los input de que vamos a llenar del registro
                } else {

                    // ==================================================
                    // OTP INCORRECTO O EXPIRADO
                    // ==================================================

                    mensaje.textContent =
                        resultado.mensaje ||
                        "Código incorrecto.";


                    // Limpiamos los cuadros
                    // para volver a intentarlo.

                    digitos12.forEach(function (cuadro) {

                        cuadro.value = "";

                    });


                    // Volvemos al primer cuadro.

                    digitos12[0].focus();
                }


            } catch (error) {

                console.error(
                    "❌ Error verificando OTP:",
                    error
                );


                mensaje.textContent =
                    "No pudimos comunicarnos con el servidor.";
            }

        }

    });


    // ==================================================
    // BACKSPACE
    // ==================================================

    input.addEventListener("keydown", function (e) {

        if (
            e.key === "Backspace" &&
            this.value === "" &&
            index > 0
        ) {

            digitos12[index - 1].focus();
        }

    });

});


// aqui termina mi codigo para validar ingreso por medio de telefono









// FORMULARIO PARA MODIFICAR EL USUARIO


const formularioModificar = document.querySelector(".formularioModificarUsuario");

// ======================================================
// INPUTS DEL FORMULARIO
// ======================================================

const nombreModificar = document.getElementById("nombreCompleto");
const tipoDocumentoModificar = document.getElementById("tipoDocumento");
const documentoModificar = document.getElementById("numeroDocumento");
const correoModificar = document.getElementById("correoElectronico");
const celularModificar = document.getElementById("numeroCelular");
const nuevaContraseña = document.getElementById("nuevaContraseña");
const repetirContraseña = document.getElementById("repetirContraseña");


// ======================================================
// PÁRRAFO PARA MOSTRAR LOS ERRORES
// ======================================================




// ======================================================
// CUANDO EL USUARIO PRESIONA
// "GUARDAR CAMBIOS"
// ======================================================

formularioModificar.addEventListener("submit", async function(e) {

    // Evitamos que el formulario se envíe
    // automáticamente.
    e.preventDefault();


    // ==================================================
    // VALIDAMOS EL NOMBRE
    // ==================================================

    const nombre =
        nombreModificar.value.trim().toLowerCase();

    const expresionNombre =
        /^[\p{L}\p{N}\s'-]+$/u;

    const nombreCorrecto =
        nombre.length >= 3 &&
        expresionNombre.test(nombre);


    if (!nombreCorrecto) {

        mensaje.textContent =
            "Ingresa al menos 3 caracteres. No se permiten símbolos como #, % o @.";

        nombreModificar.focus();

        return;
    }


    // ==================================================
    // VALIDAMOS EL TIPO DE DOCUMENTO
    // ==================================================

    if (tipoDocumentoModificar.value === "") {

        mensaje.textContent =
            "Selecciona un tipo de documento.";

        tipoDocumentoModificar.focus();

        return;
    }


    // ==================================================
    // VALIDAMOS EL NÚMERO DE DOCUMENTO
    // ==================================================

    const documento =
        documentoModificar.value.trim();

    const expresionDocumento =
        /^\d{6,20}$/;

    const documentoCorrecto =
        expresionDocumento.test(documento);


    if (!documentoCorrecto) {

        mensaje.textContent =
            "El documento debe tener entre 6 y 20 números.";

        documentoModificar.focus();

        return;
    }


    // ==================================================
    // VALIDAMOS EL CORREO
    // ==================================================

    const correo =
        correoModificar.value.trim().toLowerCase();

    const expresionCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const correoCorrecto =
        expresionCorreo.test(correo);


    if (!correoCorrecto) {

        mensaje.textContent =
            "Ingresa un correo electrónico válido, por ejemplo: usuario@correo.com";

        correoModificar.focus();

        return;
    }


    // ==================================================
    // VALIDAMOS EL CELULAR
    // ==================================================

    const celular =
        celularModificar.value.trim();

    const expresionCelular =
        /^3\d{9}$/;

    const celularCorrecto =
        expresionCelular.test(celular);


    if (!celularCorrecto) {

        mensaje.textContent =
            "El número de celular debe tener 10 dígitos y comenzar con 3. Ejemplo: 3001234567";

        celularModificar.focus();

        return;
    }


    // ==================================================
    // VALIDAMOS LA NUEVA CONTRASEÑA
    // ==================================================

    const contraseña =
        nuevaContraseña.value;

    const repetir =
        repetirContraseña.value;


    // ==================================================
    // CASO 1:
    // LAS DOS CONTRASEÑAS ESTÁN VACÍAS
    // ==================================================

    if (
        contraseña === "" &&
        repetir === ""
    ) {

        // No hay problema.
        // Significa que el usuario NO quiere
        // cambiar su contraseña.

    } else {


        // ==================================================
        // CASO 2:
        // UNA ESTÁ VACÍA Y LA OTRA NO
        // ==================================================

        if (
            contraseña === "" ||
            repetir === ""
        ) {

            mensaje.textContent =
                "Debes escribir y repetir la nueva contraseña.";

            nuevaContraseña.focus();

            return;
        }


        // ==================================================
        // CASO 3:
        // VALIDAMOS LA LONGITUD
        // ==================================================

        if (
            contraseña.length < 4 ||
            contraseña.length > 8
        ) {

            mensaje.textContent ="La contraseña debe tener como mínimo 4 caracteres y máximo 8.";
            nuevaContraseña.focus();

            return;
        }


        // ==================================================
        // CASO 4:
        // COMPROBAMOS QUE COINCIDAN
        // ==================================================

        if (contraseña !== repetir) {

            mensaje.textContent ="Las contraseñas no coinciden.";

            repetirContraseña.focus();

            return;
        }

    }


    // ==================================================
    // SI LLEGAMOS AQUÍ:
    // TODO ESTÁ CORRECTO
    // ==================================================

    console.log(
        "✅ Todos los datos del formulario son correctos."
    );
    
    // ======================================================
// DATOS QUE VAMOS A ENVIAR A EXPRESS
// ======================================================

const datosModificar = {

    nombre: nombre,

    tipoDocumento: tipoDocumentoModificar.value,

    documento: documento,

    correo: correo,

    celular: celular

};


// ======================================================
// SI EL USUARIO QUIERE CAMBIAR LA CONTRASEÑA
// LA AGREGAMOS A LOS DATOS
// ======================================================

if (contraseña !== "") {

    datosModificar.contraseña = contraseña;

}


// ======================================================
// ENVIAMOS LOS DATOS A EXPRESS
// ======================================================

try {
    

    const respuesta = await fetch(

        `http://localhost:3000/api/modificarDatosmongo/${usuarioLogueado._id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(datosModificar)

        }

    );


    // ==================================================
    // RECIBIMOS LA RESPUESTA DE EXPRESS
    // ==================================================

    const resultado = await respuesta.json();


    console.log("📩 Respuesta de Express:", resultado );


    // ==================================================
    // SI EXPRESS RESPONDE CON ERROR
    // ==================================================

    if (!respuesta.ok) {

            mensaje.textContent = resultado.mensaje || "No pudimos modificar los datos.";

        return;

    }


    // ==================================================
    // TODO SALIÓ CORRECTAMENTE
    // ==================================================
    // ACTUALIZAMOS EL USUARIO EN LOCALSTORAGE
// ======================================================

    localStorage.setItem("usuarioLogueado",JSON.stringify(resultado.usuario));
    //guardamos el mensage para luego mostrarlo en la siguente pagina 
    localStorage.setItem("mensajeModificacion", "Modificación exitosa");
    formularioModificar.reset();
    window.location.href = "./confirmacionRegistro.html";

} catch (error) {

    // ==================================================
    // ERROR DE CONEXIÓN CON EXPRESS
    // ==================================================

    console.error(
        "❌ Error comunicándonos con Express:",
        error
    );

    mensaje.textContent ="No pudimos comunicarnos con el servidor.";

   }
});

