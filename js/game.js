// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
	bgReady = true;
};
bgImage.src = "./images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
	heroReady = true;
};
heroImage.src = "./images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
	monsterReady = true;
};
monsterImage.src = "./images/monster.png";

// Minion image
var minionReady = false;
var minionImage = new Image();
minionImage.onload = function() {
	minionReady = true;
};
minionImage.src = "./images/annoyotron.png";

// Game objects
var hero = {
	speed: 256,
	x: 0,
	y: 0
};

var monster = {
	x: 0,
	y: 0
};

var minion = {
	x: 0,
	y: 0
};

var monstersCaught = 0;
var deaths = 0;

// Handles keyboard controls
var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function() {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Randomly place monster for spawning
	monster.x = 32 + (Math.random() * (canvas.width - 150));
	monster.y = 32 + (Math.random() * (canvas.height - 150));

	minion.x = 32 + (Math.random() * (canvas.width - 200));
	minion.y = 32 + (Math.random() * (canvas.height - 200));
};

var spawnMonster = function() {
	monster.x = 32 + (Math.random() * (canvas.width - 150));
	monster.y = 32 + (Math.random() * (canvas.height - 150));
}

var spawnMinion = function() {
	minion.x = 32 + (Math.random() * (canvas.width - 200));
	minion.y = 32 + (Math.random() * (canvas.height - 200));
}

var feetSwitch = function() {
	if(heroImage.src = "./images/hero.png") {
		heroImage.src = "./images/hero2.png";
	};
};

var feetSwitchBack = function() {
	if(heroImage.src = "./images/hero2.png") {
		pauseTime: 2000;
		heroImage.src = "./images/hero.png";
	};
};

// Update game objects 
var update = function(modifier) {
	//find a cleaner way for him to walk
	var backAndForth = function() {
		if(modifier = modifier) {
			setTimeout(feetSwitch, 10);
			setTimeout(feetSwitchBack, 100);
		};
	};

	if (38 in keysDown) { //Player holding up
		hero.y -= hero.speed * modifier;
		backAndForth();
	};
	if (40 in keysDown) { //Player holding down
		hero.y += hero.speed * modifier;
		backAndForth();
	};
	if (37 in keysDown) { //Player holding left
		hero.x -= hero.speed * modifier;
		backAndForth();
	};
	if (39 in keysDown) { //Player holding right
		hero.x += hero.speed * modifier;
		backAndForth();
	};

	// When they touch
	if (hero.x <= (monster.x + 32) 
		&& monster.x <= (hero.x + 32) 
		&& hero.y <= (monster.y + 32) 
		&& monster.y <= (hero.y + 32)) 
	{
		++monstersCaught;
		spawnMonster();

		// fix spawning more minions at certain scores
		if(monstersCaught === monstersCaught) {
			spawnMinion();
		}
	};

	if (hero.x <= (minion.x + 32) 
		&& minion.x <= (hero.x + 32) 
		&& hero.y <= (minion.y + 32) 
		&& minion.y <= (hero.y + 32)) 
	{
		++deaths;
		reset();
		monstersCaught = 0;
	}
};

// Draw everything
var render = function() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	};

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	};

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	};

	if (minionReady) {
		ctx.drawImage(minionImage, minion.x, minion.y);
	};

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
	ctx.fillText("Deaths: " + deaths, 300, 32)
};


// The main game loop
var main = function() {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do it again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();