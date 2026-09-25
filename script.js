// ---- spelstatus (alles wordt in deze paar variabelen bijgehouden) ----
let cookies = 0;

const buildings = {
  cursor: { name: "Cursor", baseCost: 10, cps: 0.1, count: 0 },
  grandma: { name: "Oma", baseCost: 50, cps: 1, count: 0 },
  farm: { name: "Boerderij", baseCost: 300, cps: 8, count: 0 }
};

// elke volgende aankoop wordt 15% duurder dan de vorige (standaardformule voor dit soort spellen)
function currentCost(b) {
  return Math.ceil(b.baseCost * Math.pow(1.15, b.count));
}

function totalCPS() {
  let total = 0;
  for (const key in buildings) {
    total += buildings[key].cps * buildings[key].count;
  }
  return total;
}

function fmt(n) {
  return Math.floor(n).toLocaleString("nl-NL");
}

function render() {
  document.getElementById("cookieCount").textContent = fmt(cookies);
  document.getElementById("cps").textContent = totalCPS().toFixed(1) + " cookies per seconde";
  for (const key in buildings) {
    const b = buildings[key];
    const btn = document.querySelector(`#item-${key} button`);
    const cost = currentCost(b);
    btn.textContent = `Koop (${fmt(cost)}) — Je hebt: ${b.count}`;
    btn.disabled = cookies < cost;
  }
}

// ---- klikken op de cookie ----
document.getElementById("cookieBtn").addEventListener("click", (e) => {
  cookies += 1;
  render();
  spawnFloatingText(e.clientX, e.clientY, "+1");
});

// ---- gebouwen kopen ----
document.querySelectorAll(".shop button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.id;
    const b = buildings[key];
    const cost = currentCost(b);
    if (cookies >= cost) {
      cookies -= cost;
      b.count += 1;
      render();
    }
  });
});

// ---- automatisch cookies genereren elke seconde ----
setInterval(() => {
  cookies += totalCPS();
  render();
}, 1000);

// ---- klein animatie-effect voor het zwevende getal bij een klik ----
function spawnFloatingText(x, y, text) {
  const el = document.createElement("div");
  el.className = "float";
  el.textContent = text;
  el.style.left = x + "px";
  el.style.top = y + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

render();
