const Player = require('../util/player')

class player_mgr {
    constructor() {
        this.players = [];
    }
    add(id) {
        var p = new Player(id);
        this.players.push(p);
    }

    remove(id) {
        this.players.splice(this._getPlayerById(id), 1); 
    }

    getUsername(id) {
        this.players[this._getPlayerById(id)].getName();
    }

    setUsername(id, username) {
        this.players[this._getPlayerById(id)].setName(username);
    }
    
    _getPlayerById(id) {
        for( var i = 0; i < this.players.length; i++){ 
            if (this.players[i].id == id) {
                return i; 
            }
        }
        return null;
    }
}
module.exports = player_mgr;
