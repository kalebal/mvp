const geofire = require('geofire-common');
const axios = require('axios');
const config = require('../../db.config.js')

let baseURL = 'http://api.positionstack.com/v1/forward';
exports.getGeocoding = (address) => {
  let params = {
    access_key: config.POSITION_APIKEY,
    query: address,
    limit: 1
  }
  return axios.get(baseURL, {params: params})
  .then((res) => {
    let { latitude, longitude } = res.data.data[0];
    return { lat: latitude, lng: longitude };
  })
  .catch((err) => {
    return err;
  });
}

exports.getCounty = (address) => {
  let params = {
    access_key: config.POSITION_APIKEY,
    query: address,
    limit: 1
  }
  return axios.get(baseURL, { params: params })
    .then((res) => {
      console.log(res.data.data[0])
      return res.data.data[0]['county'];
    })
    .catch((err) => {
      return err;
    });
}