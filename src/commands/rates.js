const axios = require("axios");

const getCurrencyRates = async () => {
  const { data } = await axios({
    method: "GET",
    url: "https://api.privatbank.ua/p24api/pubinfo",
    params: {
      json: true,
      exchange: true,
      coursid: 5
    }
  });
  return data;
};

const createRateMessage = ({ccy, base_ccy, buy, sale}) => `💰 *${ccy}/${base_ccy}:* ${parseFloat(buy).toFixed(2)} / ${parseFloat(sale).toFixed(2)} \n \n`

const rates = async ctx => {
  ctx.reply('Ахах, а у тебя есть что менять??')
  const rates = await getCurrencyRates();
  let replyMessage = ``
  rates.forEach(rate => replyMessage = replyMessage.concat(createRateMessage(rate)))
  await ctx.replyWithMarkdown(replyMessage);
};

module.exports = rates;
