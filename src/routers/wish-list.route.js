const express = require("express");
const router = express.Router();
const wishListController = require("../controllers/wish-lish.controller");
const { AsyncHandle } = require("../helpers/AsyncHandle");

/**
 * @swagger
 *  tags:
 *      name: WishList
 *      description: Wish list description
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          wishlistModel:
 *              type: object
 *              properties:
 *                  movie:
 *                      type: string
 *                      description: movie id
 *                  user:
 *                      type: string
 *                      description: user id
 */

/**
 * @swagger
 *  /wish-list:
 *      get:
 *          tags: [WishList]
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/wish-list", AsyncHandle(wishListController.GetAll));

/**
 * @swagger
 *  /wish-list:
 *     post:
 *          tags: [WishList]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/wishlistModel'
 *          responses:
 *              200:
 *                  description: success
 */
router.post("/wish-list", AsyncHandle(wishListController.Create));

/**
 * @swagger
 *  /wish-list/{id}:
 *      delete:
 *          tags: [WishList]
 *          parameters:
 *            - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/wish-list/:id", AsyncHandle(wishListController.Delete));

module.exports = router;
