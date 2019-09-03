class viewcontroller {
    constructor(view, serial) {
        var self = this;
        this.view = view;
        this.serial = serial;
    }
    
    setColor(x,y,r,g,b) {
        this.view.setColor(x,y,r,g,b);
        this.serial.setColor(x,y,r,g,b);
    }
    setMatrix(color_array) {
        console.log(color_array);
    }
}
module.exports = viewcontroller;