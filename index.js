let server = require('./server');
let router = require('./router');
let requesthandler = require('./requesthandler')

const mariadb = require('./database/connect/mariadb');
mariadb.connect();

server.start(router.route, requesthandler.handle);