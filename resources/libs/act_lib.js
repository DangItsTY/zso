//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Act Scripts
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

//	~~~~~~~TD~~~~~~*
//	Act Gravity: Applies a downward force on player object
//	~~~~~~~TD~~~~~~*
var gravity_act = function() {
	for (var i = 0; i < objectList.length; i++) {
		//objectList[i].y += (objectList[i].weight * modifier) * (objectList[i].airtimer) * (objectList[i].airtimer);
		//objectList[i].y += objectList[oPhysics].gravityForce * (objectList[i].weight * modifier) * (objectList[i].airtimer);
		objectList[i].vY += objectList[oPhysics].gravityForce * (objectList[i].weight * modifier);
	}
};

var velocity_act = function() {
	for (var i = 0; i < objectList.length; i++) {
		objectList[i].x += objectList[i].vX * modifier;
		objectList[i].y += objectList[i].vY;
	}
};

var friction_act = function() {
	for (var i = 0; i < objectList.length; i++) {
		if (Math.abs(objectList[i].vX) > 1) {
			if (objectList[i].vX > 0) {
				objectList[i].vX -= objectList[oPhysics].frictionForce * (objectList[i].weight * modifier);
			} else {
				objectList[i].vX += objectList[oPhysics].frictionForce * (objectList[i].weight * modifier);
			}
		} else {
			objectList[i].vX = 0;
		}
	}
};

var follow_act = function(object) {
	if (object.behavior == "follow") {
		if (object.x > objectList[selectedPlayer].x) {
			object.vX = -object.speed;
		}
		else {
			object.vX = object.speed;
		}
		
		if (object.x > objectList[selectedPlayer].x - 4 && object.x < objectList[selectedPlayer].x + 4 &&
			(object.y < objectList[selectedPlayer].y - 64 || object.y > objectList[selectedPlayer].y + 64)) {
			object.behavior = "wander";
		}
	}
}

var wander_act = function(object) {
	if (object.behavior == "wander") {
		if (object.x > objectList[selectedPlayer].x - 64 && object.x < objectList[selectedPlayer].x + 64 &&
			object.y > objectList[selectedPlayer].y - 64 && object.y < objectList[selectedPlayer].y + 64) {
			object.behavior = "follow";
		}
		else if (object.wandercount >= object.wandertimer) {
			var temp = roll(1, 2);
			var temp2 = roll(1, 2);
			if (temp2 == 1) {
				object.vX *= -1;
				object.behavior = "follow";
			}
			object.wandercount = 0;
			object.wandertimer = temp;
		}
		else {
			object.wandercount += modifier;
		}
	}
}

var lifetime_act = function(object) {
	if (object.lifecount >= object.lifetime) {
		object.readytodie = true;
	}
	else {
		object.lifecount += modifier;
	}
}

var shoot_act = function(object) {
	if(isInRange(object, object.target, object.range) && object.target.type == "enemy") {
		object.target.health -= object.damage;
		object.lifecount = object.lifetime;
	}
}

//	melee weapon follows player
var meleeFollow_act = function(object) {
	object.y = objectList[selectedPlayer].y;
	object.x = objectList[selectedPlayer].x + (16 * object.direction);
}

var attackready_act = function(object) {
	if(object.attackcount >= object.attacktimer) {
		object.attackready = true;
	}
	else {
		object.attackcount += modifier;
	}
}

var attack_act = function(object) {
	if(isInRange(object, object.target, object.range) && object.target.type == "player" && object.attackready) {
		object.target.health -= object.damage;
		object.attackready = false;
		object.attackcount = 0;
	}
}

var stop_act = function(object) {
	if (object.target.type == "enemy") {
		object.target.vX = 0;
		object.target.vY = 0;
	}
	else if (object.target.name == "barricade") {
		if (object.y > object.target.y) {
			object.target.y = object.y - 16;
			object.target.vY = 0;
		}
	}
}

//	Can stack barricades on top of each other
var stack_act = function(object) {
	if (object.target.name == "barricade") {
		object.target.vY = 0;
		object.target.weight = 0;
		object.vY = 0;
		object.weight = 0;
	}
}

var die_act = function(object) {
	if(object.health <= 0) {
		object.readytodie = true;
	}
}

var spawn_act = function(object) {
	if (object.spawnCount >= object.spawnMax) {
		var x = Math.random() * 400;
		var y = Math.random() * 320;
		objectList[oCount] = new zombie(x, y + 300);
		object.spawnCount = 0;
	}
	else {
		object.spawnCount += modifier;
	}
}

//	~~~~~~~TD~~~~~~*
//	Act Camera: Move the camera
//	~~~~~~~TD~~~~~~*
var actcamera = function() {
	//	Act the camera
	//	1.	Get the change in position during the last and current game frame
	//	2.	Then move all entity lists
	
	//	TyTest - Camera Code
	cameraX = objectList[selectedPlayer].x - CANVASWIDTH/2;
	cameraY = objectList[selectedPlayer].y - CANVASHEIGHT/2;
	
	/*	Working Camera Code
	cameraDeltaX = cameraX - objectList[selectedPlayer].x;
	cameraDeltaY = cameraY - objectList[selectedPlayer].y;
	for (i = 0; i < objectList.length; i++) {
		objectList[i].x += cameraDeltaX;
		objectList[i].y += cameraDeltaY;
	}
	for (i = 0; i < tileList.length; i++) {
		tileList[i].x += cameraDeltaX;
		tileList[i].y += cameraDeltaY;
	}
	for (i = 0; i < energyList.length; i++) {
		energyList[i].x += cameraDeltaX;
		energyList[i].y += cameraDeltaY;
	}
	for (i = 0; i < projectileList.length; i++) {
		projectileList[i].x += cameraDeltaX;
		projectileList[i].y += cameraDeltaY;
	}
	for (i = 0; i < particleList.length; i++) {
		particleList[i].x += cameraDeltaX;
		particleList[i].y += cameraDeltaY;
	}
	objectList[selectedPlayer].x = CANVASWIDTH/2;
	objectList[selectedPlayer].y = CANVASHEIGHT/2;
	*/
};

var actcamera2 = function() {
	//	Pans camera above player
	cameraX = objectList[selectedPlayer].x - CANVASWIDTH/2;
	cameraY = objectList[selectedPlayer].y - CANVASHEIGHT/2 - 175;
};