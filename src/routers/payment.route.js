const router = require("express").Router();
const paymentController = require("../controllers/payment.controller");
const { AsyncHandle } = require("../helpers/AsyncHandle");
const { authentication } = require("../helpers/auth");

/**
 * @swagger
 *  tags:
 *      name: Payment
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          PaymentDTO:
 *              type: object
 *              properties:
 *                  price:
 *                      type: Number
 *                      default: 0
 */

/**
 * @swagger
 *  /add-price:
 *      post:
 *          tags: [Payment]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PaymentDTO'
 *          responses:
 *              200:
 *                  description: success
 */
router.post(
  "/add-price",
  authentication,
  AsyncHandle(paymentController.AddPrice)
);

router.post('/callback', AsyncHandle(paymentController.CallBack));

module.exports = router;
