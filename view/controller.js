class controller {
    constructor(ip, port, appManager) {
        var self = this;
        this.appManager = appManager;
        this.ip = ip;
        this.port = port;
        this.express = require('express');
        this.app = this.express();
        this.http = require('http').Server(this.app);
        this.app.use('/', this.express.static(__dirname + '/../public/controller/'));
        var io = require('socket.io')(this.http);
        io.on('connection', function(client){
            self.appManager.addNewPlayer(client.id);
            io.emit('connected', client.id);
            // var queuePosition = self.appManager.getQueuePosition();
            // if(queuePosition == 0){
            //     io.emit('login', queuePosition);
            // }
            client.on('new_player', function(username){
                self.appManager.setPlayerUsername(client.id, username);
                io.emit('start', client.id, username);
            });
            client.on('disconnect', function() {
                console.log("Client " + client.id + " disconnected");
                self.appManager.removePlayer(client.id);
            });
            client.on('right', function(direction) {
                self.appManager.rightControlerCommand(client.id, direction);
            });

            client.on('left', function(direction) {
                self.appManager.leftControlerCommand(client.id, direction);
            });
        });
        this.http.listen(this.port);
        console.log('controller App: ' + this.ip + ":" + this.port);
    }
}
module.exports = controller;