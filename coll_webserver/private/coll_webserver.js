class webserver_view {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.express = require('express');
        this.app = this.express();
        this.http = require('http').Server(this.app);
        this.app.use('/', this.express.static(__dirname + '/../public/'));
        let io = require('socket.io')(this.http);
        let number_of_players = 0;
        io.on('connection', function(client) {
            console.log("connected event");
            number_of_players++;
            io.emit('connected', number_of_players);
            client.on('msg', function(msg){
                console.log("Message: " + msg)
                io.emit('msg', msg);
                //send msg to one client only: client.emit("topic", "message")
            });
            client.on("disconnect", (reason) => {
                console.log("disconnect event");
                number_of_players--;
                io.emit('disconnected', number_of_players);
            });
        });
        this.io = io;
        this.http.listen(this.port);
        console.log('Coll Action Games: ' + this.ip + ":" + this.port);
    }

    // show() {
    //     this.io.emit('show');
    // }
}
module.exports = webserver_view;