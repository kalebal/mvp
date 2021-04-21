const axios = require('axios');

const baseURL = 'http://api.positionstack.com/v1/forward';
exports.getGeocoding = (address) => {
  const params = {
    access_key: process.env.POSITION_APIKEY,
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
    access_key: process.env.POSITION_APIKEY,
    query: address,
    limit: 1,
  };
  return axios.get(baseURL, { params })
    .then((res) => res.data.data[0].county)
    .catch((err) => err);
};
