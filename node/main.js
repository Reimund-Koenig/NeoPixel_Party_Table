const Controller = require('./controller')
var ip = require("ip");
const View = require('./view')
var controller = new Controller(ip.address(), 3001);
var view = new View(ip.address(), 3002);

view.run();
controller.run();

function delayedFunction(arg) {
    console.log(`arg was => ${arg}`);
    view.setColor(0,0,255,0,0);
}

setTimeout(delayedFunction, 3000, 'funky');