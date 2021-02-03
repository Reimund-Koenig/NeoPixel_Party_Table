const SerialPort = require('serialport')
// const Readline = require('@serialport/parser-readline')
const CMD_SETPIXEL_COLOR = 1
const CMD_SHOW = 2
const CMD_SET_MATRIX_COLOR = 3

const Matrix_X =16
const Matrix_Y =16
const TileNum_X =1
const TileNum_Y =1

class serial {
    constructor(sizeX, sizeY) {
        // this.parser = new Readline()
        this.port =  new SerialPort('/dev/ttyACM0', { baudRate: 115200 });
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
    this.buffer_queue.push(CMD_SETPIXEL_COLOR);
//        this.buffer_queue.push(totalpos);
    this.buffer_queue.push(x);
    this.buffer_queue.push(y);
    this.buffer_queue.push(r);
    this.buffer_queue.push(g);
    this.buffer_queue.push(b);
    this.buffer_len.push(6);

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

 //this function moved to arduino in multi-tile context (>256 LED(!), no direct addressing in BYTES(!))
    getX(x,y) {
    if(Math.floor((x*Matrix_X)/16)%2==0) {
        return (x * TileNum_Y * Matrix_Y) + y%Matrix_Y + Math.floor(y/Matrix_Y)* Matrix_Y * Matrix_X;
    } else {
        return (x * TileNum_Y * Matrix_Y) + (Matrix_Y-1-y%Matrix_Y) + Math.floor(y/Matrix_Y)* Matrix_Y * Matrix_X;
        }
    }
}
module.exports = serial;