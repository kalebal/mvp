const firebase = require('firebase/app');

const { firebaseConfig } = {
  APIKEY: process.env.APIKEY,
  AUTHDOMAIN: process.env.AUTHDOMAIN,
  DATABASE_URL: process.env.DATABASE_URL,
  PROJECT_ID: process.env.PROJECT_ID,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
  APP_ID: process.env.APP_ID,
};

module.exports = {
  connect() {
    return firebase.initializeApp(firebaseConfig);
  },
  getDatabase() {
    return firebase.firestore();
  },
};
