
const Template = require('../apps/template/template')
const Snake = require('../apps/snake/snake')
const Startscreen = require('../apps/startscreen/startscreen')
const fs = require('fs');

const PlayerMgr = require('./player_mgr')
const CmdQueue = require('../util/cmd_queue')

class app_mgr {
    constructor(viewcontroller, sizeX, sizeY) {
        this.viewcontroller = viewcontroller
        this.appname = "startscreen";
        this.apps = [];
        fs.readdirSync("./apps/").forEach(file => {
            console.log(file);
            this.apps.push(file);
        });
        this.isAppInitialised = true;
        this.cmd_queue = new CmdQueue();
        this.number_of_player = 0;
        this.players = new PlayerMgr();
        var self = this;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
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
        this.app.addPlayer(this.players.getPlayerId(socket_id));
    }

    getNumberOfPlayer() {
        return this.players.numberOfPlayer();
    }
    
    leftControlerCommand(socket_id, command) {        
        this.cmd_queue.add(this.players.getPlayerId(socket_id), "left", command);
    }
    
    rightControlerCommand(socket_id, command) {        
        this.cmd_queue.add(this.players.getPlayerId(socket_id), "right", command);
    }

    getNextCommand() {
        return this.cmd_queue.getNext();
    }
    
    startGame(gamename) {
        this.isAppInitialised = true;
        this.appname = gamename;
        this.viewcontroller.reset();
    }
    
    app_loop() {
        if(this.isAppInitialised) {
            this.isAppInitialised = false;
            if(this.app) {
                this.app = null;
            }
            if(this.appname == "startscreen") {
                this.app = new Startscreen(this, this.viewcontroller, 1000, this.sizeX, this.sizeY);
            } else if(this.appname == "template") {
                var gamespeedMS = 40;
                this.app = new Template(this, this.viewcontroller, gamespeedMS, this.sizeX, this.sizeY);
            } else if(this.appname == "snake") {
                this.app = new Snake(this, this.viewcontroller, 333, this.sizeX, this.sizeY);
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