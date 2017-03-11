// Initialize global variables
var canv, lsystem, gui;
var guiproperties = { hue: 0, dhue: 0, pos: [], distance: 0, iterations: 0};
var exampleindex = 0;
var examples = [
	new LSystem('F-F-F-F-F-F', {'F':'F-F++F-F'}, {angle: Math.PI/3, size: 55}),
	new LSystem('FX', {'X': 'X+YF+', 'Y': '-FX-Y'}, {angle: Math.PI/2, size: 17000, defit: 11}),
	new LSystem('+X', {'X': 'F−[[X]+X]+F[+FX]−X', 'F': 'FF'}, {angle: 25 * (Math.PI / 180), size: 400, defit: 6}),
	new LSystem('F-F-F-F', {'F': 'FF-F-F-F-F-F+F'}, {angle: Math.PI/2, size: 70, defit: 4}),
	new LSystem('F-F-F-F', {'F': 'FF-F-F-F-FF'}, {angle: Math.PI/2, size: 100, defit: 4}),
	new LSystem('F-F-F-F', {'F': 'FF-F+F-F-FF'}, {angle: Math.PI/2, size: 100, defit: 4}),
	new LSystem('F-F-F-F', {'F': 'FF-F--F-F'}, {angle: Math.PI/2, size: 100, defit: 4}),
	new LSystem('F-F-F-F', {'F': 'F-FF--F-F'}, {angle: Math.PI/2, size: 250, defit: 4}),
	new LSystem('F-F-F-F', {'F': 'F-F+F-F-F'}, {angle: Math.PI/2, size: 250, defit: 4}),
	new LSystem('-L', {'L': 'LF+RFR+FL-F-LFLFL-FRFR+', 'R': '-LFLF+RFRFR+F+RF-LFL-FR'}, {angle: Math.PI/2, size: 100, defit: 4})
];

var initCanvas = function() {
	// Initialize canvases
	canv = document.getElementById("canv"), ctx = canv.getContext("2d");

	// Set dimensions to fullscreen
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;

	lsystem = new LSystem('', '{}', {angle: 0, size: 55});
	configureGUI();
	runSystem();
	configureEvents();
	requestAnimationFrame(animationLoop);
};

var runSystem = function() {
	lsystem.sentence = lsystem.axiom;
	guiproperties.distance = lsystem.properties.size;
	for(var i = 0; i < guiproperties.iterations; i++) {
		lsystem.iterate();
		//console.log(lsystem.rules);
		guiproperties.distance /= 2;
	}

	guiproperties.pos = [canv.width/2, canv.height/2];
};

var drawLine = function(turtle) {
	ctx.beginPath();
	ctx.moveTo(turtle.state[0], turtle.state[1]);
	
	turtle.state[0] += Math.sin(turtle.state[2] * (Math.PI / 180)) * guiproperties.distance;
	turtle.state[1] += Math.cos(turtle.state[2] * (Math.PI / 180)) * guiproperties.distance;
	
	ctx.lineTo(turtle.state[0], turtle.state[1]);
	ctx.strokeStyle = rgbToHex(hsvToRgb(guiproperties.hue, 1, 1));
	ctx.stroke();
	ctx.closePath();
};

// Plant renderer obj
var renderer = function(lsystem) {
	var turtle = new Turtle(
		// Initial state
		[guiproperties.pos[0], guiproperties.pos[1], -Math.PI / 2]
	);
	guiproperties.hue = 0;
	for(var i = 0; i < lsystem.sentence.length; i++){
		switch(lsystem.sentence.charAt(i)) {
		case 'F':
			drawLine(turtle);
			guiproperties.hue += (guiproperties.dhue / 10000);
			break;
		case '-':
			turtle.state[2] += lsystem.properties.angle;
			break; 
		case '+':
			turtle.state[2] -= lsystem.properties.angle;
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
	gui = new dat.GUI({ load: getPresetJSON(), preset: 'Koch' });
	gui.remember(lsystem.properties);
	gui.remember(lsystem);
	gui.remember(guiproperties);

	var lfolder = gui.addFolder('LSystem');
	lfolder.add(lsystem, 'axiom').onFinishChange(function(){runSystem();});
	lfolder.add(lsystem, 'rules').onFinishChange(function(){runSystem();});
	lfolder.add(lsystem.properties, 'angle', 0, 180);
	
	var afolder = gui.addFolder('Appearance');
	afolder.add(guiproperties, 'dhue', 0, 10);
	afolder.add(guiproperties, 'iterations', 0, 16).step(1).onFinishChange(function(){runSystem();});
	afolder.add(guiproperties, 'distance', 0, 1000);
};

/*
	new LSystem("+X", {"X": "F−[[X]+X]+F[+FX]−X", "F": "FF"}, {angle: 25 * (Math.PI / 180), size: 400, defit: 6}),
	new LSystem("F-F-F-F", {"F": "FF-F-F-F-F-F+F"}, {angle: Math.PI/2, size: 70, defit: 4}),
	new LSystem("F-F-F-F", {"F": "FF-F-F-F-FF"}, {angle: Math.PI/2, size: 100, defit: 4}),
	new LSystem("F-F-F-F", {"F": "FF-F+F-F-FF"}, {angle: Math.PI/2, size: 100, defit: 4}),
	new LSystem("F-F-F-F", {"F": "FF-F--F-F"}, {angle: Math.PI/2, size: 100, defit: 4}),
	new LSystem("F-F-F-F", {"F": "F-FF--F-F"}, {angle: Math.PI/2, size: 250, defit: 4}),
	new LSystem("F-F-F-F", {"F": "F-F+F-F-F"}, {angle: Math.PI/2, size: 250, defit: 4}),
	new LSystem("-L", {"L": "LF+RFR+FL-F-LFLFL-FRFR+", "R": "-LFLF+RFRFR+F+RF-LFL-FR"}, {angle: Math.PI/2, size: 100, defit: 4})
*/

var getPresetJSON = function() {
	return {
		'preset': 'Koch',
		'closed': false,
		'remembered' : {
			'Koch': {
				'0': {
					'angle': 60
				},
				'1': {
					'axiom': 'F-F-F-F-F-F',
					'rules': '{"F":"F-F++F-F"}'
				},
				'2': {
					'iterations': 4,
					'dhue': 6,
					'distance': 55
				}
			},
			'Dragon': {
				'0': {
					'angle': 90
				},
				'1': {
					'axiom': 'FX',
					'rules': '{"X": "X+YF+", "Y": "-FX-Y"}'
				},
				'2': {
					'iterations': 11,
					'dhue': 4.2,
					'distance': 17
				}
			}
		},
		"folders": {
			"LSystem": {
			"preset": "Default",
			"closed": false,
			"folders": {}
			},
			"Appearance": {
			"preset": "Default",
			"closed": false,
			"folders": {}
			}
		}
	};
};


var animationLoop;
(function(){
animationLoop = function() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canv.width, canv.height);
	renderer(lsystem);
	requestAnimationFrame(animationLoop);
};
})();