const axios = require("axios");
const { OPEN_WEATHER_API_KEY } = require("../config");

const getWeatherInfo = async cityId => {
  const { data } = await axios({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/forecast",
    params: {
      id: cityId,
      units: "metric",
      lang: "ru",
      appid: OPEN_WEATHER_API_KEY
    }
  });
  return data.list.slice(0, 8);
};
const weatherIcon = {
  "01d": "☀",
  "02d": "⛅",
  "03d": "☁",
  "04d": "☁",
  "09d": "🌧",
  "10d": "🌦",
  "11d": "🌩",
  "13d": "❄",
  "50d": "🌫",
  "01n": "🌕",
  "02n": "⛅",
  "03n": "☁",
  "04n": "☁",
  "09n": "🌧",
  "10n": "🌦",
  "11n": "🌩",
  "13n": "❄",
  "50n": "🌫"
};

const getWindDirection = deg => {
  switch (deg) {
    case (deg >= 30) & (deg < 75):
      return "↗";
    case (deg >= 75) & (deg < 120):
      return "➡";
    case (deg >= 120) & (deg < 165):
      return "↘";
    case (deg >= 165) & (deg < 210):
      return "⬇";
    case (deg >= 210) & (deg < 255):
      return "↙";
    case (deg >= 255) & (deg < 300):
      return "⬅";
    case (deg >= 300) & (deg < 345):
      return "↖";
    default:
      return "⬆";
  }
};

const createWeatherMessage = ({
  dt_txt,
  main,
  weather,
  clouds,
  wind,
  rain,
  snow
}) => `
   *📅 ${dt_txt}* \n
   ${weatherIcon[weather[0].icon]} _${weather[0].description}_ \n
   🌡 ${main.temp} °C (🔻${main.temp_min} °C | 🔺 ${main.temp_max} °C) \n
   🅿 ${main.pressure} hPa   💧 ${main.humidity} % \n
   ☁ ${clouds.all} %     💨 ${getWindDirection(wind.deg)} ${wind.speed} м/с \n
   `;

const weather = cityId => async ctx => {
  ctx.reply("А в окно посмотреть не судьба???");
  const weather = await getWeatherInfo(cityId);
  let weatherReply = `${ctx.match} \n`;
  weather.forEach(
    item => (weatherReply = weatherReply.concat(createWeatherMessage(item)))
  );
  await ctx.replyWithMarkdown(weatherReply);
};

module.exports = weather;
