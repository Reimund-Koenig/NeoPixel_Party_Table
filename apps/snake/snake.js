const snakePlayer = require('./SnakePlayer')

class snake {
    constructor(app_mgr, viewcontroller, gamespeedMS, sizeX, sizeY) {
        this.nextAction = this.date;
        this.max_players = 8;
        this.app_mgr = app_mgr;
        this.viewcontroller = viewcontroller;
        this.p = [];
        this.snackX = 0;
        this.snackY = 0;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.restarting = false;
        this.gamespeedMS = gamespeedMS;
        console.log("Game started")
        this._resetView();
        this._setRandomSnack();
        this.viewcontroller.show();
    }

    _resetView() {
        this.viewcontroller.setMatrixColor(0,0,0);
    }

    startPlayer(id) {
        console.log("Player "+ id + " is active")
        this.p[id].isInactive = false;
    }

    addPlayer(id) {
        if(this.p.length >= this.max_players) { return; }
        console.log("add player with id: " + id);
        var color = this._getColor(id);
        var startPos = this._getStartPixel();
        var newPlayer = new snakePlayer(startPos[0], startPos[1], this.sizeX, this.sizeY, color[0],color[1],color[2],color[3],color[4],color[5]);
        this.p.push(newPlayer);
    }
    
    removePlayer(id) {
        if(!this.p[id]) { return; }
        console.log("removePlayer");
        this.p[id].gameover(this.viewcontroller);
        this.p.splice(id, 1); 
    }

    startNewGame() {    
        this._resetView(); 
        for(var i=0;i<this.p.length;i++) {
            var startPos = this._getStartPixel();
            this.p[i].restart(startPos[0], startPos[1]);
        }
        this.restarting = false;
    }

    run() {
        if(this.run_app()) {  
            this.viewcontroller.show();  
        }       
    }

    run_app() {
        // ToDo Fix Bugs
        /*
            - Head not displayed if it should appear on the end of another snake
            - Body interrupted by collision
        */
        if(this.restarting) { return false; }
        if(this.p.length < 2) { return false; }
        var numberOfPlayersLeft = this.p.length;
        var activePlayers = 0;
        // how many players left?
        for(var i=0;i<this.p.length;i++) {
            if(this.p[i].isDead) { numberOfPlayersLeft -= 1; }
            if(!this.p[i].isInactive) { activePlayers += 1; }
        }
        if(activePlayers < 2) { return false; }
        // only one left? --> game ends
        if (numberOfPlayersLeft <= 1) {   
            for(var i=0;i<this.p.length;i++) {
                if((!this.p[i].isDead) && (!this.p[i].isInactive)) { 
                    this.viewcontroller.setMatrixColor(this.p[i].hR,this.p[i].hG, this.p[i].hB);
                    console.log("Set color (" + i + "): " + this.p[i].bR + "," + this.p[i].bG + "," + this.p[i].bB)
                }
            }         
            this.restarting = true;
            var self = this; 
            setTimeout(function() { self.startNewGame(); }, 5000);             
            return true;   
        }

        var cmd = this.app_mgr.getNextCommand()
        while(cmd) {
            if(cmd.controller == "right") { 
                cmd = this.app_mgr.getNextCommand();
                continue;
            }
            if(cmd.command == "push") { 
                cmd = this.app_mgr.getNextCommand();
                continue;
            }
            var direction = cmd.command;
            this.p[cmd.id].setDirection(direction);
            cmd = this.app_mgr.getNextCommand();
        }       
        this.date = (new Date).getTime();
        if(this.nextAction > this.date) { return false; }
        this.nextAction = this.date + this.gamespeedMS;
        this.viewcontroller.setColor(this.snackX,this.snackY,255,255,255);
        var newSnack = false;
        // Move all Player body
        for(var i=0;i<this.p.length;i++) {
            newSnack |= this.p[i].run(this.snackX, this.snackY, this.viewcontroller);
        }

        var collisions = []
        // Head/Head Collision (both players dies)
        for(var i=0;i<this.p.length;i++) {
            var collision = false
            for(var j=0;j<this.p.length;j++) {
                if(i==j) { continue; }
                if(collision) { continue; }
                collision |= this.p[j].isCollisionWith(this.p[i].getX(),this.p[i].getY());
            }
            collisions.push(collision);
        }
        for(var i=0;i<this.p.length;i++) {
            if(collisions[i]) {
                this.p[i].gameover(this.viewcontroller);
            }
        }

        if(newSnack) {
            this._setRandomSnack();
            this.viewcontroller.setColor(this.snackX,this.snackY,255,255,255);
        }
        return true;
    }

    _getColor(id) {
        if((id%8)==0) { return [255, 127, 0,   255, 0,   0]; } //Orange Head and Red Body
        if((id%8)==1) { return [0,   127, 255, 0,   0,   255]; } //LightBlue Head and Blue Body
        if((id%8)==2) { return [127, 255, 0,   0,   255, 0]; } //LightGreen Head and Green Body
        if((id%8)==3) { return [255, 255, 127, 255, 255, 0]; } //LightYellow Head and Yellow Body
        if((id%8)==4) { return [127, 255, 255, 0,   255, 255]; } //Light Turquoise Head and Turquoise Body
        if((id%8)==5) { return [255, 127, 255, 255, 0,   255]; } //Light Purple Head and Purple Body
        if((id%8)==6) { return [255, 180, 0,   255, 63,  0]; } //Orange Head and Red/Orange Body
        if((id%8)==7) { return [255, 180, 255, 255, 63,  255]; } //Orange Head and Red Body
    }

    _getFreePixel() {
        var freeX = 0;
        var freeY = 0;
        var collision = true;
        while (collision) {
            var collision = false;
            freeX = Math.floor(Math.random() * this.sizeX);
            freeY = Math.floor(Math.random() * this.sizeY);
            for(var i=0;i<this.p.length;i++) {
                collision |= this.p[i].isCollisionWith(freeX,freeY);
            }
        }
        return [freeX, freeY]
    }

    _getStartPixel() {
        var collisionInNextStep = true;
        var freeX = 0;
        var freeY = 0;
        while (collisionInNextStep) {
            var collisionInNextStep = false;
            var freePixel = this._getFreePixel();
            freeX = freePixel[0];
            freeY = freePixel[1];
            for(var i=0;i<this.p.length;i++) {
                collisionInNextStep |= this.p[i].isCollisionWith(freeX+1,freeY);
            }
        }
        return [freeX, freeY];
    }

    _setRandomSnack() {
        var freePixel = this._getFreePixel();
        this.snackX = freePixel[0];
        this.snackY = freePixel[1];
    }
}
module.exports = snake;