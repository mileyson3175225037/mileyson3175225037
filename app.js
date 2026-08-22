
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














// aqui va todo la configuracion del reloj colombia

const ZONA_HORARIA = "America/Bogota";

function obtenerHoraBogota() {
    const ahora = new Date();

    // Obtener hora, minuto y segundo de Bogotá
    const partesHora = new Intl.DateTimeFormat("en-US", {
        timeZone: ZONA_HORARIA,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }).formatToParts(ahora);

    const hora = {};
    
    partesHora.forEach(parte => {
        if (parte.type !== "literal") {
            hora[parte.type] = parte.value;
        }
    });

    // Obtener fecha de Bogotá
    const partesFecha = new Intl.DateTimeFormat("en-US", {
        timeZone: ZONA_HORARIA,
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).formatToParts(ahora);

    const fecha = {};

    partesFecha.forEach(parte => {
        if (parte.type !== "literal") {
            fecha[parte.type] = parte.value;
        }
    });

    return {
        hora: hora.hour,
        minuto: hora.minute,
        segundo: hora.second,
        amPM: hora.dayPeriod,

        dia: fecha.day,
        mes: fecha.month,
        anio: fecha.year,

        milisegundo: ahora.getMilliseconds()
    };
}


function actualizarReloj() {

    const tiempo = obtenerHoraBogota();

    // Hora
    document.getElementById("hora").textContent = tiempo.hora;
    document.getElementById("minuto").textContent = tiempo.minuto;
    document.getElementById("segundo").textContent = tiempo.segundo;

    // Milisegundos
    document.getElementById("mili").textContent =
        String(tiempo.milisegundo).padStart(3, "0");

    // AM / PM
    document.getElementById("amPM").textContent = tiempo.amPM;

    // Fecha
    document.getElementById("dia").textContent = tiempo.dia;
    document.getElementById("mes").textContent = tiempo.mes;
    document.getElementById("anio").textContent = tiempo.anio;

    // Volver a actualizar en el siguiente frame
    requestAnimationFrame(actualizarReloj);
}

// Iniciar reloj
actualizarReloj();
// aqui termina todo la configuracion del reloj colombia










//aqui va todo el codigo del scanner


const btnScanner123 = document.getElementById("btnScannerHARASI");
const scannerContainer = document.getElementById("scannerContainer");
const videoScanner = document.getElementById("videoScanner");

let controls = null;

btnScanner123.addEventListener("click", async () => {

    console.log("📷 Iniciando escáner PDF417...");

    scannerContainer.style.display = "block";

    try {

        // Le decimos a ZXing:
        // 1. Solo queremos PDF417
        // 2. Que intente con mayor esfuerzo
        const hints = new Map();

        hints.set(
            ZXingLibrary.DecodeHintType.POSSIBLE_FORMATS,
            [ZXingLibrary.BarcodeFormat.PDF_417]
        );

        hints.set(
            ZXingLibrary.DecodeHintType.TRY_HARDER,
            true
        );

        const codeReader =
            new ZXingBrowser.BrowserMultiFormatReader(hints);

        console.log("🔎 Buscando PDF417...");

        // Usar directamente la cámara trasera
        controls = await codeReader.decodeFromVideoDevice(
            undefined,
            videoScanner,
            (result, error) => {

                if (result) {

                    console.log("================================");
                    console.log("🎉 ¡PDF417 DETECTADO!");
                    console.log("================================");

                    console.log("Formato:");
                    console.log(result.getBarcodeFormat());

                    console.log("Texto:");
                    console.log(result.getText());

                    console.log("Objeto completo:");
                    console.log(result);

                    console.log("================================");

                    // Detener scanner
                    if (controls) {
                        controls.stop();
                        controls = null;
                    }

                    scannerContainer.style.display = "none";
                }

            }
        );

    } catch (error) {

        console.error("❌ ERROR DEL ESCÁNER");
        console.error(error);

    }

});


//aqui termina todo el codigo del scaner 