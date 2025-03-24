const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();

  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
}
const Playground = require('./user_interfaces/playground/web/playground')
const Gamepad = require('./user_interfaces/gamepad/web/gamepad')
const Debug_Information = require('./user_interfaces/debug_information/web/debug_information')
const Viewcontroller = require('./control/viewcontroller')
const AppManager = require('./control/app_mgr')

var sizeX = 16;
var sizeY = 16;
var FirstPersonControl = false;   // control command relative to the ingame players unit movement
var ip_address = getLocalIP()

var web_playgound = new Playground(ip_address, 3002, sizeX, sizeY);
var viewcontroller = new Viewcontroller(web_playgound);
var appManager = new AppManager(viewcontroller, sizeX, sizeY, FirstPersonControl);

var self = this; // Start delayed, that app is already started
setTimeout(function() { self.gamepad = new Gamepad(ip_address, 3001, appManager); }, 2000);
setTimeout(function() { self.menu = new Debug_Information(ip_address, 3003, appManager); }, 3000);
