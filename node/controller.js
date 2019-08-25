class controller {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.express = require('express');
        this.app = this.express();
        this.http = require('http').Server(this.app);
        this.app.use('/', this.express.static(__dirname + '/public/controller'));
        var io = require('socket.io')(this.http);
        io.on('connection', function(socket){
            socket.on('msg', function(msg){
                console.log("Message: " + msg)
                io.emit('msg', msg);
            });
            socket.on('move', function(msg){
                console.log("Move: " + msg)
            });
        });

    }

    run() {
        this.http.listen(this.port);
        console.log('controller App: ' + this.ip + ":" + this.port);
    }
}
module.exports = controller;