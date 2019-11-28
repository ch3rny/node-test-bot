const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY
};
