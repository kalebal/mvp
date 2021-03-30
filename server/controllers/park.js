const dbConnection = require('../../db/index.js');



exports.getParks = (req, res) => {
  let db = dbConnection.getDatabase();
  res.status(200).send('hello');
  db.find().then((results) => {
    res.status(200).send(results);
  }).catch((err) => {
    console.log(err);
    res.status(404).send(err);
  });
};

exports.add = (req, res) => {
  let db = dbConnection.getDatabase();
  let { name, hour } = req.body;
  db.collection('parks').updateOne({ name: name}, { $inc: {totalAttendees: 1}}).then(() => {
    res.status(200).send();
  }).catch((err) => {
    res.status(400).send();
  })
};

exports.addPark = (req, res) => {
  let db = dbConnection.getDatabase();
  console.log('adding park');
  let { name, address, openTime, closeTime } = req.body;
  console.log(name, address, openTime, closeTime);
  let newPark = {
    name: name,
    address: address,
    openTime: openTime,
    closeTime: closeTime
  };
  console.log(newPark);
  db.collection('parks').insertOne(newPark).then((added) => {
    res.status(200).send(added);
  }).catch((err) => {
    res.status(400).send(err);
  });

};