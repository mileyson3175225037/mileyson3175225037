{
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

}
// aqui termina mi codigo para validar ingreso por medio de telefono 











//aqui va todo ojo serrado y avierto de mi input registro.html
{


let ventiladorPRENDIDO = document.querySelector(".nadaqueverConUsted");
let pabloEscovar = document.querySelector("#togglePasswordAhorasi");
let noseaasitamMalosocio = document.querySelector(".loquieroaHORAparacambiar");
let pabloEscovaracecino = document.querySelector("#togglePasswordAhorano");

pabloEscovar.addEventListener("click", () => {

  if (ventiladorPRENDIDO.type === "text") {

    ventiladorPRENDIDO.type = "password";
    pabloEscovar.classList.add("fa-eye-slash");
    pabloEscovar.classList.remove("fa-eye");

  } else {

    ventiladorPRENDIDO.type = "text";
    pabloEscovar.classList.add("fa-eye");
    pabloEscovar.classList.remove("fa-eye-slash");
    fa-eye-slash
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
    fa-eye-slash
}
});



}
//aqui termina todo sobre el ojo cerrado y avierto de mi input registro.html