const http = require('http');
const app = require('./lib/app');
require('./lib/connect');

const connect = require('./lib/connect');
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz';
connect(dbUri);

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('server up and running on port', server.address().port);
});