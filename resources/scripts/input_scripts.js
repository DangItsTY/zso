//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Input Scripts
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

//	~~~~~~~TD~~~~~~*
//	Flybot: Used primarily for testing purposes. Allows free movement in all 4 directions
//	~~~~~~~TD~~~~~~*
var flybot_input = function() {
	basicleft_input();
	basicright_input();
	basicup_input();
	basicdown_input();
};

var survivor_input = function() {
	recordcontrolsequence();
	checkGround();
	left_input();
	right_input();
	jump_input();
	jumpreset_input();
	action1_input();
	action2_input();
	action3_input();
	releaseAction1_input();
	releaseAction2_input();
	releaseAction3_input();
	releaseSpacebar_input();
};