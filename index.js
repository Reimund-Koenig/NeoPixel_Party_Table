const IP = require("ip");
const CollWebserver = require('./coll_webserver/private/coll_webserver')
const port = 3000;
let coll_webserver_instance = new CollWebserver(IP.address(), port);
