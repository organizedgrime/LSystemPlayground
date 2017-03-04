// Initialize global variables
var canv, properties, lsystem, rules, hue;

var initCanvas = function() {
	// Initialize canvases
	canv = document.getElementById("canv"), ctx = canv.getContext("2d");

	// Set dimensions to fullscreen
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;

	newSystem();
	requestAnimationFrame(animationLoop);
};

var newSystem = function() {
	// Setup rules
	rules = {
		'F': new WeightedList({
			'FF-F-F-F-F-F+F' : 1
		})
	};

	lsystem = new LSystem('F-F-F-F', rules), maxIterations = 4;

	properties = { 
		angle: Math.PI/2,
		distance: 1000
	};

	for(var i = 0; i < maxIterations; i++) {
		lsystem.iterate();
		properties.distance /= 4;
	}
};

var drawLine = function(turtle) {
	ctx.beginPath();
	ctx.moveTo(turtle.state[0], turtle.state[1]);
	
	turtle.state[0] += Math.sin(turtle.state[2]) * properties.distance;
	turtle.state[1] += Math.cos(turtle.state[2]) * properties.distance;
	
	ctx.lineTo(turtle.state[0], turtle.state[1]);
	ctx.strokeStyle = rgbToHex(hsvToRgb(hue, 1, 1));
	ctx.stroke();
	ctx.closePath();
};

// Plant renderer obj
var renderer = function(lsystem) {
	var turtle = new Turtle(
		// Initial state
		[canv.width/2.5, canv.height/4, -Math.PI / 2]
	);
	hue = 0;
	for(var i = 0; i < lsystem.sentence.length; i++){
		switch(lsystem.sentence.charAt(i)) {
		case 'F':
			drawLine(turtle);
			hue += 0.00006;
			break;
		case '-':
			turtle.state[2] += properties.angle;
			break; 
		case '+':
			turtle.state[2] -= properties.angle;
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
