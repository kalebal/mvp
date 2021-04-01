const dbConnection = require('../../db/index.js');
const firebase = require('firebase/app');
const firestore = require('firebase/firestore');
const geofire = require('geofire-common');
const { getGeocoding, getCounty } = require('./location');

exports.getParks = (req, res) => {
  let db = dbConnection.getDatabase();
  parksRef = db.collection('parks');

  parksRef.get()
  .then((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
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
  parksRef = db.collection('parks');
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
  update.totalAttendees = firebase.firestore.FieldValue.increment(1);
  var parkRef = db.collection("parks").doc(park_id);
  parkRef.update(update).then((doc) => {
    return doc;
  }).then((doc) => {
    res.status(200).send(doc);
  }).catch((err) => {
    res.status(400).send(`Error retrieving Park: ${err}`);
  });
};

exports.addPark = (req, res) => {
  let db = dbConnection.getDatabase();
  let { name, address, openTime, closeTime } = req.body.data;
  let hourlyAttendance = [];
  for (var i = 0; i < 21; i++) {
    hourlyAttendance.push({hour: i, attendance: 0});
  }
  getCounty(address).then((county) => {
    let newPark = {
      name: name,
      address: address,
      county: county,
      openTime: openTime,
      closeTime: closeTime,
      hourlyAttendance: hourlyAttendance,
      totalAttendees: 0
    };
    console.log(newPark)
    db.collection('parks').add(newPark)
    .then((ref) => {
      console.log('added doc w/ id: ', ref.id);
      res.status(200).send(ref);
    }).catch((err) => {
      res.status(400).send(err);
    });
  })

};

exports.getParkNear = (req, res) => {
  let db = dbConnection.getDatabase();

  let { address } = req.params;
  //get latitude n longitude of address
  getGeocoding(address)
    .then((data) => {
      let center = [parseInt(data.lat), parseInt(data.lng)];
      let radiusInM = 50000 * 100000;
      //bounds is a start/end pair
      const bounds = geofire.geohashQueryBounds(center, radiusInM);

      const promises = [];
      for (const b of bounds) {
        const q = db.collection('parks')
          .orderBy('geohash')
          .startAt(b[0])
          .endAt(b[1]);
        promises.push(q.get());
      }

      Promise.all(promises).then((snapshots) => {
        const matchingDocs = [];
        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            console.log(doc);
            const lat = doc.get('_lat');
            const lng = doc.get('_lng');
            const distanceInKm = geofire.distanceBetween([lat, lng], center);
            matchingDocs.push(docs);
          }
        }
        return matchingDocs;
      }).then((matchingDocs) => {
        res.status(200).send(matchingDocs);
      })
    }).catch((err) => {
      res.status(400).send('Error retrieving Parks:' + err);
    });
}