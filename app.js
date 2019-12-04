const IP = require("ip");

const View = require('./server/view/view')
const Serial = require('./server/controller/serial')
const Viewcontroller = require('./server/controller/viewcontroller')
const Controller = require('./server/view/controller')
const Menu = require('./server/view/menu')
const AppManager = require('./server/controller/app_mgr')

var sizeX = 16;
var sizeY = 16;

var view = new View(IP.address(), 3002, sizeX, sizeY);
var serial = new Serial();
var viewcontroller = new Viewcontroller(view, serial);
var appManager = new AppManager(viewcontroller, sizeX, sizeY);

var self = this; // Start controller delayed, that app is already started
setTimeout(function() { self.controller = new Controller(IP.address(), 3001, appManager); }, 2000);
setTimeout(function() { self.menu = new Menu(IP.address(), 3003, appManager); }, 3000);
