function configureEvents() {
	addEvent(window, 'wheel', onScroll);
	addEvent(window, 'mousemove', onMouseMove);
}

function addEvent(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

function pan(deltaX, deltaY) {
	guiproperties.pos[0] += deltaX;
	guiproperties.pos[1] += deltaY;	
}

function zoom(factor) {
	guiproperties.zoom /= factor;
	afolder.__controllers[2].updateDisplay();
}

function onMouseMove() {
	if (event.buttons === 1) {
		pan(event.movementX, event.movementY);
	}
}

function onScroll() {
	zoomspeed = 0.05;
	if(event.deltaY < 0) {
		zoom(1 - zoomspeed);
	}
	else {
		zoom(1 + zoomspeed);
	}
}