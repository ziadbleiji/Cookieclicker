// Beginwaarden van het spel
const START = {
  koekjes: 0,
  koekjesPerKlik: 1,
  fingerKosten: 50,
  automatischeKlikkers: 0,
  klikkerKosten: 15,
  oma: 0,
  omaKosten: 100,
};

let staat = { ...START };

// Elementen
const el = (id) => document.getElementById(id);

const koekjeKnop = el('cookie');
const koekjesAantalEl = el('cookie-count');
const cpsEl = el('cps');

const fingerKnop = el('buy-finger');
const klikkerKnop = el('buy-clicker');
const omaKnop = el('buy-grandma');

const menuKnop = el('menu-toggle');
const menu = el('menu');
const resetKnop = el('reset');

// Koekjes per seconde: klikker = 1, oma = 5
function koekjesPerSeconde() {
  return staat.automatischeKlikkers * 1 + staat.oma * 5;
}

function updateInterface() {
  koekjesAantalEl.textContent = Math.floor(staat.koekjes);
  cpsEl.textContent = koekjesPerSeconde();

  el('finger-cost').textContent = staat.fingerKosten;
  el('finger-level').textContent = staat.koekjesPerKlik;
  el('autoclicker-cost').textContent = staat.klikkerKosten;
  el('autoclicker-count').textContent = staat.automatischeKlikkers;
  el('grandma-cost').textContent = staat.omaKosten;
  el('grandma-count').textContent = staat.oma;

  // Schakel knoppen uit als er niet genoeg koekjes zijn
  fingerKnop.disabled = staat.koekjes < staat.fingerKosten;
  klikkerKnop.disabled = staat.koekjes < staat.klikkerKosten;
  omaKnop.disabled = staat.koekjes < staat.omaKosten;
}

// Klikken op het koekje
koekjeKnop.addEventListener('click', () => {
  staat.koekjes += staat.koekjesPerKlik;
  updateInterface();
});

// Upgrade: meer koekjes per klik
fingerKnop.addEventListener('click', () => {
  if (staat.koekjes >= staat.fingerKosten) {
    staat.koekjes -= staat.fingerKosten;
    staat.koekjesPerKlik++;
    staat.fingerKosten = Math.floor(staat.fingerKosten * 2);
    updateInterface();
  }
});

// Store: automatische klikker
klikkerKnop.addEventListener('click', () => {
  if (staat.koekjes >= staat.klikkerKosten) {
    staat.koekjes -= staat.klikkerKosten;
    staat.automatischeKlikkers++;
    staat.klikkerKosten = Math.floor(staat.klikkerKosten * 1.5);
    updateInterface();
  }
});

// Store 2: oma
omaKnop.addEventListener('click', () => {
  if (staat.koekjes >= staat.omaKosten) {
    staat.koekjes -= staat.omaKosten;
    staat.oma++;
    staat.omaKosten = Math.floor(staat.omaKosten * 1.5);
    updateInterface();
  }
});

// Hamburger menu open en dicht
function zetMenu(open) {
  menu.hidden = !open;
  menuKnop.setAttribute('aria-expanded', String(open));
}

menuKnop.addEventListener('click', () => zetMenu(menu.hidden));

// Sluit het menu bij een klik ergens anders of bij Escape
document.addEventListener('click', (e) => {
  if (!menu.hidden && !menu.contains(e.target) && !menuKnop.contains(e.target)) {
    zetMenu(false);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') zetMenu(false);
});

resetKnop.addEventListener('click', () => {
  staat = { ...START };
  zetMenu(false);
  updateInterface();
});

// Automatische koekjesproductie (elke seconde)
setInterval(() => {
  staat.koekjes += koekjesPerSeconde();
  updateInterface();
}, 1000);

// Eerste update bij het starten van het spel
updateInterface();