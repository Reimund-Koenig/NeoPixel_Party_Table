
var positionRight = "";
var lastPositionRight = "";

var joystick_right = new VirtualJoystick({
    container: document.getElementById('main'),
    mouseSupport: false,
    strokeStyle: 'cyan',
    limitStickTravel: true,
    stickRadius: 120
});

joystick_right.addEventListener('touchStartValidation', function(event){
    var touch = event.changedTouches[0];
    if( touch.pageX < window.innerWidth/2 ) return false;
    return true
});

joystick_right.addEventListener('touchStart', function(event){
    socket.emit("right", "push", username);
    positionRight = "";
    lastPositionRight = "";
})

joystick_right.addEventListener('touchMove', function(event){
    if(positionRight == lastPositionRight) { return; }
    lastPositionRight = positionRight;
    socket.emit("right", positionRight, username);
})
joystick_right.addEventListener('touchEnd', function(event){
    socket.emit("right", "release", username);
})

var positionLeft = "";
var lastPositionLeft = "";

var joystick_left = new VirtualJoystick({
    container: document.getElementById('main'),
    mouseSupport: false,
    strokeStyle: 'orange',
    limitStickTravel: true,
    stickRadius: 120
});

joystick_left.addEventListener('touchStartValidation', function(event){
    var touch = event.changedTouches[0];
    if( touch.pageX >= window.innerWidth/2 ) return false;
    return true
});

joystick_left.addEventListener('touchStart', function(event){
    socket.emit("left", "push", username);
    positionLeft = "";
    lastPositionLeft = "";
})

joystick_left.addEventListener('touchMove', function(event){
    if(positionLeft == lastPositionLeft) { return; }
    lastPositionLeft = positionLeft;
    socket.emit("left", positionLeft, username);
})

joystick_left.addEventListener('touchEnd', function(event){
    socket.emit("left", "release", username);
})

setInterval(function(){
    if(joystick_left.up())    { positionLeft = "up";   }
    else if(joystick_left.down())  { positionLeft = "down";  }
    else if(joystick_left.left())  { positionLeft = "left";  }
    else if(joystick_left.right())  { positionLeft = "right";  }

    if(joystick_right.up())   { positionRight = "up";  }
    else if(joystick_right.down())  { positionRight = "down"; }
    else if(joystick_right.left())  { positionRight = "left";  }
    else if(joystick_right.right()) { positionRight = "right"; }
}, 20);

