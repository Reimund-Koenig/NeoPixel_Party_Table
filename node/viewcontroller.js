class viewcontroller {
    constructor(view, serial) {
        this.view = view;
        this.serial = serial;
    }
    
    setColor(x,y,r,g,b,d=0) {
        this.view.setColor(x,y,r,g,b);
        // this.serial.setColor(x,y,r,g,b);
        var self = this;
        setTimeout(function() { self.serial.setColor(x,y,r,g,b); }, d);
    }
    setMatrix(color_array) {
        console.log(color_array);
    }
}
module.exports = viewcontroller;