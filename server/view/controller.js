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
            client.on('new_player', function(username){
                var queuePos = self.appManager.calculateQueuePosition();
                self.appManager.initialisePlayer(client.id, username, queuePos);
                io.emit('ready', client.id, queuePos);
            });
            client.on('reconnect_player', function(username){
                console.log("Reconnect " +  client.id);
                var queuePos = self.appManager.calculateQueuePosition();
                console.log("Reconnect " +  client.id + " with username: " + username + " and queue position: " + queuePos);
                self.appManager.initialisePlayer(client.id, username, queuePos);
                io.emit('ready', client.id, queuePos);
            });
            client.on('start', function(){
                var queuePos = self.appManager.getQueuePosition(client.id);
                console.log("id : " + client.id + " -- QUEUE POS: " + queuePos);
                io.emit('ready', client.id, queuePos);
            });
            client.on('disconnect', function() {
                console.log("Client " + client.id + " disconnected");
                self.appManager.removePlayer(client.id);
                self.appManager.reduceQueuePositions();
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