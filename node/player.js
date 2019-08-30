class player {
    constructor(id) {
        var self = this;
        this.id = id;
        this.username = "";
        this.admin = false;
        this.connected = false;
    }
    setName(name) {
        this.username = name;
    }
    getName() {
        return this.username;
    }
}
module.exports = player;
