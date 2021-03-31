const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getParks, getOnePark, add, addPark } = require('./controllers/park');
const dbConnection = require('../db/index');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/parks', getParks);
app.get('/parks/:park_id', getOnePark);
app.post('/parks', addPark);
app.put('/parks/:park_id', add);

const PORT = process.env.PORT || 3000;

dbConnection.connect((err, client) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to db!');
  }
});

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});
