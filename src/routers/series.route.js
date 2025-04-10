const router = require("express").Router();
const seriesController = require("../controllers/series.controller");
const { AsyncHandle } = require("../helpers/AsyncHandle");

/**
 * @swagger
 *  tags:
 *      name: Series
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Series:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  episodes:
 *                      type: array
 *                      items:
 *                          type: string  # Nếu bạn lưu ObjectId, thì nó sẽ là string, nếu không thì bạn có thể thay đổi loại phù hợp
 */

/**
 * @swagger
 *  /series:
 *      get:
 *          tags: [Series]
 *          parameters:
 *              - $ref: '#/components/parameters/Skip'
 *              - $ref: '#/components/parameters/Limit'
 *              - $ref: '#/components/parameters/Search'
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/series", AsyncHandle(seriesController.GetAll));

/**
 * @swagger
 *  /series/{id}:
 *      get:
 *          tags: [Series]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/series/:id", AsyncHandle(seriesController.GetByid));

/**
 * @swagger
 *  /series:
 *      post:
 *          tags: [Series]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Series'
 *          responses:
 *              200:
 *                  description: success
 */
router.post("/series", AsyncHandle(seriesController.Create));

/**
 * @swagger
 *  /series/{id}:
 *      patch:
 *          tags: [Series]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Series'
 *          responses:
 *              200:
 *                  description: success
 */
router.patch("/series/:id", AsyncHandle(seriesController.Update));

/**
 * @swagger
 *  /series/{id}:
 *      delete:
 *          tags: [Series]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/series/:id", AsyncHandle(seriesController.Delete));

module.exports = router;
