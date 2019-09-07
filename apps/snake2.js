class snake2Player {    
    constructor(startX, startY) {
        this.xHead = startX;
        this.yHead = startY;
        this.direction = "right";
        this.xBody = [];
        this.yBody = [];
        this.date = (new Date).getTime();
        this.isInactive = true;
        this.died = false;
        this.x_len = 16;
        this.y_len = 15;
    }
    run(snackX, snackY, viewcontroller) {
        if(this.isInactive) { return; }
        if(this.died)       { return; }
        var len = this.yBody.length;
        var hasEatenSnack = (snackX == this.xHead && snackY == this.yHead)
        if (hasEatenSnack) {
            this.xBody.push(this.xHead)
            this.yBody.push(this.yHead)
            viewcontroller.setColor(this.xHead,this.yHead,255,0,0);
        } else if(len > 0) {
            viewcontroller.setColor(this.xBody[0],this.yBody[0],0,0,0);
            for (var i = 0; i < len-1; i++) {
                this.xBody[i] = this.xBody[i+1]
                this.yBody[i] = this.yBody[i+1]
            }
            this.xBody[len-1] = this.xHead;
            this.yBody[len-1] = this.yHead;
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
        if(len>0) {
            viewcontroller.setColor(this.xBody[len-1],this.yBody[len-1],255,0,0);
        }
        
        viewcontroller.setColor(this.xHead,this.yHead,255,106,0);
        return hasEatenSnack;
    }
    _left()  {   if (this.xHead > 0) {  this.xHead -= 1;    }          else { this.xHead = 15;  }}
    _right() {   if (this.xHead < this.x_len - 1) { this.xHead += 1; } else { this.xHead = 0;   }}
    _down()  {   if (this.yHead < this.y_len - 1) { this.yHead += 1; } else { this.yHead = 0;   }} 
    _up()    {   if (this.yHead > 0) { this.yHead -= 1; }              else { this.yHead = 14;  }}
    setDirection(direction) {
        if(this.isInactive) { return; }
        if(!direction) { return; }
        if(direction == "") { return; }
        if(this.direction == direction) { return; }
        if(this.direction == "up" && direction == "down") { return; }
        if(this.direction == "down" && direction == "up") { return; }
        if(this.direction == "left" && direction == "right") { return; }
        if(this.direction == "right" && direction == "left") { return; }
        this.direction = direction;
    }
    getX() { return this.xHead; }
    getY() { return this.yHead; }
    gameover(viewcontroller) {
        if(this.isInactive) { return; }
        this.died = true;        
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
        if(this.died || this.isInactive) { return false; }  
        var collision = (x == this.xHead && y == this.yHead);
        for(var i = 0 ; i < this.xBody.length; i++) {
            collision |= (x == this.xBody[i] && y == this.yBody[i]);
        }
        return collision;
    }

}

class snake2 {
    constructor(app_mgr, viewcontroller) {
        this.nextAction = this.date;
        this.max_players = 8;
        this.app_mgr = app_mgr;
        this.viewcontroller = viewcontroller;
        this.p = [this.max_players];
        for(var i=0; i<this.max_players; i++) {
            this.p[i] = new snake2Player(i,i);
        }
        this.snackX = 0;
        this.snackY = 0;
        this.x_len = 16;
        this.y_len = 15;
        this._setRandomSnack();
        console.log("Game started")
    }

    addPlayer(id) {
        this.p[id].isInactive = false;
        this.p[id].died = false;
    }
    
    removePlayer(id) {
        console.log("removePlayer!");
        this.p[id].gameover(this.viewcontroller);
        this.p[id].isInactive = true;
    }

    run() {



        
        var cmd = this.app_mgr.getNextCommand();
        while(cmd) {
            var direction = cmd.cmd;
            this.p[cmd.id].setDirection(direction);
            cmd = this.app_mgr.getNextCommand();
        }       
        this.date = (new Date).getTime();
        if(this.nextAction > this.date) { return; }
        this.nextAction = this.date + 200;
        this.viewcontroller.setColor(this.snackX,this.snackY,0,255,0);
        var newSnack = false;
        // Move all Player body
        for(var i=0;i<this.max_players;i++) {
            newSnack |= this.p[i].run(this.snackX, this.snackY, this.viewcontroller);
        }

        var collisions = []
        // Head/Head Collision (both players dies)
        for(var i=0;i<this.max_players;i++) {
            var collision = false
            for(var j=0;j<this.max_players;j++) {
                if(i==j) { continue; }
                if(collision) { continue; }
                collision |= this.p[j].isCollisionWith(this.p[i].getX(),this.p[i].getY());
            }
            collisions.push(collision);
        }
        for(var i=0;i<this.max_players;i++) {
            if(collisions[i]) {
                this.p[i].gameover(this.viewcontroller);
            }
        }

        if(newSnack) {
            this._setRandomSnack();
            this.viewcontroller.setColor(this.snackX,this.snackY,0,255,0);
        }
    }

    _setRandomSnack() {
        var collision = true;
        while (collision) {
            var collision = false;
            this.snackX = Math.floor(Math.random() * this.x_len);
            this.snackY = Math.floor(Math.random() * this.y_len);
            for(var i=0;i<this.max_players;i++) {
                collision |= this.p[i].isCollisionWith(this.snackX,this.snackY);
            }
        }
    }
}
module.exports = snake2;