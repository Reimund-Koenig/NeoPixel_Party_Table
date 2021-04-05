class cmd_queue {
    constructor(id, gamepad, command) {
        this.id = id;
        this.gamepad = gamepad;
        this.command = command;
    }
}
module.exports = cmd_queue;