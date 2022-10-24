const request = require("request");

const geocode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=d4fe5b6a20ff8aec353abbf83b1a5afd&query=" +
    encodeURIComponent(address) +
    "&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.data.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        city: body.data[0].locality,
        country: body.data[0].country,
      });
    }
  });
};

module.exports = geocode;
