var ip = require("ip");
const View = require('./view')
const Viewcontroller = require('./viewcontroller')
const Controller = require('./controller')

var view = new View(ip.address(), 3002);
var viewcontroller = new Viewcontroller(view);
var controller = new Controller(ip.address(), 3001, viewcontroller);

//function delayedFunction(arg) {
//    console.log(`arg was => ${arg}`);
//    view.setColor(0,0,255,0,0);
//}


//setTimeout(delayedFunction, 3000, 'funky');