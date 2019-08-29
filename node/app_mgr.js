
const MoveOne = require('./application/move_one')
const Snake = require('./application/snake')


class app_mgr {
    constructor(app, viewcontroller) {
        var self = this;
        this.viewcontroller = viewcontroller
        this.gamename = "snake";
        this.newgame = true;
        this.control_queue = [];
        setInterval(function() { self.app_loop(); }, 20);
    }

    // ToDo: Command or function to change game
    control(cmd) {
        this.control_queue.push(cmd);
    }

    getNextCommand() {
        if(this.control_queue.length == 0) { return ""; }
        var cmd = this.control_queue[0]
        this.control_queue.splice(0,1);
        return cmd;
    }
    
    app_loop(self) {
        if(this.newgame) {
            this.newgame = false;
            if(this.game) {
                this.game = null;
            }
            if(this.gamename == "move_one") {
                this.game = new MoveOne(this, this.viewcontroller);
            } else if(this.gamename == "snake") {
                this.game = new Snake(this, this.viewcontroller);
            } else {
                console.log("Game-Name unkown: " + this.gamename)
            }
        }
        if(this.game) {
            this.game.run();
        } else {
            console.log("undefined")
        }
    }
        
}
module.exports = app_mgr;