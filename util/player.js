class player {
    constructor(socket_id, id) {
        this.socket_id = socket_id;
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
