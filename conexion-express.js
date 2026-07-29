 const form = document.getElementById("formItem");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        nombre: document.getElementById("nombre").value,
        cantidad: Number(document.getElementById("cantidad").value)
      };

      try {
        const res = await fetch("http://localhost:3000/api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log("Guardado:", result);
         let milon = document.getElementById("holamilon").textContent="datos enviados";
        //alert("Item enviado correctamente");

        form.reset();
      } catch (error) {
        console.error("Error:", error);
      }
    });