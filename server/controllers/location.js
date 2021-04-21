const axios = require('axios');
const config = require('../../db.config.js');

const baseURL = 'http://api.positionstack.com/v1/forward';
exports.getGeocoding = (address) => {
  const params = {
    access_key: config.POSITION_APIKEY,
    query: address,
    limit: 1,
  };
  return axios.get(baseURL, { params })
    .then((res) => {
      const { latitude, longitude } = res.data.data[0];
      return { lat: latitude, lng: longitude };
    })
    .catch((err) => err);
};

exports.getCounty = (address) => {
  const params = {
    access_key: config.POSITION_APIKEY,
    query: address,
    limit: 1,
  };
  return axios.get(baseURL, { params })
    .then((res) => res.data.data[0].county)
    .catch((err) => err);
};
