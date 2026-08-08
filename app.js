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

// aqui termina mi codigo para validar ingreso por medio de telefono 
}




