const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const CMD_SETPIXEL_COLOR = 1
const CMD_SHOW = 2
const CMD_SET_MATRIX_COLOR = 3

var parser = new Readline()
var port =  new SerialPort('/dev/ttyACM0', { baudRate: 115200 });
port.pipe(parser)
parser.on('data', line => console.log(`<<< ${line}`))
var x = 0;
var r = 0
var g = 0
var b = 0
// setTimeout(()=>{setInterval(function() { sendNewColor(); }, 20);}, 3000);
setTimeout(()=>{setInterval(function() { sendMatrixColor(); }, 100);}, 3000);

function sendMatrixColor() {
    if(r==0   && g==0   && b==0     ) { r=255;  g=0;    b=0;    } else
    if(r==255 && g==0   && b==0     ) { r=255;  g=0;    b=255;  } else
    if(r==255 && g==0   && b==255   ) { r=0;    g=0;    b=255;  } else
    if(r==0   && g==0   && b==255   ) { r=0;    g=255;  b=255;  } else
    if(r==0   && g==255 && b==255   ) { r=0;    g=255;  b=0;    } else
    if(r==0   && g==255 && b==0     ) { r=255;  g=255;  b=0;    } else
    if(r==255 && g==255 && b==0     ) { r=255;  g=255;  b=255;  } else
    if(r==255 && g==255 && b==255   ) { r=255;  g=0;    b=0;    }
    var buffer = new Uint8Array(722);
    buffer[0] = CMD_SET_MATRIX_COLOR;
    var idx = 1;
    for(var i=0;i<240;i++) {
        buffer[idx++] = r;
        buffer[idx++] = g;
        buffer[idx++] = b;
    }
    buffer[721] = CMD_SHOW;
    port.write(buffer);
}
function sendNewColor() {
    var buffer = new Uint8Array(6);
    buffer[0] = CMD_SETPIXEL_COLOR;
    buffer[1] = x;
    buffer[2] = r;
    buffer[3] = g;
    buffer[4] = b;
    buffer[5] = CMD_SHOW;
    port.write(buffer);
    // console.log(">>> " + buffer)
    if(x == 240) {
        if(r==255) { r=0; b=255;} else
        if(b==255) { b=0; g=255;} else
        if(g==255) { g=0; r=255;}
        x = 0;
    } else {
        x += 1;
    }
}