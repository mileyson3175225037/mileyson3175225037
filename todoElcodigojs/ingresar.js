
const volarMuycomodo = document.getElementById("paraMeterletodoComoesguardabarro");
const formularioIngresar = document.querySelector("#lecambieelIdentificardoVERsifunciona");
const valorcambiExtremo =document.getElementById("paraMeterletodoComoesguardabarro123")

formularioIngresar.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contacto = formularioIngresar.contacto.value.trim();
    const clave = formularioIngresar.clave.value;

    console.log("Contacto:", contacto);
    console.log("Clave:", clave);

    try {
        const respuestavalidacio = await fetch("http://localhost:3000/api/ingresar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contacto: contacto,
                clave: clave
            })
        });

        const resultado12 = await respuestavalidacio.json();

        console.log("Respuesta de Express:", resultado12);

        if (!respuestavalidacio.ok) {
           valorcambiExtremo.textContent = resultado12.mensaje;
           setTimeout(() =>{
            valorcambiExtremo.textContent ="";
            }, 5000);
            return;
        }

        formularioIngresar.reset();

        localStorage.setItem("registroCompletado", "true");
        localStorage.setItem("usuarioLogueado", JSON.stringify(resultado12.usuario));
        localStorage.setItem("ingresoexitosoParacambiar", "¡Ingreso exitoso!");
        window.location.href = "./confirmacionRegistro.html";

    } catch (error) {
        console.error("Error al ingresar:", error);
        valorcambiExtremo.textContent = resultado12.mensaje;
         setTimeout(() =>{
          valorcambiExtremo.textContent ="";
        }, 5000);
        return;
    }
});







