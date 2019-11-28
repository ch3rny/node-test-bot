const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");

const start = ctx =>
  ctx.reply('Ну чего тебе опять надо ???',
    Markup.keyboard([["☀️ Харьков", "☀️ Изюм"], ["💹 Курс валют"]])
      .resize()
      .extra()
  );

module.exports = start;
