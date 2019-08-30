var ip = require("ip");
const View = require('./view')
const Viewcontroller = require('./viewcontroller')
const Controller = require('./controller')
const AppManager = require('./app_mgr')

var view = new View(ip.address(), 3002);
var viewcontroller = new Viewcontroller(view);
var appManager = new AppManager(this, viewcontroller);
var controller = new Controller(ip.address(), 3001, appManager);