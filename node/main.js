
var controller_port = 3001
var express = require('express'),
controller = express();
controller.use('/', express.static(__dirname + '/controller'));
controller.listen(controller_port);
console.log('Server Controller running on port ' + controller_port);


var view_port = 3002
var express = require('express'),
view = express();
view.use('/', express.static(__dirname + '/view'));
view.listen(view_port);
console.log('Server View runnning on port ' + view_port);
