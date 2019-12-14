class snakeplayer {    
    constructor(startX, startY, sizeX, sizeY, hR, hG, hB, bR, bG, bB) {
        this.bR = bR; this.bG = bG; this.bB = bB;
        this.hR = hR; this.hG = hG; this.hB = hB;
        console.log("New Player with Body:" + bR + ", "+ bG + ", "+ bB + ", Head: "+ hR + ", "+ hG + ", "+ hB)
        this.restart(startX, startY);
        this.isInactive = true;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.hasEatenSnack = false;
    }

    addElementToBody(x,y) {
        this.xBody.push(x)
        this.yBody.push(y)
    }

    checkIfPlayerWillEatSnack(snackX, snackY){
        this.hasEatenSnack = false;
        // calculate new position 
		
		this.x = this.xHead;
        this.y = this.yHead;

		//catch 3d cube exception coordinates
		if(        (this.direction ==  "left") && (this.x ==  0) ) {
			if (this._inRange(this.y,0,15)) {
				this.x =this.y;
				this.y =31;
				this.direction = "down";
				console.log("lastDir left -> down" );

			} else if (this._inRange(this.y,16,31)) {
				this.y+=16;
			} else if (this._inRange(this.y,32,47)) {
				this.y-=16;
			}
		} else if ((this.direction == "right") && (this.x == 15) ) {
			if (this._inRange(this.y,0,15)) {
				this.x =this.y;
				this.y =0; //should become 47
				this.direction = "up";
				console.log("lastDir right -> up" );
			} else if (this._inRange(this.y,16,31)) {
				this.y+=16;
			} else if (this._inRange(this.y,32,47)) {
				this.y-=16;
			}			
		} else if ((this.direction ==    "up") && (this.y ==  0) ) {	
			this.y = 32;
		} else if ((this.direction ==  "down") && (this.y == 31) ) {	
			this.y = 47;
		} else if ((this.direction ==    "up") && (this.y == 32) ) {	
			this.y = this.x;
			this.x = 15;
			this.direction = "right";
			console.log("lastDir up -> right" );
		} else if ((this.direction ==  "down") && (this.y == 47) ) {	
			this.y = this.x;
			this.x = 0;	
			this.direction = "left";
			console.log("lastDir down -> left" );
		}  
		
		// this.xHead = this.x;
        // this.yHead = this.y;
		this.xNextHead = this.x;
        this.yNextHead = this.y;
		
        if(this.direction == "up")            { this._up();     } 
        else if (this.direction == "down")    { this._down();   }
        else if (this.direction == "left")    { this._left();   }
        else if (this.direction == "right")   { this._right();  }
        this.hasEatenSnack = (snackX == this.xNextHead && snackY == this.yNextHead);
        return this.hasEatenSnack;
    }

    moveBody(viewcontroller) {
        // set current head to body color
        viewcontroller.setColor(this.xHead,this.yHead,this.bR,this.bG,this.bB);
        if (this.hasEatenSnack) {
            // if snake has eaten a snack, the body grows and this effects no movement
            this.addElementToBody(this.xHead, this.yHead);   
            return;
        }
        // reset color of last body element
        viewcontroller.setColor(this.xBody[0],this.yBody[0],0,0,0);
        // Move complete Body by one step
        var snake_body_len = this.yBody.length;
        for (var i = 0; i < snake_body_len-1; i++) {
            this.xBody[i] = this.xBody[i+1]
            this.yBody[i] = this.yBody[i+1]
        }
        this.xBody[snake_body_len-1] = this.xHead;
        this.yBody[snake_body_len-1] = this.yHead;
    }

    checkCannibalism(viewcontroller) {
        // Cannibale?
        for (var i=0; i < this.yBody.length; i++) {
            if(this.xNextHead == this.xBody[i] && this.yNextHead == this.yBody[i]) {
                console.log("Cannibale!");
                return true;
            };
        }
        return false;
    }

    moveHead(viewcontroller) {
        this.xHead = this.xNextHead;
        this.yHead = this.yNextHead;
        viewcontroller.setColor(this.xHead,this.yHead,this.hR,this.hG,this.hB);
    }

	_inRange(x, min, max) {
		return ((x-min)*(x-max) <= 0);
	}
	
	setDirection(turn) {
		//only using left and right to alter RELATIVE direction of movement (up / down will just advance in 'relative forward direction')
        if      ((this.direction ==    "up") && (turn ==  "left"))  {  this.direction = "left";      }
        else if ((this.direction ==    "up") && (turn == "right"))  {  this.direction = "right";     }
		else if ((this.direction ==  "down") && (turn ==  "left"))  {  this.direction = "right";     }
 		else if ((this.direction ==  "down") && (turn == "right"))  {  this.direction = "left";      }
        else if ((this.direction ==  "left") && (turn ==  "left"))  {  this.direction = "down";      }
        else if ((this.direction ==  "left") && (turn == "right"))  {  this.direction = "up";        }
        else if ((this.direction == "right") && (turn ==  "left"))  {  this.direction = "up";        }
        else if ((this.direction == "right") && (turn == "right"))  {  this.direction = "down";      }
    }
	
    _left()  {   if (this.xNextHead > 0)                { this.xNextHead -= 1; } else { this.xNextHead = this.sizeX-1;  } this.lastMoveDirection = "left";  }
    _right() {   if (this.xNextHead < this.sizeX - 1)   { this.xNextHead += 1; } else { this.xNextHead = 0;             } this.lastMoveDirection = "right"; }
    _down()  {   if (this.yNextHead < this.sizeY - 1)   { this.yNextHead += 1; } else { this.yNextHead = 0;             } this.lastMoveDirection = "down";  } 
    _up()    {   if (this.yNextHead > 0)                { this.yNextHead -= 1; } else { this.yNextHead = this.sizeY-1;  } this.lastMoveDirection = "up";    }
    getXNextHead() { return this.xNextHead; }
    getYNextHead() { return this.yNextHead; }
    getXHead() { return this.xHead; }
    getYHead() { return this.yHead; }
    getDirection() { return this.direction; }

    // setDirection(direction) {
        // if(!direction) { return; }
        // if(direction == "") { return; }
        // if(this.lastMoveDirection == direction) { return; }
        // if(this.lastMoveDirection == "up" && direction == "down") { return; }
        // if(this.lastMoveDirection == "down" && direction == "up") { return; }
        // if(this.lastMoveDirection == "left" && direction == "right") { return; }
        // if(this.lastMoveDirection == "right" && direction == "left") { return; }
        // this.direction = direction;
    // }

    restart(startX, startY) {
        this.xHead = startX;
        this.yHead = startY;
        this.xNextHead = startX;
        this.yNextHead = startY;
        this.xBody = [];
        this.yBody = [];
        this.addElementToBody(startX, startY);
        this.direction = "right";
        this.lastMoveDirection = "right";
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
    
    isEqualDirection(d1,d2){
        // right up down left
        if (d1 == d2 ) { return true; }
        if (d1 == "up" && d2 == "down") { return true; }
        if (d1 == "down" && d2 == "up") { return true; }
        if (d1 == "left" && d2 == "right") { return true; }
        if (d1 == "right" && d2 == "left") { return true; }
        return false;
    }

    isCollisionWithBody(x,y,direction) {
        if(this.xBody.length <= 0 ) return false;
        for(var i = 0 ; i < this.xBody.length; i++) {
            if(x == this.xBody[i] && y == this.yBody[i]) {
                if(this.isEqualDirection(direction,this.direction)) {
                    if(x != this.xHead && y != this.yHead) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }
        return false;
    }

    isCollisionWith(x,y) {  
        var current = (x == this.xHead && y == this.yHead);
        var next = (x == this.xNextHead && y == this.yNextHead);
        return current || next;
    }
}
module.exports = snakeplayer;