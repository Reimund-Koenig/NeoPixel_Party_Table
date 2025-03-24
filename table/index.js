const IP = require("ip");

const Playground = require('./user_interfaces/playground/web/playground')
const Gamepad = require('./user_interfaces/gamepad/web/gamepad')
const Debug_Information = require('./user_interfaces/debug_information/web/debug_information')
const Viewcontroller = require('./control/viewcontroller')
const AppManager = require('./control/app_mgr')

var sizeX = 16;
var sizeY = 16;
var FirstPersonControl = false;   // control command relative to the ingame players unit movement


var web_playgound = new Playground(IP.address(), 3002, sizeX, sizeY);
var viewcontroller = new Viewcontroller(web_playgound);
var appManager = new AppManager(viewcontroller, sizeX, sizeY, FirstPersonControl);

var self = this; // Start delayed, that app is already started
setTimeout(function() { self.gamepad = new Gamepad(IP.address(), 3001, appManager); }, 2000);
setTimeout(function() { self.menu = new Debug_Information(IP.address(), 3003, appManager); }, 3000);
