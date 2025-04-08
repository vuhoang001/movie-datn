const { ZaloPayHandler } = require("./PaymenHandler");
const { PAYMENT } = require("../../utils/enum");

class PaymentFactory {
  static getHandler(type) {
    switch (type) {
      case PAYMENT.ZALOPAY:
        console.log(type)
        return new ZaloPayHandler();
      default:
        return new Error("Invalid payment type");
    }
  }
}

module.exports = PaymentFactory;
