const dbConnection = require('../../db/index.js');
const firebase = require('firebase/app');
const firestore = require('firebase/firestore');

exports.getParks = (req, res) => {
  let db = dbConnection.getDatabase();
  parksRef = db.collection('parks');

  parksRef.get()
  .then((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('all park data: ', data);
    return data;
  }).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(400).send('Error retrieving Parks:', err);
  });
};

exports.getOnePark = (req, res) => {
  let db = dbConnection.getDatabase();
  let { park_id } = req.params;
  parksRef.get(park_id)
    .then((doc) => {
      if (!doc.exists) return;
      console.log("park data:", doc.data());
      return doc;
    }).then((doc) => {
      res.status(200).send(doc);
    }).catch((err) => {
      res.status(400).send('Error retrieving Park:' + err);
    });
};

//TODO: add a puppy to a park at a certain hour
//currently increments total count
exports.add = (req, res) => {
  let db = dbConnection.getDatabase();
  let { park_id } = req.params;
  let { hour } = req.body;
  hour = parseInt(hour);

  let update = {};
  update[`hourlyAttendance.${hour}.attendance`] = firebase.firestore.FieldValue.increment(1);
  var parkRef = db.collection("parks").doc(park_id);
  parkRef.update(update).then((doc) => {
    return doc;
  }).then((doc) => {
    res.status(200).send(doc);
  }).catch((err) => {
    res.status(400).send(`Error retrieving Park: ${err}`);
  });
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
  let newPark = {
    name: name,
    address: address,
    openTime: openTime,
    closeTime: closeTime,
    hourlyAttendance: hourlyAttendance,
    totalAttendees: 0
  };
  db.collection('parks').add(newPark)
  .then((ref) => {
    console.log('added doc w/ id: ', ref.id);
    res.status(200).send(ref);
  }).catch((err) => {
    res.status(400).send(err);
  });

};