class template {
    constructor(app_mgr, viewcontroller, gamespeedMS, sizeX, sizeY, relativeCtrl) {
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
        this.relativeCtrl = relativeCtrl;
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
            var gamepad = cmd.gamepad // left, right (gamepad of virtual joystick)
            console.log("==========================================================================");
            console.log("Template -- Gamepad " + gamepad + " with id: " + id + " sends command: " + command);
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
        var leftController = (cmd.gamepad == "left");
        if(leftController) {
            if (this.relativeCtrl) {
              this._newDirection(cmd.command);
            } else {
              this.lastDirection = cmd.command;
            }
            this._move_one(this.lastDirection);
        } else {
            console.log("Template -- Change Color");
            this._change_color(this.lastDirection);
        }
        return true;
    }


    _template_step_by_step_movement(cmd) {
        if(!cmd) { return false; }
        var direction = cmd.command;
        var leftController = (cmd.gamepad == "left");
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
    _newDirection(turn) {
        //only using left and right to alter RELATIVE direction of movement (up / down will just advance in 'relative forward direction')
        if      ((this.lastDirection ==    "up") && (turn ==  "left"))  {  this.lastDirection = "left";      }
        else if ((this.lastDirection ==    "up") && (turn == "right"))  {  this.lastDirection = "right";     }
        else if ((this.lastDirection ==  "down") && (turn ==  "left"))  {  this.lastDirection = "right";     }
        else if ((this.lastDirection ==  "down") && (turn == "right"))  {  this.lastDirection = "left";      }
        else if ((this.lastDirection ==  "left") && (turn ==  "left"))  {  this.lastDirection = "down";      }
        else if ((this.lastDirection ==  "left") && (turn == "right"))  {  this.lastDirection = "up";        }
        else if ((this.lastDirection == "right") && (turn ==  "left"))  {  this.lastDirection = "up";        }
        else if ((this.lastDirection == "right") && (turn == "right"))  {  this.lastDirection = "down";      }
        else {
          //catch exception on invalid lastDirection
          this.lastDirection = "left";
        }
    }
    _left()  {   if (this.x > 0) {   this.x -= 1;  }           else { this.x = this.sizeX-1;  }}
    _right() {   if (this.x < this.sizeX - 1) { this.x += 1; } else { this.x = 0;   }}
    _down()  {   if (this.y < this.sizeY - 1) { this.y += 1; } else { this.y = 0;   }}
    _up()    {   if (this.y > 0) { this.y -= 1; }              else { this.y = this.sizeY-1;  }}

}
module.exports = template;