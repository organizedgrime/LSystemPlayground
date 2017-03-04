function configureEvents() {
	//addEvent(window, 'resize', onResizeWindow);
	addEvent(window, 'keydown', onKeyDown);
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
	pos[0] += deltaX;
	pos[1] += deltaY;	
}

function zoom(factor) {
	lsystem.properties.distance /= factor;
}

function onMouseMove() {
	if (event.buttons === 1) {
		pan(event.movementX, event.movementY);
	}
}

function onScroll() {
	if(event.deltaY < 0) {
		zoom(0.95);
	}
	else {
		zoom(1.05);
	}
}

function onKeyDown() {
	switch(event.keyCode) {
		case 38:
			exampleindex++;
			newSystem();
			break;
		case 40:
			exampleindex--;
			newSystem();
			break;
	}
}