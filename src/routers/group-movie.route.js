const express = require("express");
const router = express.Router();
const { AsyncHandle } = require("../helpers/AsyncHandle");
const groupMovie = require("../controllers/groupMovie.controller");

/**
 * @swagger
 *  tags:
 *      name: GroupMovie
 *      description: GroupMovie management
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          GroupMovieModel:
 *              type: object
 *              properties:
 *                  GroupName:
 *                      type: string
 *                      default: "group name demo"
 *                  GroupDescription:
 *                      type: string
 *                      default: "group description demo"
 *                  MovieIds:
 *                      type: array
 *                      items:
 *                          type: string
 *                          description: "Id of movies"
 */

/**
 * @swagger
 *  /group-movie:
 *      get:
 *          summary: Get all group-movie
 *          tags: [GroupMovie]
 *          parameters:
 *              - $ref: '#/components/parameters/Skip'
 *              - $ref: '#/components/parameters/Limit'
 *          responses:
 *              200:
 *                  description: success
 *
 */
router.get("/group-movie", AsyncHandle(groupMovie.GetAll));

/**
 * @swagger
 *  /group-movie/{slug}:
 *      get:
 *          summary: Get group-movie by id
 *          tags: [GroupMovie]
 *          parameters:
 *              - $ref: '#/components/parameters/SlugParam'
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/group-movie/:slug", AsyncHandle(groupMovie.GetById));

/**
 * @swagger
 *  /group-movie:
 *      post:
 *          summary: Create group-movie
 *          tags: [GroupMovie]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GroupMovieModel'
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/group-movie", AsyncHandle(groupMovie.Create));

/**
 * @swagger
 *  /group-moive/{slug}:
 *      patch:
 *          summary: Update gruop-movie
 *          tags: [GroupMovie]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - $ref: '#/components/parameters/SlugParam'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GroupMovieModel'
 *          responses:
 *              200:
 *                  description: success
 *
 */
router.patch("/group-movie", AsyncHandle(groupMovie.Update));

/**
 * @swagger
 *  /group-movie/{slug}:
 *      delete:
 *          summary: Delete group-movie
 *          tags: [GroupMovie]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - $ref: '#/components/parameters/SlugParam'
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/group-movie", AsyncHandle(groupMovie.Delete));

module.exports = router;
