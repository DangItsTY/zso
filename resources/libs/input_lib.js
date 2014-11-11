//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Input Library
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

//	Move left
var left_input = function() {
	if (key["left"] in keysDown) {
		objectList[selectedPlayer].x -= objectList[selectedPlayer].speed * modifier;
		objectList[selectedPlayer].direction = -1;
	}
}

//	Move right
var right_input = function() {
	if (key["right"] in keysDown) {
		objectList[selectedPlayer].x += objectList[selectedPlayer].speed * modifier;
		objectList[selectedPlayer].direction = 1;
	}
}

//	Move up
var up_input = function() {
	if (key["up"] in keysDown) {
		objectList[selectedPlayer].y -= objectList[selectedPlayer].speed * modifier;
	}
}

//	Move down
var down_input = function() {
	if (key["down"] in keysDown) {
		objectList[selectedPlayer].y += objectList[selectedPlayer].speed * modifier;
	}
}

//	Jump
var jump_input = function() {
	if (key["spacebar"] in keysDown && !(key["spacebar"] in keysUp) && objectList[selectedPlayer].jumpCount < objectList[selectedPlayer].jumpMax) {
		objectList[selectedPlayer].vY = -objectList[selectedPlayer].jumpSpeed * modifier;
		objectList[selectedPlayer].jumpCount++;
		keysUp[key["spacebar"]] = true;
	}
/*
	if (key["spacebar"] in keysDown && objectList[selectedPlayer].jumpTimer < objectList[selectedPlayer].jumpDuration && !(objectList[selectedPlayer].jumpTimer == 0 && objectList[selectedPlayer].jumpReady == false) ) {
		objectList[selectedPlayer].y -= objectList[selectedPlayer].jumpSpeed * modifier;
		objectList[selectedPlayer].jumpTimer += modifier;
		objectList[selectedPlayer].jumpReady = false;
	}
	else {
		objectList[selectedPlayer].jumpTimer = 0;
	}
	*/
	/*
	if (key["spacebar"] in keysDown && objectList[selectedPlayer].doubleJumpTimer < objectList[selectedPlayer].doubleJumpDuration && !(objectList[selectedPlayer].doubleJumpTimer == 0 && objectList[selectedPlayer].doubleJumpReady == false) ) {
		objectList[selectedPlayer].y -= objectList[selectedPlayer].doubleJump * modifier;
		objectList[selectedPlayer].doubleJumpTimer += modifier;
		objectList[selectedPlayer].doubleJumpReady = false;
	}
	else {
		objectList[selectedPlayer].doubleJumpTimer = 0;
	}
	*/
}

//	Release Spacebar
var releaseSpacebar_input = function() {
	if (!(key["spacebar"] in keysDown)) {
		delete keysUp[key["spacebar"]];
	}
}

//	Action 1
var action1_input = function() {
	if (key["y"] in keysDown && !(key["y"] in keysUp)) {
		objectList[oCount] = new bullet(objectList[selectedPlayer].x, objectList[selectedPlayer].y);
		objectList[oCount-1].vX = objectList[oCount-1].speed * objectList[selectedPlayer].direction * modifier;
		keysUp[key["y"]] = true;
	}
}

//	Release action1
var	releaseAction1_input = function() {
	if (!(key["y"] in keysDown)) {
		delete keysUp[key["y"]];
	}
}

//	Action 2
var action2_input = function() {
	if (key["x"] in keysDown && !(key["x"] in keysUp)) {
		objectList[oCount] = new barricade(objectList[selectedPlayer].x, objectList[selectedPlayer].y);
		keysUp[key["x"]] = true;
	}
}

//	Release action2
var	releaseAction2_input = function() {
	if (!(key["x"] in keysDown)) {
		delete keysUp[key["x"]];
	}
}

//	Action 3
var action3_input = function() {
	if (key["a"] in keysDown && !(key["a"] in keysUp)) {
		objectList[oCount] = new knife(objectList[selectedPlayer].x, objectList[selectedPlayer].y);
		if (objectList[selectedPlayer].direction == -1) {
			objectList[oCount-1].direction = -1;
		}
		else {
			objectList[oCount-1].direction = 1;
		}
		keysUp[key["a"]] = true;
	}
}

//	Release action3
var	releaseAction3_input = function() {
	if (!(key["a"] in keysDown)) {
		delete keysUp[key["a"]];
	}
}

//	Release left
var	releaseLeft_input = function() {
	if (!(key["left"] in keysDown)) {
		delete keysUp[key["left"]];
	}
}

//	Release right
var	releaseRight_input = function() {
	if (!(key["right"] in keysDown)) {
		delete keysUp[key["right"]];
	}
}

//	Release up
var releaseUp_input = function() {
	if (!(key["up"] in keysDown)) {
		delete keysUp[key["up"]];
	}
}

//	Release down
var releaseDown_input = function() {
	if (!(key["down"] in keysDown)) {
		delete keysUp[key["down"]];
	}
}

//	Release Double Jump
var releaseDoubleJump_input = function() {
	if (!(key["spacebar"] in keysDown)) {
		objectList[selectedPlayer].jumpTimer = 0;
		if (objectList[selectedPlayer].doubleJumpReady == false) {
			objectList[selectedPlayer].doubleJumpReady = true;
		}
		delete keysUp[key["spacebar"]];
	}
}