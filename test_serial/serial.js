const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

var parser = new Readline()
var port =  new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
port.pipe(parser)
parser.on('data', line => console.log(`<<< ${line}`))
var x = 0;
var r = 255
var g = 0
var b = 0
setTimeout(()=>{setInterval(function() { sendNewColor(); }, 20);}, 3000);


function sendNewColor() {
    var buffer = new Uint8Array(4);
    buffer[0] = x;
    buffer[1] = r;
    buffer[2] = g;
    buffer[3] = b;
    port.write(buffer);
    // port.
    console.log(">>> " + buffer)
    if(x == 240) {
        if(r==255) { r=0; b=255;} else
        if(b==255) { b=0; g=255;} else
        if(g==255) { g=0; r=255;}
        x = 0;
    } else {
        x += 1;
    }
}