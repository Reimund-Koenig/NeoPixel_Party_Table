console.log("Start Server");
var express = require('express'),
app = express(); 
app.use('/', express.static(__dirname + '/controller'));
app.listen(80);
console.log('server running on port 80'); 

