class controller {
    constructor(ip, port, appManager) {
        var self = this;
        this.appManager = appManager;
        this.ip = ip;
        this.port = port;
        this.express = require('express');
        this.app = this.express();
        this.http = require('http').Server(this.app);
        this.app.use('/', this.express.static(__dirname + '/public/controller'));
        var io = require('socket.io')(this.http);
        io.on('connection', function(client){
            client.on('msg', function(msg){
                console.log("Message: " + msg)
                io.emit('msg', msg);
            });
            client.on('control', function(cmd){
                self.appManager.control(cmd);
            });
        });
        this.http.listen(this.port);
        console.log('controller App: ' + this.ip + ":" + this.port);
    }
}
module.exports = controller;