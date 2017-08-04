require('dotenv').config('tests/.env')
const dbUri = process.env.MONGO_URI;
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = function(dbUri) {
  // TODO: close existing connection, if already open...
  const promise = mongoose.connect(dbUri).then(() => mongoose.connection);

  // CONNECTION EVENTS
  // Successful connection
  mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to ' + dbUri);
  });
}