// 1. Spelvariabelen
let koekjes = 0;
let automatischeKlikkers = 0;
let kostenAutomatischeKlikker = 15;

// 2. HTML-elementen ophalen
const koekjesAantalEl = document.getElementById('cookie-count');
const koekjeKnop = document.getElementById('cookie');
const koopKlikkerKnop = document.getElementById('buy-clicker');
const kostenKlikkerEl = document.getElementById('autoclicker-cost');

// 3. Functie om de gebruikersinterface bij te werken
function updateInterface() {
  koekjesAantalEl.textContent = koekjes;
  kostenKlikkerEl.textContent = kostenAutomatischeKlikker;

  // Schakel de knop uit als er niet genoeg koekjes zijn
  if (koekjes < kostenAutomatischeKlikker) {
    koopKlikkerKnop.disabled = true;
  } else {
    koopKlikkerKnop.disabled = false;
  }
}

// 4. Klikken op het hoofdkoekje
koekjeKnop.addEventListener('click', () => {
  koekjes++;
  updateInterface();
});

// 5. Automatische klikker kopen
koopKlikkerKnop.addEventListener('click', () => {
  if (koekjes >= kostenAutomatischeKlikker) {
    koekjes -= kostenAutomatischeKlikker;
    automatischeKlikkers++;
    
    // Verhoog de prijs voor de volgende aankoop (1.5x)
    kostenAutomatischeKlikker = Math.floor(kostenAutomatischeKlikker * 1.5);
    
    updateInterface();
  }
});

// 6. Automatische koekjesproductie (elke seconde)
setInterval(() => {
  koekjes += automatischeKlikkers;
  updateInterface();
}, 1000);

// Eerste update bij het starten van het spel
updateInterface();