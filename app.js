const IP = require("ip");

const View = require('./view/view')
const Serial = require('./util/serial')
const Viewcontroller = require('./controller/viewcontroller')
const Controller = require('./view/controller')
const Menu = require('./view/menu')
const AppManager = require('./model/app_mgr')

var view = new View(IP.address(), 3002);
var serial = new Serial();
var viewcontroller = new Viewcontroller(view, serial);
var appManager = new AppManager(this, viewcontroller);

var self = this; // Start controller delayed, that app is already started
setTimeout(function() { self.menu = new Menu(IP.address(), 3003, appManager); }, 3000);
setTimeout(function() { self.controller = new Controller(IP.address(), 3001, appManager); }, 2000);
