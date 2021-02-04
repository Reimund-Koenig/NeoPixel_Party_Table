console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available": "not available");
var username = "";
var socket = io();
var socket_id = "";
// console.log(socket);
$(function () {
    $('form').on("submit", function(){
        username = $('#new_player').val();
        console.log("Send Message: " + username);
        socket.emit("new_player", username);
        return false;
    });
    socket.on('connected', function(call_socket_id) {
        if(socket_id == "") {
            socket_id = call_socket_id;
            console.log("Connected to Table with id: " + call_socket_id)
            if(username != "") {
                console.log("Reconnected user " + username + " to Table with id: " + call_socket_id)
                document.getElementById("informationText").innerHTML = "Reconnect...";
                socket.emit("reconnect_player", username);
            }
        }
    });
    socket.on('ready', function(call_socket_id, queuePos){
        if(socket_id != call_socket_id) { return; }
        console.log("Player " + socket_id + " is ready");
        document.getElementById("informationText").innerHTML = "Queue Pos: " + queuePos;
        if(queuePos > 0) {
            document.getElementById("gamepad").style.display = "none";
            document.getElementById("login").style.display = "block";
            setTimeout(function() { socket.emit("start"); }, 1000);
        } else {
            document.getElementById("gamepad").style.display = "block";
            document.getElementById("login").style.display = "none";
        }
    });
    socket.on('changeMaxPlayer', () => {
        console.log("changeMaxPlayer");
        socket.emit("reconnect_player", username);
    });
    socket.on('disconnect', () => {
        document.getElementById("gamepad").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("informationText").innerHTML = "Disconnected";
        socket_id = "";
    });
});
