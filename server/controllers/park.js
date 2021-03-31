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

exports.getOnePark = (req, res) => {
  let db = dbConnection.getDatabase();
  let { park_id } = req.params;
  db.collection('parks').findOne({_id: park_id})
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
  let { hour } = req.body;
  hour = parseInt(hour);
  park_id = parseInt(park_id);
  db.collection('parks').findOneAndUpdate({ '_id': park_id },
    {
      $inc: {"totalAttendees": 1},
      $inc: { 'hourlyAttendance.$[elem].attendance': 1}
    },
    {arrayFilters: [{'elem.hour': hour}]})
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
  let hourlyAttendance = [];
  for (var i = 0; i < 21; i++) {
    hourlyAttendance.push({hour: i, attendance: 0});
  }
  let newId = dbConnection.getNextSequence().then((id) => {
    let newPark = {
      _id: id,
      name: name,
      address: address,
      openTime: openTime,
      closeTime: closeTime,
      hourlyAttendance: hourlyAttendance,
      totalAttendees: 0
    };
    db.collection('parks').insertOne(newPark)
    .then((added) => {
      res.status(200).send(added);
    }).catch((err) => {
      res.status(400).send(err);
    });
  });

};