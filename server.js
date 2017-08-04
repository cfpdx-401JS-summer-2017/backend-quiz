require('dotenv').config();
const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/connect');


const dbUri = process.env.MONGO_URI;
connect(dbUri);

const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
  console.log('server running on', server.address().port);
});
