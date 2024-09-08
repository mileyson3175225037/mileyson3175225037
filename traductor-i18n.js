// Cargar el archivo JSON correspondiente según el idioma seleccionado
function loadTranslations(lang) {
  fetch(`carpeta-traductor/${lang}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(translations => {
      document.getElementById('motosucia-lipiesa').innerText = translations.flight;
      document.getElementById('tijera-identificada').innerText = translations.accommodation;
      document.getElementById('insuranceDisplay').innerText = translations.travel_insurance;
      document.getElementById('taxiDisplay').innerText = translations.airport_taxi;
    })
    .catch(error => {
      console.error('Error al cargar las traducciones:', error);
    });
}

// Detecta el idioma del navegador y carga las traducciones
function detectAndLoadLanguage() {
  const userLang = navigator.language || navigator.userLanguage; // Detecta el idioma del navegador
  const lang = userLang.split('-')[0]; // Extrae el código del idioma (por ejemplo, 'es' de 'es-ES')

  // Carga las traducciones del idioma detectado o español por defecto
  const supportedLanguages = ['es', 'en', 'fr'];
  const defaultLanguage = 'es'; // Idioma por defecto si el idioma del navegador no está soportado

  if (supportedLanguages.includes(lang)) {
    loadTranslations(lang);
  } else {
    loadTranslations(defaultLanguage);
  }
}

// Cambia el idioma cuando el usuario hace clic en un botón
function changeLanguage(lang) {
  loadTranslations(lang);
}

// Asocia los botones con sus respectivos cambios de idioma
document.getElementById('traductor-español').addEventListener('click', function() {
  changeLanguage('es');
});

document.getElementById('traductor-ingles').addEventListener('click', function() {
  changeLanguage('en');
});

document.getElementById('my-frances').addEventListener('click', function() {
  changeLanguage('fr');
});

// Detecta el idioma del navegador al cargar la página
window.onload = detectAndLoadLanguage;


const userLang = navigator.language || navigator.userLanguage;
console.log("El idioma de tu navegador es: " + userLang);