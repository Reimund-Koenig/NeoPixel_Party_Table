class move_one {
    constructor(app_mgr, viewcontroller) {
        this.app_mgr = app_mgr;
        this.viewcontroller = viewcontroller;
        this.x = 0;
        this.x_len = 16;
        this.y = 0;
        this.y_len = 15;
    }
    addPlayer()   { return; }
    removePlayer(){ return; }
    startPlayer() { return; }
    run() {
        var control_cmd = this.app_mgr.getNextCommand();
        if(!control_cmd) { return; }
        var cmd = control_cmd.cmd; 
        console.log("New Command: " + cmd);
        this.viewcontroller.setColor(this.x,this.y,0,0,0);
        if      (cmd == "up")   {  this._up();      }
        else if (cmd == "down") {  this._down();    }
        else if (cmd == "left") {  this._left();    }
        else if (cmd == "right"){  this._right();   }
        this.viewcontroller.setColor(this.x,this.y,255,0,0);
    }
    
    _left()  { if (this.x > 0)              { this.x -= 1; }}
    _right() { if (this.x < this.x_len - 1) { this.x += 1; }}
    _down()  { if (this.y < this.y_len - 1) { this.y += 1; }} 
    _up()    { if (this.y > 0)              { this.y -= 1; }}
}
module.exports = move_one;