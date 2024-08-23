// weatherController.js contains the logic for the /weather endpoint.
import { fetchWeatherByLocation } from '../services/weatherService.js';

// Check if the weather is good for a dog walk
function isGoodDayForDogWalk(weatherData) {
  const { main, weather, wind } = weatherData;

  // Check temperature range
  const isTempIdeal = main.temp >= 15 && main.temp <= 24;

  // Check weather conditions: avoid rain, snow, or any extreme weather
  // https://openweathermap.org/weather-conditions
  const weatherIds = weather.map((item) => item.id);
  const isWeatherGood = !weatherIds.some(
    (id) =>
      (id >= 200 && id <= 232) || // Thunderstorm
      (id >= 300 && id <= 531) || // Drizzle & Rain
      (id >= 600 && id <= 622) || // Snow
      (id >= 781 && id !== 801 && id !== 802) // Tornado
  );

  // Check wind speed (convert m/s to km/h by multiplying by 3.6)
  const isWindOk = wind.speed * 3.6 < 20;

  // Check humidity - avoid high humidity on hot days
  const isHumidityOk = !(main.temp > 20 && main.humidity > 80);

  return isTempIdeal && isWeatherGood && isWindOk && isHumidityOk;
}

// Get the weather for a specific location
export const getWeather = async (req, res) => {
  const { lat, lon } = req.query; // Expect latitude and longitude as query parameters
  if (!lat || !lon) {
    return res.status(400).json({
      message: 'Please provide both latitude (lat) and longitude (lon) query parameters.'
    });
  }

  try {
    const weather = await fetchWeatherByLocation(lat, lon);
    res.json({ ...weather, isGoodDayForWalk: isGoodDayForDogWalk(weather) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
