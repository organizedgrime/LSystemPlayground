// Initialize global variables
var canv, ctx, lsystem, gui;
var guiproperties = { hue: 0, dhue: 0, pos: [], zoom: 50, iterations: 0, rotation: 0 };
var afolder, lfolder;

var initCanvas = function() {
	// Initialize canvases
	canv = document.getElementById("canv"), ctx = canv.getContext("2d");

	// Set dimensions to fullscreen
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;

	lsystem = new LSystem('', '', '{}', {angle: 0});
	configureGUI();
	configureEvents();

	runSystem();
	requestAnimationFrame(animationLoop);
};

var runSystem = function() {
	// Resets the sentence of the lsystem so that new rules are not applied to the existing sentence
	lsystem.sentence = lsystem.axiom;

	// Iterate the lsystem as specified
	for(var i = 0; i < guiproperties.iterations; i++) {
		lsystem.iterate();
	}

	// Reset current location in case user has been panning
	guiproperties.pos = [canv.width/2, canv.height/2];
};

var drawLine = function(turtle) {
	// Move to start point
	ctx.beginPath();
	ctx.moveTo(turtle.state[0], turtle.state[1]);
	
	// Determine end point/new pos
	var rads = turtle.state[2] * (Math.PI / 180);
	turtle.state[0] += Math.sin(rads) * guiproperties.zoom;
	turtle.state[1] += Math.cos(rads) * guiproperties.zoom;
	
	// Draw line to end point
	ctx.lineTo(turtle.state[0], turtle.state[1]);
	ctx.strokeStyle = rgbToHex(hsvToRgb(guiproperties.hue, 1, 1));
	ctx.stroke();
	ctx.closePath();
};

// Renderer obj
var renderer = function(lsystem) {
	var turtle = new Turtle(
		// Initial state before any system is drawn
		[guiproperties.pos[0], guiproperties.pos[1], guiproperties.rotation]
	);
	guiproperties.hue = 0;
	for(var i = 0; i < lsystem.sentence.length; i++) {
		if(lsystem.constants.includes(lsystem.sentence.charAt(i))) {
			// Draw line, move forward, and adjust hue
			drawLine(turtle);
			guiproperties.hue += (guiproperties.dhue / 10000);
		}
		else {
			switch(lsystem.sentence.charAt(i)) {
			// - is rotate left and + is rotate right
			case '-':
				turtle.state[2] -= lsystem.properties.angle;
				break; 
			case '+':
				turtle.state[2] += lsystem.properties.angle;
				break;
			// [ is push turtle state to stack and ] is pop from it
			case '[':
				turtle.stack.push(JSON.parse(JSON.stringify(turtle.state)));
				break;
			case ']':
				turtle.state = turtle.stack.pop();
				break;
			}
		}
	}
};

var configureGUI = function() {
	// Initialize GUI and load in examples
	gui = new dat.GUI({ load: getExamples(), preset: 'Koch Snowflake' });
	gui.remember(lsystem.properties);
	gui.remember(lsystem);
	gui.remember(guiproperties);

	// LSystem folder containing variables pertinent to the construction of the system
	lfolder = gui.addFolder('LSystem');
	lfolder.add(lsystem, 'axiom').onFinishChange(function(){runSystem();});
	lfolder.add(lsystem, 'constants');
	lfolder.add(lsystem, 'rules').onFinishChange(function(){runSystem();});
	lfolder.add(lsystem.properties, 'angle', 0, 180);
	
	// Appearance folder containing variables pertinent to the user experience
	afolder = gui.addFolder('Appearance');
	afolder.add(guiproperties, 'dhue', 0, 100);
	afolder.add(guiproperties, 'iterations', 0, 16).step(1).onFinishChange(function(){runSystem();});
	afolder.add(guiproperties, 'zoom', 0, 100);
	afolder.add(guiproperties, 'rotation', 0, 360);
};

// Start animation loop
var animationLoop;
(function(){
animationLoop = function() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canv.width, canv.height);
	renderer(lsystem);
	requestAnimationFrame(animationLoop);
};
})();