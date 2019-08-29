class viewcontroller {
    constructor(view) {
        var self = this;
        this.view = view;
        this.serial = Object();
    }
    setColor(x,y,r,g,b) {
        this.view.setColor(x,y,r,g,b);
        //this.serial.setColor(this.x,this.y,170,170,170);
    }
    setMatrix(color_array) {
        console.log(color_array);
    }
}
module.exports = viewcontroller;