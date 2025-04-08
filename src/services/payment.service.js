const { BadRequestError } = require("../response/error.response");
const userModel = require("../models/user.model");
const PaymentFactory = require("./Payment/PaymentFactor");

const PAYMENT_TYPE = require("../utils/enum").PAYMENT;

class PaymentService {
  async AddPrice(price, user) {
    const userHolder = await userModel.findById(user.userId);

    if (!userHolder) {
      throw new BadRequestError("User not found");
    }

    const paymentHandler = PaymentFactory.getHandler(PAYMENT_TYPE.ZALOPAY);
    const res = await paymentHandler.handler(price, userHolder);

    return res;
  }

  async CallBack(payload) {
    let dataStr = JSON.parse(payload.data);
    let dataParsed = JSON.parse(dataStr.embed_data);
    const userHOlder = await userModel.findById(dataParsed.user);
    if (!userHOlder) {
      throw new BadRequestError("User not found");
    }
    userHOlder.price += Number(dataParsed.price);
    await userHOlder.save();

    return "Success";
  }
}

module.exports = new PaymentService();
