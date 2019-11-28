const start = require("./start");
const weather = require("./weather");
const rates = require("./rates");

const setupCommands = bot => {
  bot.command("start", start);
  bot.command("help", start);
  bot.command("weather", weather);
  bot.command("rates", rates);

  bot.hears("☀️ Харьков", weather(706483));
  bot.hears("☀️ Изюм", weather(707292));
  bot.hears("💹 Курс валют", rates);
};

module.exports = setupCommands;
