const axios = require("axios");
const CryptoJS = require("crypto-js");
const moment = require("moment");
const { BadRequestError } = require("../../response/error.response");

const { configs } = require("../../configs/index");

class PaymentHandler {
  async handler(price, user) {
    throw new BadRequestError("Not Implemented");
  }
}

class ZaloPayHandler extends PaymentHandler {
  async handler(price, user) {
    const items = [];
    const transID = Math.floor(Math.random() * 999999999);
    price = Number(price);
    user = user._id;

    const embed_data = {
      redirecturl: configs.ZALO_PAY.redirecturl,
      price: price, 
      user: user,
    };

    const order = {
      app_id: configs.ZALO_PAY.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
      app_user: user,
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: price,
      callback_url: configs.ZALO_PAY.callback_url,
      description: `Payment for the order #${transID}`,
      bank_code: "",
    };

    const data =
      configs.ZALO_PAY.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, configs.ZALO_PAY.key1).toString();

    try {
      const result = await axios.post(configs.ZALO_PAY.endpoint, null, {
        params: order,
      });

    
      return result.data;
    } catch (error) {
      throw new BadRequestError("Payment failed: ", error);
    }
  }
}

module.exports = { ZaloPayHandler };
