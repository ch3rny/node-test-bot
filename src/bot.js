const { BOT_TOKEN } = require("./config");
const Telegraf = require("telegraf");
const setupCommands = require("./commands");

const bot = new Telegraf(BOT_TOKEN);
bot.use(Telegraf.log());

setupCommands(bot)

bot.startPolling();
