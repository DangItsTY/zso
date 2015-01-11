//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Library
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

var drawList = function(list) {
	for (var i = 0; i < list.length; i++) {
		//	Parameters: image, image x, image y, image width, image height, location x, location y, width, height
		//	TyNote: This draws all objects to its center
		//	TyNote: On the spritesheet, y refers to states and x refers to animation frames
		//	TyNote: Location of camera is top left coordinate
		
		//	TyTest - New draw method with new actcamera method
		if (list[i].collisionType == "parallax") {
			ctxOff.drawImage(list[i].image, list[i].imageX*list[i].size, list[i].imageY*list[i].size, list[i].size, list[i].size, (list[i].x-cameraX)/4, (list[i].y-cameraY)/4, list[i].size, list[i].size)
		} else if (list[i].x < cameraX+CANVASWIDTH+IMAGESIZE && list[i].y < cameraY+CANVASHEIGHT+IMAGESIZE && list[i].x > cameraX-IMAGESIZE && list[i].y > cameraY-IMAGESIZE) {
			ctxOff.drawImage(list[i].image, list[i].imageX*list[i].size, list[i].imageY*list[i].size, list[i].size, list[i].size, list[i].x-cameraX-(list[i].size/2), list[i].y-cameraY-(list[i].size/2), list[i].size, list[i].size);
		}
	}
};

var collidesWith = function(object, target) {
	if (object.collisionType == "transparent" || target.collisionType == "transparent")
		return false;
	else if (object.x <= target.x + object.size && object.x >= target.x - object.size &&
		object.y <= target.y + object.size && object.y >= target.y - object.size) {
		return true;
	}
	else {
		return false;
	}
};

var isInRange = function (object, target, rangeSize) {
//	~~~~~~~*~~~~~~~*
//	Requirements:
//	Description: Returns true if object is in range of the target. rangeSize indicates size of the boundaries to check if in range.
//	~~~~~~~*~~~~~~~*
	if (object.x <= target.x + rangeSize && object.x >= target.x - rangeSize &&
		object.y <= target.y + rangeSize && object.y >= target.y - rangeSize) {
		return true;
	}
	else {
		return false;
	}
};

var roll = function (min, max) {
//	Rolls a random number between min and max both inclusive
	return (Math.floor(Math.random() * (max-min+1)) + min);
};

var findObject = function (list, objectName) {
	//	Finds the first occurance of objectName in given list
	var result = -1;
	for (var i = 0; i < list.length; i++) {
		if (list[i].name == objectName) {
			result = i;
			return result;
		}
	}
	return result;
};

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function rollFrequency(array) {
//	Does a dice roll based on frequency
//	Returns position of item in array
var target = roll(0, 100) / 100;
var total = array.reduce(function(sum, num){ return sum + num }, 0);
var lower = 0;
var percent = 0;
var iterator = 0;
var found = false;	//	Not sure if I actually need this
	while (!found) {
		if (iterator == array.length - 1) {
			found = true;
			return iterator;
		}
		percent = (array[iterator] / total) + lower;
		if (lower <= target && target <= percent) {
			found = true;
			return iterator;
		}
		else {
			lower = percent;
			iterator += 1;
		}
	}
}

function pushpop(item, array) {
//	Functions like a push pop
//	Works on an array of fixed size
//	Basically, you put the new element inside the bottom, pushing everything up (the last element is removed)
	var pop_i = 0;
	for (pop_i = array.length-1; pop_i > 0; pop_i--) {
		array[pop_i] = array[pop_i-1];
	}
	array[0] = item;
};