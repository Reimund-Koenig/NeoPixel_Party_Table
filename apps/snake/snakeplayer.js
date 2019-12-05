class snakeplayer {    
    constructor(startX, startY, sizeX, sizeY, hR, hG, hB, bR, bG, bB) {
        this.bR = bR; this.bG = bG; this.bB = bB;
        this.hR = hR; this.hG = hG; this.hB = hB;
        console.log("New Player with Body:" + bR + ", "+ bG + ", "+ bB + ", Head: "+ hR + ", "+ hG + ", "+ hB)
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

    moveOneStep(snackX, snackY, viewcontroller) {
        if(this.isDead)       { return; }
        if(this.isInactive) { return; }
        var snake_body_len = this.yBody.length;
        var hasEatenSnack = (snackX == this.xHead && snackY == this.yHead)
        if (hasEatenSnack) {
            this.xBody.push(this.xHead)
            this.yBody.push(this.yHead)
        } else if(snake_body_len > 0) {
            viewcontroller.setColor(this.xBody[0],this.yBody[0],0,0,0);
            for (var i = 0; i < snake_body_len-1; i++) {
                this.xBody[i] = this.xBody[i+1]
                this.yBody[i] = this.yBody[i+1]
            }
            this.xBody[snake_body_len-1] = this.xHead;
            this.yBody[snake_body_len-1] = this.yHead;
        } else {
            viewcontroller.setColor(this.xHead,this.yHead,0,0,0);
        }
        
        if(this.direction == "up")            { this._up();     } 
        else if (this.direction == "down")    { this._down();   }
        else if (this.direction == "left")    { this._left();   }
        else if (this.direction == "right")   { this._right();  }
        return hasEatenSnack;
    }
    
    checkCannibalism(viewcontroller) {
        // Cannibale?
        for (var i=0; i < this.yBody.length; i++) {
            if(this.xHead == this.xBody[i] && this.yHead == this.yBody[i]) {
                console.log("Cannibale!");
                this.gameover(viewcontroller);
                return;
            };
        }
    }
    
    drawNewBodyElement(viewcontroller) {
        var snake_body_len = this.yBody.length
        if (snake_body_len<=0) { return; }
        viewcontroller.setColor(this.xBody[snake_body_len-1],this.yBody[snake_body_len-1],this.bR,this.bG,this.bB);
    }

    drawHead(viewcontroller) {
        if(this.isDead)     { return; }  
        if(this.isInactive) { return; }  
        viewcontroller.setColor(this.xHead,this.yHead,this.hR,this.hG,this.hB);
    }

    _left()  {   if (this.xHead > 0) {  this.xHead -= 1;    }          else { this.xHead = this.sizeX-1;  }  this.lastMoveDirection = "left";  }
    _right() {   if (this.xHead < this.sizeX - 1) { this.xHead += 1; } else { this.xHead = 0;   }  this.lastMoveDirection = "right"; }
    _down()  {   if (this.yHead < this.sizeY - 1) { this.yHead += 1; } else { this.yHead = 0;   }  this.lastMoveDirection = "down";  } 
    _up()    {   if (this.yHead > 0) { this.yHead -= 1; }              else { this.yHead = this.sizeY-1;  }  this.lastMoveDirection = "up";    }
    getXHead() { return this.xHead; }
    getYHead() { return this.yHead; }

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
        if(this.isDead)     { return false; }  
        if(this.isInactive) { return false; }  
        var collision = (x == this.xHead && y == this.yHead);
        for(var i = 0 ; i < this.xBody.length; i++) {
            collision |= (x == this.xBody[i] && y == this.yBody[i]);
        }
        return collision;
    }
}
module.exports = snakeplayer;