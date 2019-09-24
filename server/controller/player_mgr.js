const Player = require('./player')

class player_mgr {
    constructor() {
        this.players = [];
    }

    add(socket_id) {
        var p = new Player(socket_id, this.players.length);
        this.players.push(p);
    }

    remove(socket_id) {
        // remove item at index
        this.players.splice(this.getPlayerId(socket_id), 1); 
    }

    addAndStartPlayers(app) {
        if(!app) {
            console.log("App unknown");
        }
        for( var i = 0; i < this.players.length; i++){ 
            console.log("Add player to the game");
            app.addPlayer(i);
            if (this.players[i].getUsername() != "") {
                console.log("Start player to the game");
                app.startPlayer(i);
            }
            
        }
    }

    getUsername(id) {
        this.players[id].getUsername();
    }

    initialisePlayer(socket_id, username, queuePos) {
        var id = this.getPlayerId(socket_id);
        this.players[id].setUsername(username);
        this.players[id].setQueuePosition(queuePos);
    }

    reduceQueuePositions() {
        for( var i = 0; i < this.players.length; i++){ 
            this.players[i].reduceQueuePos(1);
        }
    }

    getQueuePosition(socket_id) {
        console.log("player_mgr getQueuePosition " + socket_id);
        return this.players[this.getPlayerId(socket_id)].getQueuePosition();
    }

    numberOfPlayer() {    
        return this.players.length;
    }

    resetUsernames() {        
        for( var i = 0; i < this.players.length; i++){ 
            this.players[i].setUsername("");
        }
    }

    numberOfActivePlayer() {        
        var numberOfActivePlayers = 0;
        for( var i = 0; i < this.players.length; i++){ 
            if (this.players[i].getUsername() != "") {
                numberOfActivePlayers += 1; 
            }
        }
        return numberOfActivePlayers;
    }
    
    getPlayerId(socket_id) {
        for( var i = 0; i < this.players.length; i++){ 
            if (this.players[i].socket_id == socket_id) {
                return i; 
            }
        }
        return null;
    }
}
module.exports = player_mgr;
