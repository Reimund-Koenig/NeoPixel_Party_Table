class move_one {
    constructor(app_mgr, viewcontroller) {
        this.app_mgr = app_mgr;
        this.viewcontroller = viewcontroller;
        this.x = 0;
        this.x_len = 16;
        this.y = 0;
        this.y_len = 15;
    }

    run() {
        var cmd = this.app_mgr.getNextCommand();
        if(cmd == "") { return; }
        console.log("Template -- New Command:" + cmd);
        console.log("Template -- Change Color of one Pixel to red");
        this.viewcontroller.setColor(this.x,this.y,255,0,0);
    }

    _left() {
        if (this.x > 0) {
            this.x -= 1;
        }
    }
    _right() {
        if (this.x < this.x_len - 1) {
            this.x += 1;
        }
    }
    _down() {
        if (this.y < this.y_len - 1) {
            this.y += 1;
        }
    } 
    _up() {
        if (this.y > 0) {
            this.y -= 1;
        }    
    }
}
module.exports = move_one;