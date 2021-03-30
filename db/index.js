const mongo = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/dogparks";

let db = '';

let connect = () => {
    MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true },
    function(err, database) {
    if (err) {
      throw err;
    }
    db = database;
    console.log('connected to db!');
  });
}

module.exports = {
  connect: connect,
  db: db
}