class template {
    constructor(app_mgr, viewcontroller, gamespeedMS, sizeX, sizeY) {
        this.app_mgr = app_mgr;
        this.viewcontroller = viewcontroller;
        this.x = 0;
        this.y = 0;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.gamespeedMS = gamespeedMS;
        this.app_mgr.setMaxPlayer(1);
        this.controller_active = false;
        this.lastDirection = "";
        this.viewcontroller.reset();
    }

    addPlayer(id)   { 
        console.log("Template -- Player Connected " + id);
    }
    removePlayer(id){ 
        console.log("Template -- Player Removed " + id);
    }
    startPlayer(id) { 
        console.log("Template -- Start Player " + id);
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
        // check for new commands (null if no command available)
        var cmd = this.app_mgr.getNextCommand();

        // complete content of command
        if (cmd) {
            var id = cmd.id; // id which player (virtual joystick) sends the command (from 0 to X)) 
            var command = cmd.command; // push, release, up, down, left, right
            var controller = cmd.controller // left, right (controller of virtual joystick)
            console.log("==========================================================================");
            console.log("Template -- Controller " + controller + " with id: " + id + " sends command: " + command);
        }
        
        var sliding_movement = true;
        if(sliding_movement) {
            return this._template_sliding_movement(cmd);
        } else {
            return this._template_step_by_step_movement(cmd);
        }
    }

    _template_sliding_movement(cmd) {
        if(!cmd) {
            if(!this.controller_active) { return false; }
            this._move_one(this.lastDirection);
            return true;
        }
        if(cmd.command == "push") {
            this.controller_active = true;
            return false;
        } else if (cmd.command == "release") { 
            this.controller_active = false;
            return false;
        }
        var leftController = (cmd.controller == "left");
        if(leftController) {
            var direction = cmd.command;
            this.lastDirection = direction;
            this._move_one(this.lastDirection);
        } else {
            console.log("Template -- Change Color"); 
            this._change_color(direction);
        }
        return true;
    }


    _template_step_by_step_movement(cmd) {
        if(!cmd) { return false; }
        var direction = cmd.command;
        var leftController = (cmd.controller == "left");
        if(leftController) {
            console.log("Template -- Move One"); 
            this._move_one(direction);
        } else {
            console.log("Template -- Change Color"); 
            this._change_color(direction);
        }
        return true;
    }



    _change_color(direction) {
        if      (direction == "up")   {  this.viewcontroller.setColor(this.x,this.y,0,0,0);       }
        else if (direction == "down") {  this.viewcontroller.setColor(this.x,this.y,255,0,0);     }
        else if (direction == "left") {  this.viewcontroller.setColor(this.x,this.y,0,255,0);     }
        else if (direction == "right"){  this.viewcontroller.setColor(this.x,this.y,0,0,255);     }
    }
    _move_one(direction) {
        this.viewcontroller.setColor(this.x,this.y,0,0,0);
        if      (direction == "up")   {  this._up();      }
        else if (direction == "down") {  this._down();    }
        else if (direction == "left") {  this._left();    }
        else if (direction == "right"){  this._right();   }
        this.viewcontroller.setColor(this.x,this.y,255,25,25);
    }
    _left()  {   if (this.x > 0) {   this.x -= 1;  }           else { this.x = this.sizeX-1;  }}
    _right() {   if (this.x < this.sizeX - 1) { this.x += 1; } else { this.x = 0;   }}
    _down()  {   if (this.y < this.sizeY - 1) { this.y += 1; } else { this.y = 0;   }} 
    _up()    {   if (this.y > 0) { this.y -= 1; }              else { this.y = this.sizeY-1;  }}
    
}
module.exports = template;