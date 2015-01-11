//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Input Library
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

var recordcontrolsequence = function() {
	// I'm lazy so i'm just gonna put the keys in a for loop
	//	TyNote: becareful how ghosting behaves... controls might work differently on everyone's machines
	var temparray = [key["up"], key["down"], key["left"], key["right"], key["y"], key["x"], key["b"], key["a"], key["l"], key["r"], key["start"], key["select"]];
	var temp_i = 0;
	for (temp_i = 0; temp_i < temparray.length; temp_i++) {
		//	Hold Timer
		if (controlsequence_hold[temparray[temp_i]] > 0) {
			controlsequence_hold[temparray[temp_i]] += modifier;
		}
		if (temparray[temp_i] in keysDown) {
			//	Tap
			controlsequence_tap[temparray[temp_i]] += timerinit;
			if (controlsequence_tap[temparray[temp_i]] >= tap_register && controlsequence_tap[temparray[temp_i]] % tap_register < tap_speed) {
				pushpop(temparray[temp_i], controlsequence);
				controlsequence_tap[temparray[temp_i]] -= tap_register;
			} else if (controlsequence[0] != temparray[temp_i]) {
				pushpop(temparray[temp_i], controlsequence);
			}
			//	Hold
			controlsequence_hold[temparray[temp_i]] += timerinit;
		}
		else {
			controlsequence_hold[temparray[temp_i]] = 0;
			if (controlsequence_tap[temparray[temp_i]] < tap_register)
				controlsequence_tap[temparray[temp_i]] += tap_register;
		}
		//	Tap Timer
		if (controlsequence_tap[temparray[temp_i]] % tap_register >= tap_speed || controlsequence_tap[temparray[temp_i]] % tap_register == 0) {
			controlsequence_tap[temparray[temp_i]] = 0;
			
		} else {
			controlsequence_tap[temparray[temp_i]] += modifier;
		}
	}
};

var checkGround = function () {
	//	Detects whether or not you're touching the ground
	for (var j = 0; j < tileList.length; j++) {
		if (collidesWith(objectList[selectedPlayer], tileList[j])) {
			//	Floor collision
			if (objectList[selectedPlayer].y < tileList[j].y - (objectList[selectedPlayer].size*0.25) &&
					objectList[selectedPlayer].x > tileList[j].x - (objectList[selectedPlayer].size*0.75) && objectList[selectedPlayer].x < tileList[j].x + (objectList[selectedPlayer].size*0.75)) {										
				objectList[selectedPlayer].grounded = true;
				j = tileList.length;
			}
		} else if (j == tileList.length - 1) {
			objectList[selectedPlayer].grounded = false;
		}
	}
};

//	Move left
var left_input = function() {
	if (key["left"] in keysDown) {
		objectList[selectedPlayer].direction = -1;
		if (objectList[selectedPlayer].vX >= -objectList[selectedPlayer].speed) {
			objectList[selectedPlayer].vX -= objectList[selectedPlayer].speed * controlsequence_hold[key["left"]];
		}
	}
}

//	Move right
var right_input = function() {
	if (key["right"] in keysDown) {
		objectList[selectedPlayer].direction = 1;
		if (objectList[selectedPlayer].vX <= objectList[selectedPlayer].speed) {
			objectList[selectedPlayer].vX += objectList[selectedPlayer].speed * controlsequence_hold[key["right"]];
		}
	}
}

//	Move up
var up_input = function() {
	if (key["up"] in keysDown && controlsequence[0] == key["up"]) {
		objectList[selectedPlayer].y -= objectList[selectedPlayer].speed * modifier;
	}
}

//	Move down
var down_input = function() {
	if (key["down"] in keysDown && controlsequence[0] == key["down"]) {
		objectList[selectedPlayer].y += objectList[selectedPlayer].speed * modifier;
	}
}

//	Jump
var jump_input = function() {
	if (key["b"] in keysDown && controlsequence[0] && controlsequence_hold[key["b"]] < objectList[selectedPlayer].jumpDuration && objectList[selectedPlayer].jumpCount < objectList[selectedPlayer].jumpMax - 1) {
		objectList[selectedPlayer].vY = -objectList[selectedPlayer].jumpSpeed * modifier;
		if (controlsequence_hold[key["b"]] == timerinit) {
			objectList[selectedPlayer].jumpCount++;
		}
	}
	/*
	if (key["b"] in keysDown && controlsequence[0] == key["b"] && controlsequence_hold[key["b"]] == 0.0 && objectList[selectedPlayer].jumpCount < objectList[selectedPlayer].jumpMax) {
		objectList[selectedPlayer].vY = -objectList[selectedPlayer].jumpSpeed * modifier;
		objectList[selectedPlayer].jumpCount++;
		console.log("success!");
	}
	*/
	/*
	if (key["spacebar"] in keysDown && !(key["spacebar"] in keysUp) && objectList[selectedPlayer].jumpCount < objectList[selectedPlayer].jumpMax) {
		objectList[selectedPlayer].vY = -objectList[selectedPlayer].jumpSpeed * modifier;
		objectList[selectedPlayer].jumpCount++;
		keysUp[key["spacebar"]] = true;
	}
	*/
}

var jumpreset_input = function () {
	if (objectList[selectedPlayer].grounded) {
		objectList[selectedPlayer].jumpCount = 0;
	}
};

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