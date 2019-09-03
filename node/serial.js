const SerialPort = require('serialport')

class serial {
    constructor() {
        this.port =  new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
    }

    setColor(x,y,r,g,b) {
        this.port.write(this.getX(x,y) + "," + r + "," + g + "," + b + "\n");
    }
    
    setMatrix(color_array) {
        console.log(color_array);
    }

    getX(x,y) {
        if(x%2==0) {
            return (x * 15) + y;
        } else {
            return (x * 15) + (14-y);
        }
    }
}
module.exports = serial;