class viewcontroller {
    constructor(view) {
        var self = this;
        this.view = view;
        this.x = 0;
        this.x_len = 16;
        this.y = 0;
        this.y_len = 15;
    }
    control(cmd, player) {
        this.view.setColor(this.x,this.y,170,170,170);
        if(cmd == "up") {
            this._up();
        } else if (cmd == "down") {
            this._down();
        } else if (cmd == "left") {
            this._left();
        } else if (cmd == "right") {
            this._right();
        }
        this.view.setColor(this.x,this.y,255,0,0);
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
module.exports = viewcontroller;