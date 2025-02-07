const express = require("express");
const router = express.Router();
const { AsyncHandle } = require("../helpers/AsyncHandle");
const actorController = require("../controllers/actor.controller");
const { uploadDisk } = require("../configs/multer.config");
const { authentication } = require("../helpers/auth");

/**
 * @swagger
 * tags:
 *  name: Actor
 *  description: Actor management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Actor:
 *       type: object
 *       properties:
 *         items:
 *           type: string
 *           description: actorName, actorDescription, placeOfBirth, birthDay, birthDay
 *           default: {     "actorName": "Nguyen Van A",      "actorDescription": "Mo ta ve Nguyen Van A" }
 *         images:
 *           type: array
 *           items:
 *              type: string
 *              format: binary
 *
 *
 */

/**
 * @swagger
 * /actors:
 *   get:
 *     summary: Get all actor
 *     tags: [Actor]
 *     responses:
 *       201:
 *         description: User created
 */
router.get("/actors", AsyncHandle(actorController.GetAll));

/**
 * @swagger
 *  /actor/{slug}:
 *    get:
 *      summary: Get actor by id
 *      tags: [Actor]
 *      parameters:
 *        - $ref: '#/components/parameters/SlugParam'
 *      responses:
 *        200:
 *          description: success
 */
router.get("/actor/:slug", AsyncHandle(actorController.GetById));

/**
 * @swagger
 *  /actor:
 *    post:
 *      summary: Create actor
 *      tags: [Actor]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: '#/components/schemas/Actor'
 *      responses:
 *        200:
 *          description: success
 *
 */
router.post(
  "/actor",
  authentication,
  uploadDisk.array("images"),
  AsyncHandle(actorController.Create)
);

/**
 * @swagger
 *  /actor/{slug}:
 *    delete:
 *      summary: Delete actor
 *      tags: [Actor]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - $ref: '#/components/parameters/SlugParam'
 *      responses:
 *        200:
 *          description: success
 */
router.delete(
  "/actor/:slug",
  authentication,
  AsyncHandle(actorController.Delete)
);

/**
 * @swagger
 * /actor/{slug}:
 *  patch:
 *    summary: Update actor
 *    tags: [Actor]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/SlugParam'
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form:
 *          schema:
 *            $ref: '#/components/schemas/Actor'
 *    responses:
 *      200:
 *        description: success
 */
router.patch(
  "/actor/:slug",
  authentication,
  uploadDisk.array("images"),
  AsyncHandle(actorController.Update)
);

module.exports = router;
