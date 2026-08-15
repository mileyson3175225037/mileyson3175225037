// aqui va toda la peticion que enviaremos a expres y lo almacene en mongodb este es el archivo registro.html

   const ventiladorMalo = document.querySelector("#impresoraDetexto") 
  
     const cascooscuro = document.querySelector("#cementoBlanco23");
     const tomate = document.getElementById("celecionaEltipoDedocumento");
     const  ajo = document.getElementById("verduraFritaParacomer");
     const cieloTENIS = document.getElementById("quienseraELLA");
     const chocola = document.getElementById("yosequienEsella");
     const maiz = document.querySelector(".nadaqueverConUsted");
     const trigo = document.querySelector(".loquieroaHORAparacambiar");
     const mateo = document.querySelector(".parrafoROJO")

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


    ventiladorMalo.addEventListener("submit", async (e) =>{
      e.preventDefault();
       //aquiva la validacion del input nombre completo perodentro del submit
       const valido = cascooscuro.value.trim().toLowerCase()
       const expresion = /^[\p{L}\p{N}\s'-]+$/u;
       const maletero = valido.length >= 3 && expresion.test(valido);
       if (!maletero){
       mateo.textContent ="Ingresa al menos 3 caracteres. No se permiten caracteres especiales como #, % o @";
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
       mateo.textContent ="Debe haber al menos 6 números para el documento ";
       cascooscuro.focus()
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
       cascooscuro.focus()
       setTimeout(() =>{
        mateo.textContent = "";
        }, 5000);
       return;
      };



   })
  
//