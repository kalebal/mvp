const mongo = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbName = 'dogparks';

let _database;

module.exports = {
  connect(callback) {
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
      if (err) {
        console.log('IN DBUTIL ERROR CONNECTING TO DB');
        console.log(err);
        return callback(err);
      }
      _database = client.db(dbName);
      return callback(err, client);
    });
  },

  getDatabase() {
    return _database;
  },

  getNextSequence(name = 'parkid') {
    console.log('get next seq');

    return _database.collection('counters').findOneAndUpdate(
      { _id: name},
      { $inc: { seq: 1 }},
      { returnNewDocument: true }

    ).then((newDoc) => {
      console.log('new doc', newDoc);
      return newDoc.value.seq;
    });
  }
};

