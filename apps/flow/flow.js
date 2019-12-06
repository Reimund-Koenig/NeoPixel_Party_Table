class flow {
    constructor(app_mgr, viewcontroller, gamespeedMS, sizeX, sizeY) {
        this.app_mgr = app_mgr;
        this.viewcontroller = viewcontroller;
        this.x = 0;
        this.y = 0;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.gamespeedMS = gamespeedMS;
        this.app_mgr.setMaxPlayer(1);
        this.move = false;
        this.viewcontroller.reset();
    }

    addPlayer(id)   { 
        console.log("Flow -- Player Connected " + id);
    }
    removePlayer(id){ 
        console.log("Flow -- Player Removed " + id);
    }
    startPlayer(id) { 
        console.log("Flow -- Start Player " + id);
    }

    run() {
        // check gamespeed
        this.date = (new Date).getTime();
        if(this.nextAction > this.date) { return false; }
        this.nextAction = this.date + this.gamespeedMS;

        // decide if view should be updated
        if(this.run_app()) {  
            // webview is live
            // table need show call
            this.viewcontroller.show();  
        }       
    }

    run_app() {
        // check commands
        var cmd = this.app_mgr.getNextCommand();
        if(!cmd) { return false; }
        console.log("==========================================================================");
        // id (counted from 0 to X)
        var id = cmd.id;
        var command = cmd.command;
        var leftController = (cmd.controller == "left");
        console.log("Flow -- Controller " + cmd.controller + " with id: " + id + " sends command: " + command); 
        if(command == "push") { return false; }
        var direction = command;
        if(leftController) {
            console.log("Flow -- Move One"); 
            this._move_one(direction);
        } else {
            console.log("Flow -- Change Color"); 
            this._change_color(direction);
        }
        cmd = this.app_mgr.getNextCommand();
        return true;    
    }
    _change_color(direction) {
        if      (direction == "up")   {  this.viewcontroller.setColor(this.x,this.y,0,0,0);       }
        else if (direction == "down") {  this.viewcontroller.setColor(this.x,this.y,255,0,0);     }
        else if (direction == "left") {  this.viewcontroller.setColor(this.x,this.y,0,255,0);     }
        else if (direction == "right"){  this.viewcontroller.setColor(this.x,this.y,0,0,255);     }
    }
    _move_one(direction) {
        if      (direction == "up")   {  this._up();      }
        else if (direction == "down") {  this._down();    }
        else if (direction == "left") {  this._left();    }
        else if (direction == "right"){  this._right();   }
        this.viewcontroller.setColor(this.x,this.y,25,25,25);
    }
    _left()  {   if (this.x > 0) {   this.x -= 1;  }           else { this.x = this.sizeX-1;  }}
    _right() {   if (this.x < this.sizeX - 1) { this.x += 1; } else { this.x = 0;   }}
    _down()  {   if (this.y < this.sizeY - 1) { this.y += 1; } else { this.y = 0;   }} 
    _up()    {   if (this.y > 0) { this.y -= 1; }              else { this.y = this.sizeY-1;  }}
    
}
module.exports = flow;