
// ===============================
// GAME VARIABLES
// ===============================

let cookies =
    Number(localStorage.getItem("cookies")) || 0;


let cookiesPerClick =
    Number(
        localStorage.getItem("cookiesPerClick")
    ) || 1;


let cookiesPerSecond =
    Number(
        localStorage.getItem("cookiesPerSecond")
    ) || 0;


// ===============================
// HTML ELEMENTS
// ===============================

const cookie =
    document.getElementById("cookie");


const counter =
    document.getElementById("counter");


const perSecond =
    document.getElementById("perSecond");


const fingerButton =
    document.getElementById("fingerButton");


const grandmaButton =
    document.getElementById("grandmaButton");


const factoryButton =
    document.getElementById("factoryButton");


const machineButton =
    document.getElementById("machineButton");


// ===============================
// UPDATE SCREEN
// ===============================

function updateScreen() {

    counter.textContent =
        Math.floor(cookies) + " cookies";


    perSecond.textContent =
        cookiesPerSecond +
        " cookies / second";


    // Save game

    localStorage.setItem(
        "cookies",
        cookies
    );


    localStorage.setItem(
        "cookiesPerClick",
        cookiesPerClick
    );


    localStorage.setItem(
        "cookiesPerSecond",
        cookiesPerSecond
    );


    updateButtons();
}


// ===============================
// COOKIE CLICK
// ===============================

cookie.addEventListener(
    "click",
    function () {

        cookies += cookiesPerClick;

        updateScreen();

    }
);


// ===============================
// UPDATE BUTTONS
// ===============================

function updateButtons() {

    fingerButton.disabled =
        cookies < 20;


    grandmaButton.disabled =
        cookies < 100;


    factoryButton.disabled =
        cookies < 500;


    machineButton.disabled =
        cookies < 2000;
}


// ===============================
// BETTER FINGER
// ===============================

fingerButton.addEventListener(
    "click",
    function () {

        if (cookies >= 20) {

            cookies -= 20;

            cookiesPerClick += 1;

            updateScreen();

        }

    }
);


// ===============================
// GRANDMA
// ===============================

grandmaButton.addEventListener(
    "click",
    function () {

        if (cookies >= 100) {

            cookies -= 100;

            cookiesPerSecond += 1;

            updateScreen();

        }

    }
);


// ===============================
// COOKIE FACTORY
// ===============================

factoryButton.addEventListener(
    "click",
    function () {

        if (cookies >= 500) {

            cookies -= 500;

            cookiesPerSecond += 10;

            updateScreen();

        }

    }
);


// ===============================
// COOKIE MACHINE
// ===============================

machineButton.addEventListener(
    "click",
    function () {

        if (cookies >= 2000) {

            cookies -= 2000;

            cookiesPerSecond += 50;

            updateScreen();

        }

    }
);


// ===============================
// AUTOMATIC COOKIES
// ===============================

setInterval(
    function () {

        cookies += cookiesPerSecond;

        updateScreen();

    },
    1000
);


// ===============================
// RESET GAME
// ===============================

function resetGame() {

    const answer =
        confirm(
            "Are you sure you want to reset the game?"
        );


    if (answer) {

        cookies = 0;

        cookiesPerClick = 1;

        cookiesPerSecond = 0;


        localStorage.removeItem(
            "cookies"
        );


        localStorage.removeItem(
            "cookiesPerClick"
        );


        localStorage.removeItem(
            "cookiesPerSecond"
        );


        updateScreen();

    }

}


// ===============================
// START GAME
// ===============================

updateScreen();
```
