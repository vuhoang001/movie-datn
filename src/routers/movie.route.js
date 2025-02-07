const express = require("express");
const { AsyncHandle } = require("../helpers/AsyncHandle");
const { authentication } = require("../helpers/auth");

const { uploadDisk } = require("../configs/multer.config");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

/**
 * @swagger
 * tags:
 *  name: Movie
 *  description: Movie management
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Movie:
 *          type: object
 *          properties:
 *              items:
 *                  type: string
 *                  description: data of movie
 *                  default: {     "movieName": "Phim 1",      "movieDescription": "Mo ta phim 1",      "rating": 1,       "runTime": 120,      "releaseDate": "2025-03-15T15:00:00Z",      "budget": 2000000,      "revenue": 4000000,      "language": "English" }
 *              images:
 *                  type: array
 *                  items:
 *                      type: string
 *                      format: binary
 *              videos:
 *                  type: array
 *                  items:
 *                      type: string
 *                      format: binary
 *              trailer:
 *                  type: array
 *                  items:
 *                      type: string
 *                      format: binary
 */

/**
 * @swagger
 * /movies:
 *  get:
 *      summary: Get all movie
 *      tags: [Movie]
 *      parameters:
 *          - $ref: '#/components/parameters/Skip'
 *          - $ref: '#/components/parameters/Limit'
 *          - $ref: '#/components/parameters/Search'
 *      responses:
 *          200:
 *              description: success
 */
router.get("/movies", AsyncHandle(movieController.GetAll));

/**
 * @swagger
 * /movie/{slug}:
 *  get:
 *      summary: Get by id
 *      tags: [Movie]
 *      parameters:
 *          - $ref: '#/components/parameters/SlugParam'
 *      responses:
 *          200:
 *              description: success
 *
 */
router.get("/movie/:slug", AsyncHandle(movieController.GetById));

/**
 * @swagger
 * /movie:
 *  post:
 *      summary: Create movie success
 *      tags: [Movie]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Movie'
 *      responses:
 *          200:
 *              description: 200
 */
router.post(
  "/movie",
  uploadDisk.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 10 },
    { name: "trailer", maxCount: 10 },
  ]),
  authentication,
  AsyncHandle(movieController.Create)
);

/**
 * @swagger
 * /movie/{slug}:
 *  patch:
 *      summary: Update movie success
 *      tags: [Movie]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - $ref: '#/components/parameters/SlugParam'
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Movie'
 *      responses:
 *          200:
 *              description: success
 */
router.patch(
  "/movie/:slug",
  authentication,
  uploadDisk.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 10 },
    { name: "trailer", maxCount: 10 },
  ]),
  AsyncHandle(movieController.Update)
);

/**
 * @swagger
 * /movie/{slug}:
 *  delete:
 *      summary: Delete movie success
 *      tags: [Movie]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - $ref: '#/components/parameters/SlugParam'
 *      responses:
 *          200:
 *              description: delete success
 */
router.delete(
    "/movie/:slug",  // Chỉnh sửa từ :id thành :slug
    authentication,
    AsyncHandle(movieController.Delete)
  );
module.exports = router;
