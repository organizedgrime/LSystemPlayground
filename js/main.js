// Initialize global variables
var canv, lsystem, gui;
var guiproperties = { hue: 0, dhue: 0, pos: [], zoom: 0, iterations: 0, rotation: 0 };
var exampleindex = 0;
var examples = [
	new LSystem('F-F-F-F-F-F', {'F':'F-F++F-F'}, {angle: Math.PI/3, zoom: 55}),
	new LSystem('FX', {'X': 'X+YF+', 'Y': '-FX-Y'}, {angle: Math.PI/2, zoom: 17000, defit: 11}),
	new LSystem('+X', {'X': 'F−[[X]+X]+F[+FX]−X', 'F': 'FF'}, {angle: 25 * (Math.PI / 180), zoom: 400, defit: 6}),
	new LSystem('F-F-F-F', {'F': 'FF-F-F-F-F-F+F'}, {angle: Math.PI/2, zoom: 70, defit: 4}),
	new LSystem('F-F-F-F', {'F': 'FF-F-F-F-FF'}, {angle: Math.PI/2, zoom: 100, defit: 4}),
	new LSystem('F-F-F-F', {'F': 'FF-F+F-F-FF'}, {angle: Math.PI/2, zoom: 100, defit: 4}),
	new LSystem('F-F-F-F', {'F': 'FF-F--F-F'}, {angle: Math.PI/2, zoom: 100, defit: 4}),
	new LSystem('F-F-F-F', {'F': 'F-FF--F-F'}, {angle: Math.PI/2, zoom: 250, defit: 4}),
	new LSystem('F-F-F-F', {'F': 'F-F+F-F-F'}, {angle: Math.PI/2, zoom: 250, defit: 4}),
	new LSystem('-L', {'L': 'LF+RFR+FL-F-LFLFL-FRFR+', 'R': '-LFLF+RFRFR+F+RF-LFL-FR'}, {angle: Math.PI/2, zoom: 100, defit: 4})
];

var initCanvas = function() {
	// Initialize canvases
	canv = document.getElementById("canv"), ctx = canv.getContext("2d");

	// Set dimensions to fullscreen
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;

	lsystem = new LSystem('', '{}', {angle: 0});
	configureGUI();
	runSystem();
	configureEvents();
	requestAnimationFrame(animationLoop);
};

var runSystem = function() {
	lsystem.sentence = lsystem.axiom;
	guiproperties.zoom = 50;
	for(var i = 0; i < guiproperties.iterations; i++) {
		lsystem.iterate();
		//console.log(lsystem.rules);
		guiproperties.zoom /= 2;
	}

	guiproperties.pos = [canv.width/2, canv.height/2];
};

var drawLine = function(turtle) {
	ctx.beginPath();
	ctx.moveTo(turtle.state[0], turtle.state[1]);
	
	turtle.state[0] += Math.sin(turtle.state[2] * (Math.PI / 180)) * guiproperties.zoom;
	turtle.state[1] += Math.cos(turtle.state[2] * (Math.PI / 180)) * guiproperties.zoom;
	
	ctx.lineTo(turtle.state[0], turtle.state[1]);
	ctx.strokeStyle = rgbToHex(hsvToRgb(guiproperties.hue, 1, 1));
	ctx.stroke();
	ctx.closePath();
};

// Plant renderer obj
var renderer = function(lsystem) {
	var turtle = new Turtle(
		// Initial state
		[guiproperties.pos[0], guiproperties.pos[1], guiproperties.rotation]
	);
	guiproperties.hue = 0;
	for(var i = 0; i < lsystem.sentence.length; i++){
		switch(lsystem.sentence.charAt(i)) {
		case 'F':
			drawLine(turtle);
			guiproperties.hue += (guiproperties.dhue / 10000);
			break;
		case 'G':
			drawLine(turtle);
			guiproperties.hue += (guiproperties.dhue / 10000);
			break;
		case '-':
			turtle.state[2] -= lsystem.properties.angle;
			break; 
		case '+':
			turtle.state[2] += lsystem.properties.angle;
			break;
		case '[':
			//console.log("before push: " + turtle.state);
			turtle.stack.push(JSON.parse(JSON.stringify(turtle.state)));
			break;
		case ']':
			turtle.state = turtle.stack.pop();
			//console.log("after pop: " + turtle.state);
			break;
		}
	}
};

var configureGUI = function() {
	gui = new dat.GUI({ load: getExamples(), preset: 'Koch' });
	gui.remember(lsystem.properties);
	gui.remember(lsystem);
	gui.remember(guiproperties);

	var lfolder = gui.addFolder('LSystem');
	lfolder.add(lsystem, 'axiom').onFinishChange(function(){runSystem();});
	lfolder.add(lsystem, 'rules').onFinishChange(function(){runSystem();});
	lfolder.add(lsystem.properties, 'angle', 0, 180);
	
	var afolder = gui.addFolder('Appearance');
	afolder.add(guiproperties, 'dhue', 0, 150);
	afolder.add(guiproperties, 'iterations', 0, 16).step(1).onFinishChange(function(){runSystem();});
	afolder.add(guiproperties, 'zoom', 0, 100);
	afolder.add(guiproperties, 'rotation', 0, 360);
};

/*
	new LSystem("F-F-F-F", {"F": "FF-F-F-F-F-F+F"}, {angle: Math.PI/2, zoom: 70, defit: 4}),
	new LSystem("F-F-F-F", {"F": "FF-F-F-F-FF"}, {angle: Math.PI/2, zoom: 100, defit: 4}),
	new LSystem("F-F-F-F", {"F": "FF-F+F-F-FF"}, {angle: Math.PI/2, zoom: 100, defit: 4}),
	new LSystem("F-F-F-F", {"F": "FF-F--F-F"}, {angle: Math.PI/2, zoom: 100, defit: 4}),
	new LSystem("F-F-F-F", {"F": "F-FF--F-F"}, {angle: Math.PI/2, zoom: 250, defit: 4}),
	new LSystem("F-F-F-F", {"F": "F-F+F-F-F"}, {angle: Math.PI/2, zoom: 250, defit: 4}),
	new LSystem("-L", {"L": "LF+RFR+FL-F-LFLFL-FRFR+", "R": "-LFLF+RFRFR+F+RF-LFL-FR"}, {angle: Math.PI/2, zoom: 100, defit: 4})
*/

var animationLoop;
(function(){
animationLoop = function() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canv.width, canv.height);
	renderer(lsystem);
	requestAnimationFrame(animationLoop);
};
})();