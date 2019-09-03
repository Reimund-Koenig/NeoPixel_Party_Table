class snake {
    constructor(app_mgr, viewcontroller) {
        this.date = (new Date).getTime();;
        this.app_mgr = app_mgr;
        this.viewcontroller = viewcontroller;
        this.x = 0;
        this.x_len = 16;
        this.y = 0;
        this.y_len = 15;
        this.snackX = 0;
        this.snackY = 0;
        this.direction = "right";
        this.nextAction = this.date;
        this._setRandomPixelNotPossition();
    }

    run() {
        this.date = (new Date).getTime();
        var cmd1 = this.app_mgr.getNextCommand();
        var cmd = cmd1.cmd;
        if(cmd != "") {
            this.direction = cmd;
        }
        if(this.nextAction > this.date) {
            return;
        }
        this.nextAction = this.date + 200;
        this.viewcontroller.setColor(this.x,this.y,0,0,0);
        if (this.snackX == this.x && this.snackY == this.y) {
            this._setRandomPixelNotPossition();
        }
        // this.viewcontroller.setColor(this.snackX,this.snackY,0,255,0);
        if(this.direction == "up") {
            this._up();
        } else if (this.direction == "down") {
            this._down();
        } else if (this.direction == "left") {
            this._left();
        } else if (this.direction == "right") {
            this._right();
        }
        this.viewcontroller.setColor(this.x,this.y,255,0,0);
    }
    
    _left() {
        if (this.x > 0) {
            this.x -= 1;
        } else {
            this.x = 15;
        }
    }
    _right() {
        if (this.x < this.x_len - 1) {
            this.x += 1;
        } else {
            this.x = 0;
        }
    }
    _down() {
        if (this.y < this.y_len - 1) {
            this.y += 1;
        } else {
            this.y = 0;
        }
    } 
    _up() {
        if (this.y > 0) {
            this.y -= 1;
        } else {
            this.y = 14;
        }
    }

    _setRandomPixelNotPossition() {
        while (this.snackX == this.x && this.snackY == this.y) {
            this.snackX = Math.floor(Math.random() * this.x_len);
            this.snackY = Math.floor(Math.random() * this.y_len);
        }
    }
}
module.exports = snake;