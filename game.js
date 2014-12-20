/*
	Random Notes
	- This game engine is written for platformers
*/

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Preload
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var preload = function() {
	objectList[oCount] = new survivor(CANVASWIDTH/2, CANVASHEIGHT/2);		//	Creates an object inside objectList
	selectedPlayer = oCount - 1;		//	Sets currently controlled object to the first object created (ie the one above)
	
	//	System objects
	objectList[oCount] = new physics(0, 0);
	oPhysics = oCount - 1;
	objectList[oCount] = new camera(0, 0);
	objectList[oCount] = new spawner(0, 0);
	
	tileList[tCount] = new forestbg(-1300, -700);
	
	//	Test Floor
	/*
	for (var i = 0; i < 20; i++) {
		tileList[tCount] = new tile(160+(i*16), 384);
	}
	*/
	
	//	Make Mansion
	//	Ceiling
	for (var i = 0; i < 50; i++) {
		tileList[tCount] = new tile(i*16, 640);
	}
	tileList[tCount] = new tile(-16, 624);
	tileList[tCount] = new tile(800, 624);
	//	1st Floor
	for (var i = 0; i < 50; i++) {
		tileList[tCount] = new tile(i*16, 320);
	}
	tileList[tCount] = new tile(-16, 304);
	tileList[tCount] = new tile(800, 304);
	//	2nd Floor
	for (var i = 0; i < 28; i++) {
		tileList[tCount] = new tile(-128+(i*16), 480);
	}
	for (var i = 0; i < 28; i++) {
		tileList[tCount] = new tile(480+(i*16), 480);
	}
	tileList[tCount] = new tile(-144, 464);
	tileList[tCount] = new tile(928, 464);
	//	Platforms 1st floor
	for (var i = 0; i < 8; i++) {
		tileList[tCount] = new tile(336+(i*16), 528);
	}
	for (var i = 0; i < 4; i++) {
		tileList[tCount] = new tile(288+(i*16), 576);
	}
	for (var i = 0; i < 4; i++) {
		tileList[tCount] = new tile(448+(i*16), 576);
	}
	//	Platforms 2nd floor
	for (var i = 0; i < 4; i++) {
		tileList[tCount] = new tile(128+(i*16), 416);
	}
	for (var i = 0; i < 17; i++) {
		tileList[tCount] = new tile(-128+(i*16), 400);
	}
	for (var i = 0; i < 4; i++) {
		tileList[tCount] = new tile(608+(i*16), 416);
	}
	for (var i = 0; i < 17; i++) {
		tileList[tCount] = new tile(656+(i*16), 400);
	}
	
	//	Spawn a zombie
	objectList[oCount] = new zombie(160, 352);
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Update
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var update = function () {
	//	First gather input
	objectList[selectedPlayer].runInput();
	
	//	Call act on all objects. Pass in a time variable, and a reference to itself
	//	Modifier - calculated time. ex: x += 50*modifier means move 50 pixels to the right in 1 second
	for (var i = 0; i < objectList.length; i++) {
		objectList[i].act(objectList[i]);
	}
	
	//	Do collision on objects
	for (var i = 0; i < objectList.length; i++) {
		for (var j = 0; j < objectList.length; j++) {
			if (collidesWith(objectList[i], objectList[j]) && i != j) {
				//	Call object's resolve method
				objectList[i].target = objectList[j];
				objectList[i].resolve(objectList[i]);
			}
		}
	}
	//	Do collisions and resolve based on object's acts
	for (var i = 0; i < objectList.length; i++) {
		for (var j = 0; j < tileList.length; j++) {
			if (collidesWith(objectList[i], tileList[j])) {
				//	Collide with right wall
				/*
				if ((objectList[i].x > tileList[j].x - 16 && objectList[i].x < tileList[j].x + 8) &&
						objectList[i].y > tileList[j].y - 12 && objectList[i].y < tileList[j].y + 12) {
					objectList[i].x = tileList[j].x - 16;
				}
				*/
				
				//objectList[selectedPlayer].dashReady = true;
				//objectList[selectedPlayer].jumpReady = true;
					
				//	Right Wall collision
				if (objectList[i].x < tileList[j].x - (objectList[i].size*0.25) &&
						objectList[i].y > tileList[j].y - (objectList[i].size*0.75) && objectList[i].y < tileList[j].y + (objectList[i].size*0.75)) {										
					objectList[i].x = tileList[j].x - 16;
					//objectList[i].prevX = tileList[j].x - 16;	//	the previous coordinates (same as below) are shifted a bit to avoid infinite collision
					objectList[i].y -= objectList[i].weight/4 * modifier;
				}
				
				//	Left Wall collision
				if (objectList[i].x > tileList[j].x + (objectList[i].size*0.25) &&
						objectList[i].y > tileList[j].y - (objectList[i].size*0.75) && objectList[i].y < tileList[j].y + (objectList[i].size*0.75)) {										
					objectList[i].x = tileList[j].x + 16;
					//objectList[i].prevX = tileList[j].x + 16;
					objectList[i].y -= objectList[i].weight/4 * modifier;
				}
				
				//	Floor collision
				if (objectList[i].y < tileList[j].y - (objectList[i].size*0.25) &&
						objectList[i].x > tileList[j].x - (objectList[i].size*0.75) && objectList[i].x < tileList[j].x + (objectList[i].size*0.75)) {										
					objectList[i].y = tileList[j].y - 16;
					//objectList[i].prevY = tileList[j].y - 16;
					//objectList[selectedPlayer].fastFallReady = false;
					objectList[i].airtimer = 0;
					objectList[i].vY = 0;
				}
				else {
					objectList[i].airtimer += modifier;
				}
				
				//	Ceiling collision
				if (objectList[i].y > tileList[j].y + (objectList[i].size*0.25) &&
						objectList[i].x > tileList[j].x - (objectList[i].size*0.75) && objectList[i].x < tileList[j].x + (objectList[i].size*0.75)) {
					objectList[i].y = tileList[j].y + 16;
					//objectList[i].prevY = tileList[j].y + 16;
				}
			}
			else {
				objectList[i].airtimer += modifier;
			}
		}
	}
	
	//	Resolve airtime (for player)
	/*
	for (var j = 0; j < tileList.length; j++) {
		if (collidesWith(objectList[selectedPlayer], tileList[j])) {
			//	Floor collision
			if (objectList[selectedPlayer].y < tileList[j].y - (objectList[selectedPlayer].size*0.25) &&
					objectList[selectedPlayer].x > tileList[j].x - (objectList[selectedPlayer].size*0.75) && objectList[selectedPlayer].x < tileList[j].x + (objectList[selectedPlayer].size*0.75)) {										
				objectList[selectedPlayer].airtimer = 0;
			}
			else {
				if (objectList[selectedPlayer].jumpTimer == 0) {
					objectList[selectedPlayer].airtimer += modifier;
				}
			}
		}
		else {
			if (objectList[selectedPlayer].jumpTimer == 0) {
				objectList[selectedPlayer].airtimer += modifier;
			}
		}
	}
	*/
	
	
	//	Resolve jump
	for (var j = 0; j < tileList.length; j++) {
		if (collidesWith(objectList[selectedPlayer], tileList[j])) {
			//	Floor collision
			if (objectList[selectedPlayer].y < tileList[j].y - (objectList[selectedPlayer].size*0.25) &&
					objectList[selectedPlayer].x > tileList[j].x - (objectList[selectedPlayer].size*0.75) && objectList[selectedPlayer].x < tileList[j].x + (objectList[selectedPlayer].size*0.75)) {										
				objectList[selectedPlayer].jumpReady = true;
				objectList[selectedPlayer].jumpCount = 0;
			}
		}
	}
	
	//	Clean list, destroying all dead objects
	for (var i = 0; i < objectList.length; i++) {
		if (objectList[i].readytodie) {
			if (objectList[i].name == "zombie") {
				zombiekills += 1;	//TyTest
			}
			objectList.splice(i, 1);
			oCount -= 1;
			i -= 1;
		}
	}
	
		
		/*
	//	Resolve Projectile
	for (var i = 0; i < projectileList.length; i++) {
		for (var j = 0; j < tileList.length; j++) {
			if (collidesWith(projectileList[i], tileList[j])) {
				projectileList.splice(i, 1);
				pCount -= 1;
				i -= 1;
			}
		}
	}
	*/
	
	//actcamera(modifier);
	
	//	TyTest
	//	Kill 30 zombies before dying and you win!
	if (zombiekills >= 30 && objectList[selectedPlayer].health > 0 && gameOver == false) {
		document.getElementById("debug5").innerHTML = "Congratulations! You won!";
		document.getElementById("debug5").style.fontSize = "14pt";
		document.getElementById("debug5").style.color = "red";
		gameOver = true;
	}
	else if (objectList[selectedPlayer].health < 0 && gameOver == false) {
		document.getElementById("debug5").innerHTML = "You lost :(. Press shift+f5 to try again?";
		document.getElementById("debug5").style.fontSize = "14pt";
		document.getElementById("debug5").style.color = "red";
		gameOver = true;
	}
	
	//	TyNote: Recommended to place debug messages here
	document.getElementById("debug1").innerHTML = "#1: " + objectList[selectedPlayer].y;
	document.getElementById("debug2").innerHTML = "#2: " + objectList[selectedPlayer].airtimer;
	document.getElementById("debug3").innerHTML = "#3 Health: " + objectList[selectedPlayer].health;
	document.getElementById("debug4").innerHTML = "#4 Zombies Killed: " + zombiekills;
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Render
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var render = function () {
	ctxOff.fillStyle = "rgb(0,0,0)";
    ctxOff.fillRect (0,0,CANVASWIDTH,CANVASHEIGHT);		//	Draw black background
	
	drawList(tileList);	//	Draw objects (is now prerendered)
	drawList(objectList);	//	Draw objects (is now prerendered)
	
	ctx.drawImage(canvasOff, 0, 0);		//	Draw prerendered canvas onto "real" canvas
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	The Game Loop
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
// shim layer with setTimeout fallback 
      // window.requestAnimFrame = (function(){ 
      //   return  window.requestAnimationFrame       ||  
      //           window.webkitRequestAnimationFrame ||  
      //           window.mozRequestAnimationFrame    ||  
      //           window.oRequestAnimationFrame      ||  
      //           window.msRequestAnimationFrame     ||  
      //           function( callback ){ 
      //             window.setTimeout(callback, 1000 / 60); 
      //           }; 
      // })();

var gameloop = function() {
	 
      // window.requestAnimFrame(gameloop);
	//	TyNoteSpecial: Thank you to lostdecadegames for giving me the awesome tutorial that got me started with HTML5 game development!
	now = Date.now();
	delta = now-then;
	modifier = delta/1000;
	
	update();
	render();
	
	then = now;
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Start Game Engine
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
then = Date.now();
preload();
// window.requestAnimFrame(gameloop);
setInterval(gameloop,1);