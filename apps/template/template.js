class move_one {
    constructor(app_mgr, viewcontroller, gamespeedMS, sizeX, sizeY) {
        this.app_mgr = app_mgr;
        this.viewcontroller = viewcontroller;
        this.x = 0;
        this.y = 0;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.gamespeedMS = gamespeedMS;
    }

    addPlayer()   { return; }
    removePlayer(){ return; }
    startPlayer() { return; }

    run() {
        // check gamespeed
        this.date = (new Date).getTime();
        if(this.nextAction > this.date) { return false; }
        this.nextAction = this.date + this.gamespeedMS;

        // decide if view should be updated
        if(this.run_app()) {  
            this.viewcontroller.show();  
        }       
    }

    run_app() {

        // check commands
        var cmd = this.app_mgr.getNextCommand();
        if(!cmd) { return false; }
        console.log("Template -- New Command:" + cmd);
        while(cmd) {
            var direction = cmd.cmd;
            // id counted from 0
            var player_id = cmd.id;
            this._move_one(direction);
            cmd = this.app_mgr.getNextCommand();
            console.log("Template -- Change Color of one Pixel to red"); 
        } 
        return true;    
    }

    _move_one(direction) {
        this.viewcontroller.setColor(this.x,this.y,0,0,0);
        if      (direction == "up")   {  this._up();      }
        else if (direction == "down") {  this._down();    }
        else if (direction == "left") {  this._left();    }
        else if (direction == "right"){  this._right();   }
        this.viewcontroller.setColor(this.x,this.y,255,0,0);
    }

    _left()  { if (this.x > 0)              { this.x -= 1; }}
    _right() { if (this.x < this.x_len - 1) { this.x += 1; }}
    _down()  { if (this.y < this.y_len - 1) { this.y += 1; }} 
    _up()    { if (this.y > 0)              { this.y -= 1; }}
}
module.exports = move_one;