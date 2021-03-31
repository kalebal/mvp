const firebase = require('firebase/app');
const firestore = require('firebase/firestore');
const { firebaseConfig } = require('../db.config.js');

module.exports = {
  connect() {
    return firebase.initializeApp(firebaseConfig);
  },
  getDatabase() {
    return firebase.firestore();
  }
}