let koekjes = 0;
let automatischeKlikkers = 0;
let kostenAutomatischeKlikker = 15;

const koekjesAantalEl = document.getElementById('cookie-count');
const koekjeKnop = document.getElementById('cookie');
const koopKlikkerKnop = document.getElementById('buy-clicker');
const kostenKlikkerEl = document.getElementById('autoclicker-cost');


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

koekjeKnop.addEventListener('click', () => {
  koekjes++;
  updateInterface();
});

koopKlikkerKnop.addEventListener('click', () => {
  if (koekjes >= kostenAutomatischeKlikker) {
    koekjes -= kostenAutomatischeKlikker;
    automatischeKlikkers++;
    
  
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