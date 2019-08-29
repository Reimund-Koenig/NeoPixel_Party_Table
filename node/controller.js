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
            client.on('new_player', function(msg){
                console.log("Message: " + msg)
                io.emit('start', msg);
            });
            client.on('control', function(cmd, user){
                console.log("CMD: " + cmd + " - User: " + user)
                self.appManager.control(cmd);
            });
        });
        this.http.listen(this.port);
        console.log('controller App: ' + this.ip + ":" + this.port);
    }
}
module.exports = controller;