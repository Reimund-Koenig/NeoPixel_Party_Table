class webserver_view {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.express = require('express');
        this.app = this.express();
        this.http = require('http').Server(this.app);
        this.app.use('/', this.express.static(__dirname + '../public/'));
        // var io = require('socket.io')(this.http);
        // io.on('connection', function(client){
        //     io.emit('connected');
        //     client.on('msg', function(msg){
        //         console.log("Message: " + msg)
        //         io.emit('msg', msg);
        //         //send msg to one client only: client.emit("topic", "message")
        //     });
        // });
        // this.io = io;
        this.http.listen(this.port);
        console.log('Coll Action Games: ' + this.ip + ":" + this.port);
    }

    // show() {
    //     this.io.emit('show');
    // }
}
module.exports = webserver_view;