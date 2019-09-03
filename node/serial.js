const SerialPort = require('serialport')

class serial {
    constructor() {
        this.port =  new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
    }

    setColor(x,y,r,g,b) {
        console.log("X: " + x + "  - Y: " + y  +  " - Result:" + this.getX(x,y));
        console.log("-------------------")
        this.port.write(this.getX(x,y) + "," + r + "," + g + "," + b + "\n");
    }
    
    setMatrix(color_array) {
        console.log(color_array);
    }

    getX(x,y) {
        return (x*15) + (y*14);
    }
}
module.exports = serial;