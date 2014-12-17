//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Objects
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

var object = function(x, y) {
	//	This is a basic template for all objects. You can follow this template when creating new objects.

	//	~~~~~~~*~~~~~~~*
	//	General Fields
	//	~~~~~~~*~~~~~~~*
	this.name = "object";	//	Name the object. This should be the same as the variable name.
	this.type = "neutral";	//	Give the object a type. Example: enemy, player, neutral, tile
	this.description = "This is a basic object. This is a good example of what objects should follow.";	//	Describe the object.
	this.x = x;		//	The x position.
	this.y = y;		//	The y position.
	this.size = 16;		//	The size of the object in terms of a square (example: 16x16). Usually reflects size of the image (in pixels).
	this.imageX = 0;	//	The x location of the object on the image. Used for spritesheets.
	this.imageY = 0;	//	The y location of the object on the image. Used for spritesheets.
	this.image = new Image();		//	Create an image associated with this object.
	this.image.src = "resources/images/square_red.png";		//	The image source for this object.
	this.collisionType = "transparent";			//	The collision type of the object, used for collision management.
	this.runInput = function() { flybot_input(); };		//	Input scripts go here. Aka player control scripts. Leave this blank if the object is an NPC.
	this.act = function(object) { };		//	Act scripts that make the object "alive" go here. For example, AI scripts go here.
	this.resolve = function(object) { };		//	Resolve scripts go here. These are used to resolve any conflicts that may occur during the Act stage.
	
	//	~~~~~~~*~~~~~~~*
	//	Typical fields for a typical fighting moving object
	//	~~~~~~~*~~~~~~~*
	this.health;		//	The amount of health a unit has until it is dead.
	this.damage;		//	The amount of damage a unit deals
	this.range;			//	The attack range
	this.attackspeed;	//	The attack speed as 1/attackspeed attacks per second. Example: 3 means an attack every 3 seconds.
	this.attacktimer;	//	A timer used for attack animation, delaying an attack, etc.
	this.speed;			//	Movement speed in terms of pixels per second.
	this.target;		//	The target the unit is focused on attacking/doing some action.
	this.readytoattack;	//	If ready to inflict damage, this is true.
	this.readytodie = false;	//	If true, this object is ready to die. Note: If true, the object does not act or get drawn
	
	oCount++;		//	Used to automatically increment the counter variable holding objects in objectList.
	
	this.direction = 1;	// -1 left, 1 right
};

var flybot = function(x, y) {
	this.name = "flybot";
	this.type = "neutral";
	this.description = "A fast bot with no collision. Useful when doing testing and you want to fly around the map, so to speak.";
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/square_red.png";
	this.collisionType = "transparent";
	this.runInput = function() { flybot_input(); };
	this.act = function(object) { };
	this.resolve = function(object) { };
	oCount++;
	
	this.speed = 256;
};

var gravity = function(x, y) {
	this.name = "gravity";
	this.type = "neutral";
	this.description = "Gravity. Makes all objects behave by the rules of the mighty gravitational force.";
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { actgravity(); };
	this.resolve = function(object) { };
	oCount++;	
};

//	Physics
//	- Singleton object
//	- Controls the behavior of physics in the game
//	- Gravity, Friction, Velocity
var physics = function(x, y) {
	this.name = "physics";
	this.type = "neutral";
	this.description = "Controls gravity, friction, and velocity";
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { gravity_act(); friction_act(); velocity_act(); };
	this.resolve = function(object) { };
	
	this.gravityForce = 0.3;
	this.vX = 0;
	this.vY = 0;
	this.readytodie = false;
	
	oCount++;	
}

var camera = function(x, y) {
	this.name = "gravity";
	this.type = "neutral";
	this.description = "Gravity. Makes all objects behave by the rules of the mighty gravitational force.";
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { actcamera(); };
	this.resolve = function(object) { };
	
	this.vX = 0;
	this.vY = 0;
	
	this.readytodie = false;
	
	oCount++;	
};

var spawner = function(x, y) {
	this.name = "spawner";
	this.type = "neutral";
	this.description = "Spawn more hungry zombies.";
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { spawn_act(object); };
	this.resolve = function(object) { };
	
	this.vX = 0;
	this.vY = 0;
	
	this.readytodie = false;
	this.spawnCount = 0;
	this.spawnMax = 2.0;
	
	oCount++;	
};

var survivor = function(x, y) {
	//	~~~~~~~*~~~~~~~*
	//	General Fields
	//	~~~~~~~*~~~~~~~*
	this.name = "survivor";
	this.type = "player";
	this.description = "A survivor of the zombie apocalypse. Controlled by a player";
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/player.png";
	this.collisionType = "solid";
	this.runInput = function() { survivor_input(); die_act(object); };
	this.act = function(object) { };
	this.resolve = function(object) { };
	
	//	~~~~~~~*~~~~~~~*
	//	Property Fields
	//	~~~~~~~*~~~~~~~*
	this.health = 10;
	this.damage = 1;
	this.range;
	this.attackspeed;
	this.attacktimer;
	this.target;
	this.readytoattack;
	this.readytodie = false;
	this.speed = 256;
	this.weight = 16;
	this.airtimer = 0.0;
	
	this.jumpTimer = 0.0;
	this.jumpSpeed = 192;
	this.jumpDuration = 5;
	this.jumpReady = true;
	
	this.doubleJumpTimer = 0.0;
	this.doubleJumpSpeed = 256;
	this.doubleJumpDuration = 1.0;
	this.doubleJumpReady = false;
	
	this.jumpCount = 0;
	this.jumpMax = 2;
	
	this.vX = 0;
	this.vY = 0;
	
	this.direction = -1;
	
	oCount++;
};

var zombie = function(x, y) {
	//	~~~~~~~*~~~~~~~*
	//	General Fields
	//	~~~~~~~*~~~~~~~*
	this.name = "zombie";
	this.type = "enemy";
	this.description = "Braaaaaainsssssss";
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/zombie.png";
	this.collisionType = "solid";
	this.runInput = function() { };
	this.act = function(object) { follow_act(object); wander_act(object); die_act(object); attackready_act(object); };
	this.resolve = function(object) { attack_act(object); };
	
	//	~~~~~~~*~~~~~~~*
	//	Property Fields
	//	~~~~~~~*~~~~~~~*
	this.health = 1;
	this.damage = 1;
	this.range = 16;
	//this.attackspeed = 1;
	//this.attacktimer = 1;
	this.target;
	this.readytoattack;
	this.readytodie = false;
	this.speed = 0.3;
	this.weight = 16;
	this.airtimer = 0.0;
	
	this.vX = 0.3;
	this.vY = 0;
	
	this.attackcount = 0;
	this.attacktimer = 1;
	
	this.wandercount = 0;
	this.wandertimer = 3;
	this.behavior = "follow";
	
	oCount++;
};

var bullet = function(x, y) {
	//	~~~~~~~*~~~~~~~*
	//	General Fields
	//	~~~~~~~*~~~~~~~*
	this.name = "bullet";
	this.type = "player";
	this.description = "A bullet that flies";
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/bullet.png";
	this.collisionType = "solid";
	this.runInput = function() { };
	this.act = function(object) { lifetime_act(object); };
	this.resolve = function(object) { shoot_act(object); };
	
	//	~~~~~~~*~~~~~~~*
	//	Property Fields
	//	~~~~~~~*~~~~~~~*
	this.health = 1;
	this.damage = 1;
	this.range = 16;
	this.attackspeed;
	this.attacktimer;
	this.target;
	this.readytoattack;
	this.readytodie = false;
	this.speed = 256;
	this.weight = 0;
	this.airtimer = 0.0;
	
	this.vX = 0;
	this.vY = 0;
	
	this.lifecount = 0;
	this.lifetime = 3;
	
	oCount++;
};

var knife = function(x, y) {
	//	~~~~~~~*~~~~~~~*
	//	General Fields
	//	~~~~~~~*~~~~~~~*
	this.name = "knife";
	this.type = "player";
	this.description = "A knife it";
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/knife.png";
	this.collisionType = "solid";
	this.runInput = function() { };
	this.act = function(object) { lifetime_act(object); meleeFollow_act(object); };
	this.resolve = function(object) { shoot_act(object); };
	
	//	~~~~~~~*~~~~~~~*
	//	Property Fields
	//	~~~~~~~*~~~~~~~*
	this.health = 1;
	this.damage = 1;
	this.range = 16;
	this.attackspeed;
	this.attacktimer;
	this.target;
	this.readytoattack;
	this.readytodie = false;
	this.speed = 0;
	this.weight = 0;
	this.airtimer = 0.0;
	
	this.vX = 0;
	this.vY = 0;
	
	this.lifecount = 0;
	this.lifetime = 1;
	
	oCount++;
};

var barricade = function(x, y) {
	//	~~~~~~~*~~~~~~~*
	//	General Fields
	//	~~~~~~~*~~~~~~~*
	this.name = "barricade";
	this.type = "player";
	this.description = "Barricades prevent zombies from moving";
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/barricade.png";
	this.collisionType = "solid";
	this.runInput = function() { };
	this.act = function(object) { die_act(object); };
	this.resolve = function(object) { stop_act(object); };
	
	//	~~~~~~~*~~~~~~~*
	//	Property Fields
	//	~~~~~~~*~~~~~~~*
	this.health = 3;
	this.damage = 1;
	this.range = 16;
	this.attackspeed;
	this.attacktimer;
	this.target;
	this.readytoattack;
	this.readytodie = false;
	this.speed = 0;
	this.weight = 4;
	this.airtimer = 0.0;
	
	this.vX = 0;
	this.vY = 0;
	
	oCount++;
};

var tile = function(x, y, type) {
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/grass.png";
	this.collisionType = "solid";
	//this.energy = 0;
	//this.energyObject = new energy(this);
	tCount++;
	
	switch (type) {
		case "grass1":
			this.image.src = "images/grass1.png";
			break;
		case "tree":
			this.image.src = "images/tree.png";
			break;
		case "sky":
			this.image.src = "images/sky.png";
			this.collisionType = "transparent";
			break;
		default:
	}
};

var forestbg = function(x, y) {
	this.x = x;
	this.y = y;
	this.size = 2600;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/forestbg2.png";
	this.collisionType = "parallax";
	tCount++;
};