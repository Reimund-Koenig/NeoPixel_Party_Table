
const MoveOne = require('../apps/move_one')
const Snake = require('../apps/snake')
const Snake2 = require('../apps/snake2')
// const Template = require('../apps/your_game_name')

const PlayerMgr = require('./player_mgr')
const CmdQueue = require('../util/cmd_queue')

class app_mgr {
    constructor(app, viewcontroller) {
        this.viewcontroller = viewcontroller
        this.appname = "snake2";
        this.isAppInitialised = true;
        this.cmd_queue = new CmdQueue();
        this.number_of_player = 0;
        this.players = new PlayerMgr();
        var self = this;
        setInterval(function() { self.app_loop(); }, 20);
    }

    getQueuePosition() {
        // return 0 if free
        // var numOfFreeSlots = this.number_of_player + 0
        return 0
        // return position if busy
    }

    removePlayer(socket_id) {
        this.app.removePlayer(this.players.getPlayerId(socket_id));
        this.players.remove(socket_id);
    }

    setPlayerUsername(socket_id, username) {
        this.players.setUsername(socket_id, username);
        console.log("Set Username: " +  username);
        this.app.startPlayer(this.players.getPlayerId(socket_id));
    }

    addNewPlayer(socket_id) {
        console.log("New Controller Connected (" + socket_id + ")");
        this.players.add(socket_id);
        // var self = this;
        // setTimeout(function() { self.app.addPlayer(self.players.getPlayerId(socket_id)); }, 2000);
        this.app.addPlayer(this.players.getPlayerId(socket_id));
    }

    getNumberOfPlayer() {
        return this.players.numberOfPlayer();
    }
    
    incomingClientCommand(socket_id, cmd) {        
        this.cmd_queue.add(this.players.getPlayerId(socket_id), cmd);
    }

    getNextCommand() {
        return this.cmd_queue.getNext();
    }
    
    app_loop() {
        if(this.isAppInitialised) {
            this.isAppInitialised = false;
            if(this.app) {
                this.app = null;
            }
            if(this.appname == "move_one") {
                this.app = new MoveOne(this, this.viewcontroller);
            } else if(this.appname == "snake") {
                this.app = new Snake(this, this.viewcontroller);
            } else if(this.appname == "snake2") {
                this.app = new Snake2(this, this.viewcontroller);
            } else if(this.appname == "template") {
                this.app = new Template(this, this.viewcontroller);
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