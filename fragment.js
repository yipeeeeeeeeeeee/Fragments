// Player information
let playerFragment = "";
let playerHP = 100;
let attackPower = 15;
let playerX = 190;
let playerY = 115;
let speed = 5;// this is player speed
let attackX = 0;
let attackY = 100; 
let attackSpeed = 1; //self explanetory same for all above 
let hit = false; //makes it so you dont get hit 3 billion times
let attacking = false;// enemy no attack while false
let moving = false;//cant move while flase

let keys = {};

// Enemy info
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


    // Keep player inside box
    if (playerX < 0) {
        playerX = 0;
    }

    if (playerX > 385) {
        playerX = 385;
    }

    if (playerY < 0) {
        playerY = 0;
    }

    if (playerY > 235) {
        playerY = 235;
    }


    document.getElementById("player").style.left = playerX + "px";
    document.getElementById("player").style.top = playerY + "px";
	
	if (moving){
    requestAnimationFrame(movePlayer);
	}
}


// Choose your Fragment
function chooseFragment(name) {

    playerFragment = name;

    document.getElementById("playerName").textContent = name;

    document.getElementById("selection").classList.add("hidden");

    document.getElementById("battle").classList.remove("hidden");

    document.getElementById("message").textContent =
        "A wild Fragment appeared!";
}


// Basic player attack
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
	
	attacking = true;
	moving = true;
	
	movePlayer();
	enemyAttack();
	
}

function enemyAttack() {

    attackX += 5;

    document.getElementById("attack").style.left =
        attackX + "px";
		
	if (attacking){
    requestAnimationFrame(enemyAttack);
	}
	
	if (attackX < 0) {
        attackX = 0;
		
    }

    if (attackX > 405) {
		attackX = 0;
		hit = false;
		attacking = false;
		moving = false;
		playerTurn();
	}

    if (attackY < 0) {
        attackY = 0;
		
    }

    if (attackY > 235) {
		attackY = 235;
		
    }
	
	checkCollision();
}

function checkCollision() {
	if (attackX + 10 >= playerX && playerX + 15 >= attackX && !hit) {
		
		if (attackY + 10 >= playerY && playerY + 15 >= attackY) {
			playerHP -= 10;
			hit = true ;
			console.log(playerHP);
		}
		
	}
}

function playerTurn() {
	
    document.getElementById("battle").classList.remove("hidden");

    document.getElementById("dodge").classList.add("hidden");

	
}