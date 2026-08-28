// Player information
let playerFragment = "";
let playerHP = 100;
let attackPower = 15;
let playerX = 190;
let playerY = 115;
let speed = 5;

let keys = {};

// Enemy information
let enemyHP = 100;

document.addEventListener("keydown", function(event) {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.key.toLowerCase()] = false;
});
function movePlayer() {

    if (keys["w"] || keys["arrowup"]) {
        playerY -= speed;
    }

    if (keys["s"] || keys["arrowdown"]) {
        playerY += speed;
    }

    if (keys["a"] || keys["arrowleft"]) {
        playerX -= speed;
    }

    if (keys["d"] || keys["arrowright"]) {
        playerX += speed;
    }

    document.getElementById("player").style.left = playerX + "px";
    document.getElementById("player").style.top = playerY + "px";

    requestAnimationFrame(movePlayer);
}

movePlayer();

// Choose your starting Fragment
function chooseFragment(name) {

    playerFragment = name;

    document.getElementById("playerName").textContent = name;

    document.getElementById("selection").classList.add("hidden");

    document.getElementById("battle").classList.remove("hidden");

    document.getElementById("message").textContent =
        "A wild Fragment appeared!";
}


// Basic attack
function attack() {

    enemyHP -= attackPower;

    document.getElementById("enemyHP").textContent =
        "Enemy HP: " + enemyHP;

    document.getElementById("message").textContent =
        playerFragment + " attacked!";

    enemyTurn();
}


// Special skill
function useSkill() {

    let skillDamage = 25;

    enemyHP -= skillDamage;

    document.getElementById("enemyHP").textContent =
        "Enemy HP: " + enemyHP;

    document.getElementById("message").textContent =
        playerFragment + " used a powerful skill!";

    enemyTurn();
}


// Capture attempt
function capture() {

    let success = Math.random() < 0.5;

    if (success) {

        document.getElementById("message").textContent =
            "You captured the Fragment!";

    } else {

        document.getElementById("message").textContent =
            "The Fragment escaped!";

        enemyTurn();
    }
}


// Retreat
function retreat() {

    document.getElementById("message").textContent =
        "You escaped!";
}


// Enemy turn
function enemyTurn() {

    document.getElementById("battle").classList.add("hidden");

    document.getElementById("dodge").classList.remove("hidden");

    startDodge();
}

