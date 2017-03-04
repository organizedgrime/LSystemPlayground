// Initialize global variables
var canv, properties, lsystem, rules, hue, pos;
var squareProperties = {angle: Math.PI/2, distance: 1000, divisor: 4};
var exampleindex = 0;
var examples = [
	new LSystem('F-F-F-F', {'F': 'FF-F-F-F-F-F+F'}, squareProperties),
	new LSystem('F-F-F-F', {'F': 'FF-F-F-F-FF'}, squareProperties),
	new LSystem('F-F-F-F', {'F': 'FF-F+F-F-FF'}, squareProperties),
	new LSystem('F-F-F-F', {'F': 'FF-F--F-F'}, squareProperties),
	new LSystem('F-F-F-F', {'F': 'F-FF--F-F'}, squareProperties),
	new LSystem('F-F-F-F', {'F': 'F-F+F-F-F'}, squareProperties),
	new LSystem('-L', {'L': 'LF+RFR+FL-F-LFLFL-FRFR+', 'R': '-LFLF+RFRFR+F+RF-LFL-FR'}, squareProperties),
	new LSystem('-L', {'L': 'LFLF+RFR+FLFL-FRF-LFL-FR+F+RF-LFL-FRFRFR+', 'R': '-LFLFLF+RFR+FL-F-LF+RFR+FLF+RFRF-LFL-FRFR'}, squareProperties)
];

var initCanvas = function() {
	// Initialize canvases
	canv = document.getElementById("canv"), ctx = canv.getContext("2d");

	// Set dimensions to fullscreen
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;

	pos = [canv.width/2.5, canv.height/4];

	configureEvents();

	newSystem();
	requestAnimationFrame(animationLoop);
};

var newSystem = function() {
	lsystem = examples[exampleindex];
	maxIterations = 4;
	for(var i = 0; i < maxIterations; i++) {
		lsystem.iterate();
		lsystem.properties.distance /= lsystem.properties.divisor;
	}
};

var drawLine = function(turtle) {
	ctx.beginPath();
	ctx.moveTo(turtle.state[0], turtle.state[1]);
	
	turtle.state[0] += Math.sin(turtle.state[2]) * lsystem.properties.distance;
	turtle.state[1] += Math.cos(turtle.state[2]) * lsystem.properties.distance;
	
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
			turtle.stack.push(JSON.parse(JSON.stringify(turtle.state)));
			break;
		case ']':
			turtle.state = turtle.stack.pop();
			break;
		}
	}
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
