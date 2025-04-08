const { SuccessResponse } = require("../response/success.response");
const paymentService = require("../services/payment.service");
class PaymentController {
  AddPrice = async (req, res) => {
    const user = req.user;
    const { price } = req.body;

    new SuccessResponse({
      message: "add price success",
      metadata: await paymentService.AddPrice(price, user),
    }).send(res);
  };
  CallBack = async (req, res) => {
    const payload = req.body;

    new SuccessResponse({
      message: "Callback success",
      metadata: await paymentService.CallBack(payload),
    }).send(res);
  };
}

module.exports = new PaymentController();
