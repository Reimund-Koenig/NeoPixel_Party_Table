const SerialPort = require('serialport')
// const Readline = require('@serialport/parser-readline')
const CMD_SETPIXEL_COLOR = 1
const CMD_SHOW = 2
const CMD_SET_MATRIX_COLOR = 3

class serial {
    constructor(sizeX, sizeY) {
        // this.parser = new Readline()
        this.port =  new SerialPort('COM6', { baudRate: 115200 });
        // this.port.pipe(this.parser)
        // this.parser.on('data', line => console.log(`<<< ${line}`))
        this.buffer_len = [];
        this.buffer_queue = [];
        var self = this;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
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
        for(var i=0;i<this.sizeX*this.sizeY;i++) {
            this.buffer_queue.push(b);
            this.buffer_queue.push(g);
            this.buffer_queue.push(r);
        }
        this.buffer_len.push(1 + (this.sizeX*this.sizeY*3));
    }

    // 50Hz possible
    setColor(x,y,r,g,b) {
		//var totalpos = this.getX(x,y);		
        this.buffer_queue.push(CMD_SETPIXEL_COLOR);
//        this.buffer_queue.push(totalpos);
        this.buffer_queue.push(x);
        this.buffer_queue.push(y);
        this.buffer_queue.push(r);
        this.buffer_queue.push(g);
        this.buffer_queue.push(b);
        this.buffer_len.push(6);
		//console.log("triggered pos from " + x + ", " + y + " to " + totalpos  + " col " + r  + " " + g  + " " + b );
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

	//moved to arduino in multi-tile context (>256 LED, no direct addressing in BYTES) 
    getX(x,y) {
        if(x%2==0) {
            return (x * this.sizeY) + y;
        } else {
            return (x * this.sizeY) + (this.sizeY-1-y);
        }
    }
}
module.exports = serial;