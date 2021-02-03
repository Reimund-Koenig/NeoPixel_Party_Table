const IP = require("ip");

const View = require('./server/view/view')
// const Serial = require('./server/controller/serial')
const Viewcontroller = require('./control/viewcontroller')
const Controller = require('./server/view/controller')
const Menu = require('./server/view/menu')
const AppManager = require('./control/app_mgr')

var sizeX = 16;
var sizeY = 16;
var FirstPersonControl = false;   // control command relative to the ingame players unit movement


var view_website = new View(IP.address(), 3002, sizeX, sizeY);
var viewcontroller = new Viewcontroller(view_website);
var appManager = new AppManager(viewcontroller, sizeX, sizeY, FirstPersonControl);

var self = this; // Start controller delayed, that app is already started
setTimeout(function() { self.controller = new Controller(IP.address(), 3001, appManager); }, 2000);
setTimeout(function() { self.menu = new Menu(IP.address(), 3003, appManager); }, 3000);
