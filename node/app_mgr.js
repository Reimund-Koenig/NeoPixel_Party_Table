
const MoveOne = require('./application/move_one')
const Snake = require('./application/snake')

const PlayerMgr = require('./player_mgr')
const CmdQueue = require('./cmd_queue')

class app_mgr {
    constructor(app, viewcontroller) {
        var self = this;
        this.viewcontroller = viewcontroller
        this.appname = "snake";
        this.isAppInitialised = true;
        this.cmd_queue = new CmdQueue();
        this.number_of_player = 0;
        this.players = new PlayerMgr();
        setInterval(function() { self.app_loop(); }, 500);
    }


    getQueuePosition() {
        // return 0 if free
        // var numOfFreeSlots = this.number_of_player + 0
        return 0
        // return position if busy
    }

    removePlayer(id) {
        this.players.remove(id);
    }

    setPlayerUsername(id, username) {
        this.players.setUsername(id, username);
    }

    addNewPlayer(id) {
        console.log("New Controller Connected (" + id + ")");
        this.players.add(id);
    }

    incomingClientCommand(id, cmd) {
        this.cmd_queue.add(id, cmd);
    }

    getNextCommand() {
        return this.cmd_queue.getNext();
    }
    
    app_loop(self) {
        if(this.isAppInitialised) {
            this.isAppInitialised = false;
            if(this.app) {
                this.app = null;
            }
            if(this.appname == "move_one") {
                this.app = new MoveOne(this, this.viewcontroller);
            } else if(this.appname == "snake") {
                this.app = new Snake(this, this.viewcontroller);
            } else {
                console.log("Game-Name unkown: " + this.appname)
            }
        }
        if(this.app) {
            this.app.run();
        } else {
            console.log("undefined")
        }
    }
        
}
module.exports = app_mgr;