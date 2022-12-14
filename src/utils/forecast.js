const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=37cc8c11ab51213d2551e9262e74181f&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    const temp = body.current.temperature;
    const feelsLike = body.current.feelslike;
    const weatherDescription = body.current.weather_descriptions;
    const precip = body.current.precip * 100;
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("Unable to find location. Please try again", undefined);
    } else {
      callback(
        undefined,
        "It is currently " +
          temp +
          " degrees and it feels like " +
          feelsLike +
          ". It is " +
          weatherDescription.toString().toLowerCase() +
          " and there is a " +
          precip +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
