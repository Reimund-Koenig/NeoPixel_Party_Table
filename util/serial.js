const SerialPort = require('serialport')
// const Readline = require('@serialport/parser-readline')

class serial {
    constructor() {
        // this.parser = new Readline()
        this.port =  new SerialPort('/dev/ttyACM0', { baudRate: 2400 });
        // this.port.pipe(this.parser)
        // this.parser.on('data', line => console.log(`<<< ${line}`))
    }
      
    setColor(x,y,r,g,b) {
        var buffer = new Uint8Array(4);
        buffer[0] = this.getX(x,y);
        buffer[1] = r;
        buffer[2] = g;
        buffer[3] = b;
        this.port.write(buffer); 
        // console.log(
        //         "--- X:" + buffer[0]
        //         +   " -- R:" + buffer[1]
        //         +   " -- G:" + buffer[2]
        //         +   " -- B:" + buffer[3]
        // );
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