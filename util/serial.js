const SerialPort = require('serialport')
// const Readline = require('@serialport/parser-readline')
const CMD_SETPIXEL_COLOR = 1
const CMD_SHOW = 2

class serial {
    constructor() {
        // this.parser = new Readline()
        this.port =  new SerialPort('/dev/ttyACM0', { baudRate: 115200 });
        // this.port.pipe(this.parser)
        // this.parser.on('data', line => console.log(`<<< ${line}`))
        this.buffer_len = [];
        this.buffer_queue = [];
        var self = this;
        setTimeout(()=>{setInterval(function() { self.sendNewColor(); }, 20);}, 3000);
    }
      
    sendNewColor() {
        if(this.buffer_len.length <= 0) {  return;  }
        var buffer_size = this.buffer_len.shift();
        var buffer = new Uint8Array(buffer_size);
        for(var i=0; i<buffer_size;i++) {
            buffer[i] = this.buffer_queue.shift();
        }
        this.port.write(buffer);
        // console.log(">>> " + buffer);
    }

    setColor(x,y,r,g,b) {
        this.buffer_queue.push(CMD_SETPIXEL_COLOR);
        this.buffer_queue.push(this.getX(x,y));
        this.buffer_queue.push(r);
        this.buffer_queue.push(g);
        this.buffer_queue.push(b);
        this.buffer_queue.push(CMD_SHOW);
        this.buffer_len.push(6);
        // this.port.write(buffer); 
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