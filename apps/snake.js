class snake {
    constructor(app_mgr, viewcontroller) {
        this.date = (new Date).getTime();;
        this.app_mgr = app_mgr;
        this.viewcontroller = viewcontroller;
        this.xHead = 0;
        this.xBody = [];
        this.x_len = 16;
        this.yHead = 0;
        this.yBody = [];
        this.y_len = 15;
        this.snackX = 0;
        this.snackY = 0;
        this.gamespeedMS = 200;
        this.direction = "right";
        this.nextAction = this.date;
        this._setRandomPixelNotPossition();
    }
    addPlayer()   { return; }
    removePlayer(){ return; }
    startPlayer() { return; }
    run() {
        this.date = (new Date).getTime();
        this._changeDirection(this.app_mgr.getNextCommand());
        if(this.nextAction > this.date) {   return;   }
        this.nextAction = this.date + this.gamespeedMS;
        var len = this.yBody.length;
        if (this.snackX == this.xHead && this.snackY == this.yHead) {
            this.xBody.push(this.xHead)
            this.yBody.push(this.yHead)
            this._setRandomPixelNotPossition();
            this.viewcontroller.setColor(this.xHead,this.yHead,255,0,0);
        } else {
            if(len > 0) {
                this.viewcontroller.setColor(this.xBody[0],this.yBody[0],0,0,0);
                for (var i = 0; i < len-1; i++) {
                    this.xBody[i] = this.xBody[i+1]
                    this.yBody[i] = this.yBody[i+1]
                }
                this.xBody[len-1] = this.xHead;
                this.yBody[len-1] = this.yHead;
            } else {
                this.viewcontroller.setColor(this.xHead,this.yHead,0,0,0);
            }
        }
        this.viewcontroller.setColor(this.snackX,this.snackY,255,255,255);
        if      (this.direction == "up")   {  this._up();      }
        else if (this.direction == "down") {  this._down();    }
        else if (this.direction == "left") {  this._left();    }
        else if (this.direction == "right"){  this._right();   }
        for (var i=0; i < this.yBody.length; i++) {
            if(this.xHead == this.xBody[i] && this.yHead == this.yBody[i]) {
                this._reset();
                return;
            };
        }
        if(len>0) {
            this.viewcontroller.setColor(this.xBody[len-1],this.yBody[len-1],255,0,0);
        }
        this.viewcontroller.setColor(this.xHead,this.yHead,255,106,0);
    }
    _left()  {   if (this.xHead > 0) {  this.xHead -= 1;    }          else { this.xHead = 15;  }  }
    _right() {   if (this.xHead < this.x_len - 1) { this.xHead += 1; } else { this.xHead = 0;   }  }
    _down()  {   if (this.yHead < this.y_len - 1) { this.yHead += 1; } else { this.yHead = 0;   }  }
    _up()    {   if (this.yHead > 0) { this.yHead -= 1; }              else { this.yHead = 14;  }  }
   
    _changeDirection(controll_cmd) {
        if(!controll_cmd) { return; }
        var cmd = controll_cmd.cmd;
        if(cmd == "") { return; }
        if(this.direction == "up" && cmd == "down") { return; }
        if(this.direction == "down" && cmd == "up") { return; }
        if(this.direction == "left" && cmd == "right") { return; }
        if(this.direction == "right" && cmd == "left") { return; }
        this.direction = cmd;
    }
    _reset() {
        console.log("RESET THE GAME");       
        for (var i=0; i < this.yBody.length; i++) {
            this.viewcontroller.setColor(this.xBody[i],this.yBody[i],0,0,0);
        }
        this.viewcontroller.setColor(this.xHead,this.yHead,0,0,0);
        this.viewcontroller.setColor(this.snackX,this.snackY,0,0,0);
        this.xHead = 0;
        this.xBody = [];
        this.yHead = 0;
        this.yBody = [];
        this.snackX = 0;
        this.snackY = 0;
        this.direction = "right"; 
        this.nextAction = this.date;
        this._setRandomPixelNotPossition();
    }

    _setRandomPixelNotPossition() {
        var coordinateBlocked = true
        while (coordinateBlocked) {
            this.snackX = Math.floor(Math.random() * this.x_len);
            this.snackY = Math.floor(Math.random() * this.y_len);
            coordinateBlocked = (this.snackX == this.xHead && this.snackY == this.yHead);
            for(var i=0; i < this.yBody.length; i++) {
                coordinateBlocked |= (this.snackX == this.xBody[i] && this.snackY[i] == this.yBody[i]);
            }
        }
    }
}
module.exports = snake;