const CMD = require('../util/cmd')

class cmd_queue {
    constructor() {
        this.commandlist = [];
    }
    add(id, command) {
        this.commandlist.push(new CMD(id,command));
    }
    getNext() {
        if(this.commandlist.length == 0) { return new CMD("",""); }
        return this.commandlist.shift();
    }
    len() {
        return this.commandlist.length;
    }
        
}
module.exports = cmd_queue;