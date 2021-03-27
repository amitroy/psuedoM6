const api = require('express')([mergeParams = true]);
const bodyParser = require('body-parser');
const http = require('http');
const config = require('./config');
const apiRouter = require('./routes');
const utilities = require('./utilities');
const db = require('./db');

const PORT = config.serverPort;
const DRAWINTERVAL = config.drawInterval;

api.server = http.createServer();
api.listen(PORT, () => {
    console.log(`M6 is now accepting requests over http://localhost:${PORT}`)
})
api.use(bodyParser.json());
api.use('/api/v1/', apiRouter)

utilities.startAutoDraw(DRAWINTERVAL, db.tickets, db.winners);
console.log(`Auto Draw is set at an interval of ${DRAWINTERVAL}ms`);

module.exports = api;