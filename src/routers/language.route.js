const express = require("express");
const { AsyncHandle } = require("../helpers/AsyncHandle");
const LanguageController = require("../controllers/languages.controller");
const router = express.Router();

/**
 * @swagger
 *  tags:
 *      name: Language
 *      description: Language management
 */

/**
 * @swagger
 *  /language-async:
 *      post:
 *          summary: AsyncHanlde
 *          tags: [Language]
 *          responses:
 *              200:
 *                  description: success
 */
router.post("/language-async", AsyncHandle(LanguageController.AsyncData));

/**
 * @swagger
 *  /languages:
 *      get:
 *          summary: Get all languages
 *          tags: [Language]
 *          parameters:
 *              - $ref: '#/components/parameters/Skip'
 *              - $ref: '#/components/parameters/Limit'
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/languages", AsyncHandle(LanguageController.GetAll));

/**
 * @swagger
 *  /language/{id}:
 *      get:
 *          summary: Get by code
 *          tags: [Language]
 *          parameters:
 *              - $ref: '#/components/parameters/Id'
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/language/:code", AsyncHandle(LanguageController.GetByCode));
module.exports = router;
