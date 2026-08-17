
const filo = document.getElementById("idparaagregarIMAGENusuario");

if (filo) {

    filo.addEventListener("click", () => {

        // Crear input file
        const input = document.createElement("input");

        input.type = "file";
        input.accept = "image/*";

        // Cuando el usuario seleccione una imagen
        input.addEventListener("change", async () => {

            const archivo = input.files[0];

            if (!archivo) {
                return;
            }

            console.log("Imagen seleccionada:", archivo);

            // Datos de Cloudinary
            const cloudName = "TU_CLOUD_NAME";
            const uploadPreset = "TU_UPLOAD_PRESET";

            // URL de subida
            const url =
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

            // Crear FormData
            const formData = new FormData();

            formData.append("file", archivo);
            formData.append("upload_preset", uploadPreset);

            try {

                console.log("Subiendo imagen...");

                const respuesta = await fetch(url, {
                    method: "POST",
                    body: formData
                });

                const datos = await respuesta.json();

                if (!respuesta.ok) {
                    console.error("Error de Cloudinary:", datos);
                    return;
                }

                console.log("Imagen subida correctamente");
                console.log("URL:", datos.secure_url);

            } catch (error) {

                console.error("Error al subir:", error);

            }

        });

        // Abrir selector de archivos
        input.click();

    });

}












//aqui va todo ojo serrado y avierto de mi input registro.html

const pabloEscovar = document.querySelector("#togglePasswordAhorasi");
const noseaasitamMalosocio = document.querySelector("#loquieroaHORAparacambiar");
const pabloEscovaracecino = document.querySelector("#togglePasswordAhorano");
const ventiladorPRENDIDO = document.querySelector("#nadaqueverConUsted");

//aqui validamos el input para cambiar o ir modificando los que el cliente valla escribiendo

  ventiladorPRENDIDO.addEventListener("input", () => {
    const contraseñadeotro = ventiladorPRENDIDO.value;
    if(contraseñadeotro.length <4 || contraseñadeotro.length >8){
     ventiladorPRENDIDO.classList.add("celulargrande");
    }else{
      ventiladorPRENDIDO.classList.remove("celulargrande");
    }
  });
 




//aqui validamos el input para cambiar o ir mosificando los que el cliente valla escribiendo

pabloEscovar.addEventListener("click", () => {

  if (ventiladorPRENDIDO.type === "text"){

    ventiladorPRENDIDO.type = "password";
    pabloEscovar.classList.add("fa-eye-slash");
    pabloEscovar.classList.remove("fa-eye");

  } else {
    ventiladorPRENDIDO.type = "text";
    pabloEscovar.classList.add("fa-eye");
    pabloEscovar.classList.remove("fa-eye-slash");
  }

});



pabloEscovaracecino.addEventListener("click", () => {

  if (noseaasitamMalosocio.type === "text") {

    noseaasitamMalosocio.type = "password";
    pabloEscovaracecino.classList.add("fa-eye-slash");
    pabloEscovaracecino.classList.remove("fa-eye");

  } else {
    noseaasitamMalosocio.type = "text";
    pabloEscovaracecino.classList.add("fa-eye");
    pabloEscovaracecino.classList.remove("fa-eye-slash");
}
});

//aqui termina todo sobre el ojo cerrado y avierto de mi input registro.html










 // aqui va todo el js script de los digitos para ingresar y validar pormedio de correo o numero telefonico  

const digitos = document.querySelectorAll('.digito');

digitos.forEach((input, index) => {
    input.addEventListener('input', function() {
        // Permitir solo números
        this.value = this.value.replace(/[^0-9]/g, '');

        // Pasar al siguiente input
        if (this.value !== '' && index < digitos.length - 1) {
            digitos[index + 1].focus();
        }
    });

    input.addEventListener('keydown', function(e) {
        // Retroceder con Backspace
        if (e.key === 'Backspace' && this.value === '' && index > 0) {
            digitos[index - 1].focus();
        }
    });
});


// aqui termina mi codigo para validar ingreso por medio de telefono 