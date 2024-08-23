// weatherService.js contains the logic for fetching weather data.
import rp from 'request-promise';

// Fetch weather data by city name
export const fetchWeatherByLocation = async (lat, lon) => {
  const options = {
    uri: process.env.OPEN_WEATHER_URL,
    qs: {
      lat,
      lon,
      appid: process.env.OPEN_WEATHER_API_KEY,
      units: 'metric' // Use 'imperial' for Fahrenheit
    },
    json: true // Automatically parses the JSON string in the response
  };

  try {
    return await rp(options);
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
