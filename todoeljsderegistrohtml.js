// aqui va toda la peticion que enviaremos a expres y lo almacene en mongodb este es el archivo registro.html

   const ventiladorMalo = document.querySelector("#impresoraDetexto") 
   console.log(ventiladorMalo);
    
     const cascooscuro = document.querySelector("#cementoBlanco23");
     const tomate = document.getElementById("celecionaEltipoDedocumento");
     const  ajo = document.getElementById("verduraFritaParacomer");
     const piña = document.getElementById("yamelaComi");
     const cieloTENIS = document.getElementById("quienseraELLA");
     const chocola = document.getElementById("yosequienEsella");
     const maiz = document.querySelector(".nadaqueverConUsted");
     const trigo = document.querySelector(".loquieroaHORAparacambiar");
     const mateo = document.querySelector(".parrafoROJO")


     const ladrilloTomacorriente = document.querySelector("#nocheBuena")
     const simonRojo = document.querySelector("#diaBUENO");

     // aqui  van los dos los iconos 
     cascooscuro.addEventListener("input",()=>{
       const valido = cascooscuro.value.trim().toLowerCase()
       const expresion = /^[\p{L}\p{N}\s'-]+$/u;
          
       const maletero = valido.length >= 3 && expresion.test(valido);
       
       simonRojo.classList.toggle("agregar", !maletero)
       ladrilloTomacorriente.classList.toggle("agregar", maletero)
       cascooscuro.classList.toggle("celulargrande", !maletero)
     })
        
   

    ventiladorMalo.addEventListener("submit", async (e) =>{
      e.preventDefault();
       //aqui meteremos todo los condicionales que esta declarado fuera de la funcion submit para que asta que no llenen los campos correctamente no pase a la otra linea 
       const mazaNegra = cascooscuro.value.trim().toLowerCase()
       if (!mazaNegra){
       mateo.textContent ="Ingresa al menos 3 caracteres. No se permiten caracteres especiales como #, % o @";
       cascooscuro.focus()
       return;
      }
   })
  
// aqui termina todo lo que le pusimos al archivo regidtro.html