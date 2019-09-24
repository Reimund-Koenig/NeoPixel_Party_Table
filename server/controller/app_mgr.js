
const Template = require('../../apps/template/template')
const Snake = require('../../apps/snake/snake')
const Startscreen = require('../../apps/startscreen/startscreen')
const fs = require('fs');

const PlayerMgr = require('./player_mgr')
const CmdQueue = require('./cmd_queue')

class app_mgr {
    constructor(viewcontroller, sizeX, sizeY) {
        this.viewcontroller = viewcontroller
        this.appname = "startscreen";
        this.apps = ["startscreen","snake","template"];
        this.isAppInitialised = true;
        this.cmd_queue = new CmdQueue();
        this.players = new PlayerMgr();
        var self = this;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.numMaxPlayer = 1;
        setInterval(function() { self.app_loop(); }, 20);
    }

    calculateQueuePosition() {
        return (this.getNumberOfActivePlayer() - this.numMaxPlayer) + 1;
    }

    removePlayer(socket_id) {
        this.app.removePlayer(this.players.getPlayerId(socket_id));
        this.players.remove(socket_id);
    }

    setMaxPlayer(numMaxPlayer) {
        this.numMaxPlayer = numMaxPlayer;
    }

    initialisePlayer(socket_id, username, queuePos) {
        this.players.initialisePlayer(socket_id, username, queuePos);
        console.log("Set Username: " +  username);
    }
    
    reduceQueuePositions() {
        this.players.reduceQueuePositions();
    }

    getQueuePosition(socket_id) {
        console.log("App_mgr getQueuePosition " + socket_id);
        return this.players.getQueuePosition(socket_id);
    }

    startPlayer(socket_id) {
        this.app.startPlayer(this.players.getPlayerId(socket_id));
    }

    addNewPlayer(socket_id) {
        console.log("New Controller Connected (" + socket_id + ")");
        this.players.add(socket_id);
        this.app.addPlayer(this.players.getPlayerId(socket_id));
    }

    getNumberOfActivePlayer() {
        return this.players.numberOfActivePlayer();
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