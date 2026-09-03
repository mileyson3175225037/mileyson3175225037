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

 
 
 
 
 
 
 
 
 
 // aqui va toda la peticion que enviaremos a expres y lo almacene en mongodb este es el archivo registro.html

   const ventiladorMalo = document.querySelector("#impresoraDetexto") 
  
     const cascooscuro = document.querySelector("#cementoBlanco23");
     const tomate = document.getElementById("celecionaEltipoDedocumento");
     const  ajo = document.getElementById("verduraFritaParacomer");
     const cieloTENIS = document.getElementById("quienseraELLA");
     const chocola = document.getElementById("yosequienEsella");
     const mateo = document.querySelector(".parrafoROJO")
     //esta es la repuesta que tenemos del archivo para poner la imagen osea biene de claudinary
     const urlImagen = localStorage.getItem("urlImagen");
     
     

     // estos son todos los iconos de el input nombre
     const ladrilloTomacorriente = document.querySelector("#nocheBuena");
     const simonRojo = document.querySelector("#diaBUENO");
      
     // estos son todos los iconos de el input cedula o documento
     const todoAcincomil = document.querySelector("#yamelaComi");
     const meaburry = document.querySelector("#elsolBrillaparatodos");

     // estos son todos los iconos de el input correo electronico
     const historaCompleta = document.querySelector("#validacionIconocorreo");
     const rejaSoldada = document.querySelector("#surPoderoso");


     // estos son todos los iconos de el input correo numero de celular
     const cristovalColon = document.querySelector("#paraubBUENCELULAR");
     const sodagaustica = document.querySelector("#semedañolasTenis");




     // aqui  van la validacion para el prime input nombre
     cascooscuro.addEventListener("input",()=>{
       const valido = cascooscuro.value.trim().toLowerCase()
       const expresion = /^[\p{L}\p{N}\s'-]+$/u; 
       const maletero = valido.length >= 3 && expresion.test(valido);
        simonRojo.classList.toggle("agregar", !maletero)
        ladrilloTomacorriente.classList.toggle("agregar", maletero)
        cascooscuro.classList.toggle("celulargrande", !maletero)
     })
        


    // aqui  van la validacion para el segundo input numero de documento
       ajo.addEventListener("input",()=>{
       const celularmalucoViejo = ajo.value.trim()
       const expresionRegular = /^\d{6,20}$/; 
       const cajaDecambio = expresionRegular.test(celularmalucoViejo);
       meaburry.classList.toggle("agregar", !cajaDecambio)
       todoAcincomil.classList.toggle("agregar", cajaDecambio)
       ajo.classList.toggle("celulargrande", !cajaDecambio)
     })



     // aqui  van la validacion para el tercer input correo electronico
      cieloTENIS.addEventListener("input",()=>{
       const corazonDahcero = cieloTENIS.value.trim().toLowerCase()
       const todalaExprecione = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
       const pinturaverdeOroja = todalaExprecione.test(corazonDahcero );
        rejaSoldada.classList.toggle("agregar", !pinturaverdeOroja)
        historaCompleta.classList.toggle("agregar", pinturaverdeOroja)
        cieloTENIS.classList.toggle("celulargrande", !pinturaverdeOroja)
     })

       
       // aqui  van la validacion para el cuarto  input numero de celulra
       chocola.addEventListener("input",()=>{
       const cementoarenaCaido = chocola.value.trim()
       const tienequeSerPerfecto = /^3\d{9}$/; 
       const todollegaMINUSCULA = tienequeSerPerfecto.test(cementoarenaCaido);
       sodagaustica .classList.toggle("agregar", !todollegaMINUSCULA)
       cristovalColon.classList.toggle("agregar", todollegaMINUSCULA)
       chocola.classList.toggle("celulargrande", !todollegaMINUSCULA)
     })
      


     //aqui va todo el event listene submit cara que no se envia asta que se le ordene
      ventiladorMalo.addEventListener("submit", async (e) =>{
       e.preventDefault();

           //Comprobamos si ya hay un usuario iniciado 
           const usuarioLogueado = JSON.parse( localStorage.getItem("usuarioLogueado") || "null" );
           if (usuarioLogueado !== null) { 
           mateo.textContent = "Ya hay un usuario iniciado. Debes cerrar sesión antes de registrar otro usuario.";
           setTimeout(() => { 
           mateo.textContent = "";
           }, 5000);
          return; 
       }



       //aquiva la validacion del input nombre completo perodentro del submit
       const valido = cascooscuro.value.trim().toLowerCase()
       const expresion = /^[\p{L}\p{N}\s'-]+$/u;
       const maletero = valido.length >= 3 && expresion.test(valido);
       if (!maletero){
       mateo.textContent ="Ingresa al menos 3 caracteres. No se permiten  como #, % o @";
       cascooscuro.focus()
       setTimeout(() =>{
        mateo.textContent = "";
        }, 5000);
       return;
      };

       
      //aquiva la validacion del input cedula o documento completa perodentro del submit
       const celularmalucoViejo = ajo.value.trim()
       const comparacion = /^\d{6,20}$/;
       const maleteroROJO = comparacion.test(celularmalucoViejo);
       if (!maleteroROJO){
       mateo.textContent =" Debe haber al menos 6 números para el documento  ";
       ajo.focus()
       setTimeout(() =>{
        mateo.textContent = "";
        }, 5000);
       return;
      };




       //aquiva la validacion del input  del submit
       const tepegoUnpuño = cieloTENIS.value.trim().toLowerCase()
       const comparaloTEDAbien = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       const padrePoderozoaquiesta = comparaloTEDAbien.test(tepegoUnpuño);
       if (!padrePoderozoaquiesta){
       mateo.textContent ="Ingresa un correo electrónico válido, por ejemplo: usuario@correo.com";
       cieloTENIS.focus()
       setTimeout(() =>{
        mateo.textContent = "";
        }, 5000);
       return;
      };

      
      //aquiva la validacion del input numero telefonico  completa perodentro del submit
       const ellamedijoAyer = chocola.value.trim()
       const mecompreUncelularnuevomalo = /^3\d{9}$/;
       const maleteroROJOrayoscomoasi =  mecompreUncelularnuevomalo.test(ellamedijoAyer);
       if (!maleteroROJOrayoscomoasi){
       mateo.textContent ="El número de celular debe tener 10 dígitos y comenzar con 3. Ejemplo: 3001234567";
       chocola.focus()
       setTimeout(() =>{
        mateo.textContent = "";
        }, 5000);
       return;
      };


      const contraseñadeotroesmilon = ventiladorPRENDIDO.value;
    
        if(contraseñadeotroesmilon.length < 4 || contraseñadeotroesmilon.length >8 ){
        mateo.textContent = "La contraseña debe tener como minimo 4 carateres a 8 maximo";
        ventiladorPRENDIDO.focus()
        setTimeout(() =>{
         mateo.textContent ="";
        }, 5000);
        return;
       }


       if(noseaasitamMalosocio.value !== ventiladorPRENDIDO.value){
         mateo.textContent = "Las contraseñas no coinciden";
         noseaasitamMalosocio.focus()
         setTimeout(() =>{
         mateo.textContent ="";
        }, 5000);
        return;
       }


       //console.log("Todos los campos son correctos");
       //ventiladorMalo.reset();
       //localStorage.setItem("mensajeConfirmacion", "¡Registro exitoso!");
       //window.location.href = "./confirmacionRegistro.html";
        
       try {
         const datosRegistro = {
          nombre: cascooscuro.value.trim(),
          documento: ajo.value.trim(),
          correo: cieloTENIS.value.trim().toLowerCase(),
          celular: chocola.value.trim(),
          contraseña: ventiladorPRENDIDO.value,
        };

       const respuesta = await fetch("http://localhost:3000/api/items", {
         method: "POST",
         headers: {
         "Content-Type": "application/json"
         },
         body: JSON.stringify(datosRegistro)
        });

        if (!respuesta.ok) {
         throw new Error("No se pudo completar el registro");
        }

       const resultado = await respuesta.json();

        console.log("Respuesta del servidor:", resultado);
        //obtenemos el id de cada registro que llega desde mongodb
        const idUsuario = resultado.registrousuario._id;
        //obtenemos la url de la imagen que viene de de claudinary para guardala en mongodb
        const urlImagen = localStorage.getItem("urlImagen");
        console.log("ID del usuario:", idUsuario);
        console.log("URL de imagen:", urlImagen);

        const respuestaImagen = await fetch(
         `http://localhost:3000/api/items/${idUsuario}/imagen`,
        {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            imagen: urlImagen
         })
        }
       );

      const resultadoImagen = await respuestaImagen.json();

      console.log("Respuesta de la imagen:", resultadoImagen);
      // cuando tenemos la repuesta de express y todo sale correcto lo almacenamos en localstorage para remover lacase que tiene display none 
       localStorage.setItem("registroCompletado", "true");
      //guardamos toda la repusta del registro para utilizarla en localStorage y poder utilizarla en otra pagina
       

       // AQUÍ guardamos el usuario actualizado con la imagen
      localStorage.setItem("usuarioRegistrado",JSON.stringify(resultadoImagen.usuario));


        ventiladorMalo.reset();

        localStorage.setItem("mensajeConfirmacion", "¡Registro exitoso!");
        window.location.href = "./confirmacionRegistro.html";

       } catch (error) {
       console.error("Error al registrar:", error);

       mateo.textContent = "Ocurrió un error al enviar tus datos. Inténtalo nuevamente.";

       setTimeout(() => {
       mateo.textContent = "";
       }, 5000);
      }
   })
  
//