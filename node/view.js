class view {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.express = require('express');
        this.app = this.express();
        this.http = require('http').Server(this.app);
        this.app.use('/', this.express.static(__dirname + '/public/view'));
        var io = require('socket.io')(this.http);
        io.on('connection', function(client){
            client.on('msg', function(msg){
                console.log("Message: " + msg)
                io.emit('msg', msg);
                //send msg to one client only: client.emit("topic", "message")
            });
        });
        this.io = io;
        this.http.listen(this.port);
        console.log('view App: ' + this.ip + ":" + this.port);
    }

    setColor(x,y,r,g,b) {
        this.io.emit('color', {"x":x, "y":y, "r":r, "g":g, "b":b} );
    }
}
module.exports = view;