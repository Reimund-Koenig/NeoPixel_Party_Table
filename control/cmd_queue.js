const CMD = require('./cmd')

class cmd_queue {
    constructor() {
        this.commandlist = [];
    }
    add(id, gamepad, command) {
        this.commandlist.push(new CMD(id, gamepad ,command));
    }
    getNext() {
        if(this.commandlist.length == 0) { return null; }
        return this.commandlist.shift();
    }
    len() {
        return this.commandlist.length;
    }

}
module.exports = cmd_queue;