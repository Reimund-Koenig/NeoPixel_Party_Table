class viewcontroller {
    constructor(view, serial) {
        this.view = view;
        this.serial = serial;
    }
    
    reset() {
        console.log("Reset View (web and serial)")
        this.serial.setMatrixColor(0,0,0);
        this.view.setMatrixColor(0,0,0);
    }

    setMatrixColor(r,g,b) {
        console.log("Set Color " + r + ", "+ g + ", "+ b );
        this.view.setMatrixColor(r, g, b);
        this.serial.setMatrixColor( r, g, b);
    }
    
    setColor(x,y,r,g,b) {
        // console.log("Set Color " + x + ", "+ y + ", "+  r + ", "+ g + ", "+ b );
        this.view.setColor(x,y,r,g,b);
        this.serial.setColor(x,y,r,g,b);
    }

    show() {
        // this.view.show();
        this.serial.show();
    }

    setMatrix(color_array) {
        console.log(color_array);
    }
}
module.exports = viewcontroller;