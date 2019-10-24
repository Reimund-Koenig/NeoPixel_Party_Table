class SnakePlayer {    
    constructor(startX, startY, sizeX, sizeY, hR,hG,hB,bR,bG,bB) {
        this.hR = hR; this.hG = hG; this.hB = hB;
        this.bR = bR; this.bG = bG; this.bB = bB;
        console.log("New Player with " + hR + ", "+ hG + ", "+ hB + ", "+ bR + ", "+ bG + ", "+ bB)
        this.xHead = startX;
        this.yHead = startY;
        this.direction = "right";
        this.lastMoveDirection = "right";
        this.xBody = [];
        this.yBody = [];
        this.date = (new Date).getTime();
        this.isDead = false;
        this.isInactive = true;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
    run(snackX, snackY, viewcontroller) {
        if(this.isDead)       { return; }
        if(this.isInactive) { return; }
        var snake_len = this.yBody.length;
        var hasEatenSnack = (snackX == this.xHead && snackY == this.yHead)
        if (hasEatenSnack) {
            this.xBody.push(this.xHead)
            this.yBody.push(this.yHead)
            viewcontroller.setColor(this.xHead,this.yHead,this.hR,this.hG,this.hB);
        } else if(snake_len > 0) {
            viewcontroller.setColor(this.xBody[0],this.yBody[0],0,0,0);
            for (var i = 0; i < snake_len-1; i++) {
                this.xBody[i] = this.xBody[i+1]
                this.yBody[i] = this.yBody[i+1]
            }
            this.xBody[snake_len-1] = this.xHead;
            this.yBody[snake_len-1] = this.yHead;
        } else {
            viewcontroller.setColor(this.xHead,this.yHead,0,0,0);
        }
        
        if(this.direction == "up")            { this._up();     } 
        else if (this.direction == "down")    { this._down();   }
        else if (this.direction == "left")    { this._left();   }
        else if (this.direction == "right")   { this._right();  }

        // Cannibale?
        for (var i=0; i < this.yBody.length; i++) {
            if(this.xHead == this.xBody[i] && this.yHead == this.yBody[i]) {
                console.log("Cannibale!");
                this.gameover(viewcontroller);
                return;
            };
        }
        if(snake_len>0) {
            viewcontroller.setColor(this.xBody[snake_len-1],this.yBody[snake_len-1],this.hR,this.hG,this.hB);
        }
        
        viewcontroller.setColor(this.xHead,this.yHead,this.bR,this.bG,this.bB);
        return hasEatenSnack;
    }
    _left()  {   if (this.xHead > 0) {  this.xHead -= 1;    }          else { this.xHead = this.sizeX-1;  }  this.lastMoveDirection = "left";  }
    _right() {   if (this.xHead < this.sizeX - 1) { this.xHead += 1; } else { this.xHead = 0;   }  this.lastMoveDirection = "right"; }
    _down()  {   if (this.yHead < this.sizeY - 1) { this.yHead += 1; } else { this.yHead = 0;   }  this.lastMoveDirection = "down";  } 
    _up()    {   if (this.yHead > 0) { this.yHead -= 1; }              else { this.yHead = this.sizeY-1;  }  this.lastMoveDirection = "up";    }
    setDirection(direction) {
        if(!direction) { return; }
        if(direction == "") { return; }
        if(this.lastMoveDirection == direction) { return; }
        if(this.lastMoveDirection == "up" && direction == "down") { return; }
        if(this.lastMoveDirection == "down" && direction == "up") { return; }
        if(this.lastMoveDirection == "left" && direction == "right") { return; }
        if(this.lastMoveDirection == "right" && direction == "left") { return; }
        this.direction = direction;
    }
    getX() { return this.xHead; }
    getY() { return this.yHead; }
    restart(startX, startY) {
        this.xHead = startX;
        this.yHead = startY;
        this.direction = "right";
        this.lastMoveDirection = "right";
        this.xBody = [];
        this.yBody = [];
        this.date = (new Date).getTime();
        this.isDead = false;
    }
    gameover(viewcontroller) {
        console.log("Game Over")
        this.isDead = true;        
        for (var i=0; i < this.yBody.length; i++) {
            viewcontroller.setColor(this.xBody[i],this.yBody[i],0,0,0);
        }
        viewcontroller.setColor(this.xHead,this.yHead,0,0,0);
        viewcontroller.setColor(this.snackX,this.snackY,0,0,0);
        this.xHead = 0;
        this.xBody = [];
        this.yHead = 0;
        this.yBody = [];
        this.direction = "right"; 
    }
    isCollisionWith(x,y) {  
        if(this.isDead)       { return false; }  
        if(this.isInactive) { return false; }  
        var collision = (x == this.xHead && y == this.yHead);
        for(var i = 0 ; i < this.xBody.length; i++) {
            collision |= (x == this.xBody[i] && y == this.yBody[i]);
        }
        return collision;
    }
}
module.exports = SnakePlayer;