// Initialize global variables
var canv, lsystem, hue, pos, gui, distance, maxIterations;
var exampleindex = 0;
var examples = [
	new LSystem('F-F-F-F-F-F', {'F':'F-F++F-F'}, {angle: Math.PI/3, size: 55, defit: 4}),
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



	newSystem();
	configureEvents();
	requestAnimationFrame(animationLoop);
};

var newSystem = function() {
	//console.log("final size: " + lsystem.properties.size);
	lsystem = Object.create(examples[exampleindex]);
	maxIterations = lsystem.properties.defit;
	if(gui)
		gui.destroy();
	configureGUI();
	runSystem();
};

var runSystem = function() {
	lsystem.sentence = lsystem.axiom;
	distance = lsystem.properties.size;
	for(var i = 0; i < maxIterations; i++) {
		lsystem.iterate();
		distance /= 2;
	}


	pos = [canv.width/2, canv.height/2];
};

var drawLine = function(turtle) {
	ctx.beginPath();
	ctx.moveTo(turtle.state[0], turtle.state[1]);
	
	turtle.state[0] += Math.sin(turtle.state[2]) * distance;
	turtle.state[1] += Math.cos(turtle.state[2]) * distance;
	
	ctx.lineTo(turtle.state[0], turtle.state[1]);
	ctx.strokeStyle = rgbToHex(hsvToRgb(hue, 1, 1));
	ctx.stroke();
	ctx.closePath();
};

// Plant renderer obj
var renderer = function(lsystem) {
	var turtle = new Turtle(
		// Initial state
		[pos[0], pos[1], -Math.PI / 2]
	);
	hue = 0;
	for(var i = 0; i < lsystem.sentence.length; i++){
		switch(lsystem.sentence.charAt(i)) {
		case 'F':
			drawLine(turtle);
			hue += 0.0006;
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
	var datObj = {axiom: lsystem.axiom, rules: JSON.stringify(lsystem.rules), divisor: lsystem.properties.divisor};
	var itObj = {iterations: maxIterations};

	gui = new dat.GUI();

	// Re-run LSystem if parameters for iteration are changed
	var axiomCon = gui.add(lsystem, 'axiom');
	axiomCon.onFinishChange(function(value) {
		lsystem.axiom = datObj.axiom;
		runSystem();
	});
	var rulesCon = gui.add(datObj, 'rules');
	rulesCon.onFinishChange(function(value) {
		lsystem = new LSystem(lsystem.axiom, JSON.parse(datObj.rules), lsystem.properties);
		runSystem();
	});

	// Parameters that do not require re-instancing of LSystem
	var angleCon = gui.add(lsystem.properties, 'angle', 0, Math.PI);
	var iterationsCon = gui.add(itObj, 'iterations', 0, 15).step(1);
	iterationsCon.onFinishChange(function(value) {
		maxIterations = value;
		runSystem();
	});
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