let socket = io();

console.log("Loaded player_list.js");

socket.on('connected', function(number_of_players) {
    console.log("connected to socket");
    document.getElementById("number_of_player").textContent =
        "Number of Player: " + String(number_of_players)
});

socket.on('disconnected', function(number_of_players) {
    console.log("disconnected to socket");
    document.getElementById("number_of_player").textContent =
        "Number of Player: " + String(number_of_players)
});