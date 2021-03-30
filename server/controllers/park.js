const dbConnection = require('../../db/index.js');



exports.getParks = (req, res) => {
  let db = dbConnection.getDatabase();
  db.collection('parks').find().toArray()
  .then((results) => {
    res.status(200).send(results);
  }).catch((err) => {
    console.log(err);
    res.status(404).send(err);
  });
};

//TODO: add a puppy to a park at a certain hour
//currently increments total count
exports.add = (req, res) => {
  let db = dbConnection.getDatabase();
  let { park_id } = req.params;
  let { hour } = req.query;
  db.collection('parks').findOneAndUpdate({ _id: 12 },
    {$inc: {"totalAtendees": 1}})
      .then(() => {
    res.status(200).send('updated');
  }).catch((err) => {
    res.status(400).send(err);
  })
};


//utility function for development
//before use in production add duplicate validation
//handle default open/close times
exports.addPark = (req, res) => {
  let db = dbConnection.getDatabase();
  let { name, address, openTime, closeTime } = req.body;
  let newId = dbConnection.getNextSequence().then((id) => {
    let newPark = {
      _id: id,
      name: name,
      address: address,
      openTime: openTime,
      closeTime: closeTime
    };
    db.collection('parks').insertOne(newPark)
    .then((added) => {
      res.status(200).send(added);
    }).catch((err) => {
      res.status(400).send(err);
    });
  });

};