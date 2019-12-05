const SerialPort = require('serialport')
// const Readline = require('@serialport/parser-readline')
const CMD_SETPIXEL_COLOR = 1
const CMD_SHOW = 2
const CMD_SET_MATRIX_COLOR = 3

class serial {
    constructor() {
        // this.parser = new Readline()
        this.port =  new SerialPort('COM4', { baudRate: 115200 });
        // this.port.pipe(this.parser)
        // this.parser.on('data', line => console.log(`<<< ${line}`))
        this.buffer_len = [];
        this.buffer_queue = [];
        var self = this;
        setTimeout(()=>{setInterval(function() { self.sendNextCommand(); }, 10);}, 3000);
    }
      
    sendNextCommand() {
        if(this.buffer_len.length == 0) {  return;  }
        var buffer_size = this.buffer_len.shift();
        // console.log("Buffer_size: " + buffer_size);
        // console.log("Buffer: " + this.buffer_queue);
        var buffer = new Uint8Array(buffer_size);
        for(var i=0; i<buffer_size;i++) {
            buffer[i] = this.buffer_queue.shift();
        }
        this.port.write(buffer);
        // console.log(">>> " + buffer);
    }

    // 10Hz possible
    setMatrixColor(r,g,b) {
        this.buffer_queue.push(CMD_SET_MATRIX_COLOR);
        for(var i=0;i<256;i++) {
            this.buffer_queue.push(b);
            this.buffer_queue.push(g);
            this.buffer_queue.push(r);
        }
        this.buffer_len.push(1 + (256*3));
    }

    // 50Hz possible
    setColor(x,y,r,g,b) {
        this.buffer_queue.push(CMD_SETPIXEL_COLOR);
        this.buffer_queue.push(this.getX(x,y));
        this.buffer_queue.push(r);
        this.buffer_queue.push(g);
        this.buffer_queue.push(b);
        this.buffer_len.push(5);
        // this.port.write(buffer); 
        // console.log(
        //         "--- X:" + buffer[0]
        //         +   " -- R:" + buffer[1]
        //         +   " -- G:" + buffer[2]
        //         +   " -- B:" + buffer[3]
        // );
    }
    
    show() {
        this.buffer_queue.push(CMD_SHOW);
        this.buffer_len.push(1);
    }

    getX(x,y) {
        if(x%2==0) {
            return (x * 16) + y;
        } else {
            return (x * 16) + (15-y);
        }
    }
}
module.exports = serial;