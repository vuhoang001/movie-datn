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
 *  components:
 *    schemas:
 *      CommentModel:
 *        type: object
 *        properties:
 *          content:
 *            type: string
 *          rating:
 *            type: number
 *
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
 *          - $ref: '#/components/parameters/Filter'
 *      responses:
 *          200:
 *              description: success
 */
router.get("/movies", AsyncHandle(movieController.GetAll));

/**
 * @swagger
 *  /movie/me:
 *    get:
 *      summary: Get movie by user
 *      tags: [Movie]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: success
 *
 */
router.get(
  "/movie/me",
  authentication,
  AsyncHandle(movieController.GetMovieByUserId)
);

/**
 * @swagger
 *  /movie/checking/{id}:
 *    post:
 *      summary: Checking movie
 *      tags: [Movie]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - $ref: '#/components/parameters/Id'
 *      responses:
 *        200:
 *          description: success
 */
router.post(
  "/movie/checking/:id",
  authentication,
  AsyncHandle(movieController.CheckMovie)
);

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
  "/movie/:slug", // Chỉnh sửa từ :id thành :slug
  authentication,
  AsyncHandle(movieController.Delete)
);

/**
 * @swagger
 *  /movie/{id}/comment:
 *    post:
 *      tags: [Movie]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - $ref: '#/components/parameters/Id'
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CommentModel'
 *      responses:
 *        200:
 *          description: success
 */
router.post(
  "/movie/:id/comment",
  authentication,
  AsyncHandle(movieController.AddComment)
);

/**
 * @swagger
 *  /movie/{id}/comment/{commentId}:
 *    delete:
 *      tags: [Movie]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - $ref: '#/components/parameters/Id'
 *        - $ref: '#/components/parameters/CommentId'
 *      responses:
 *        200:
 *          description: Successfully removed comment from the product
 *        400:
 *          description: Bad request (comment not found or unauthorized)
 *        404:
 *          description: Product not found
 */
router.delete(
  "/movie/:id/comment/:commentId",
  authentication,
  AsyncHandle(movieController.RemoveComment)
);

/**
 * @swagger
 *  /movie/{id}/buy:
 *    post:
 *      tags: [Movie]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - $ref: '#/components/parameters/Id'
 *      responses:
 *        200:
 *          description: Successfully removed comment from the product
 *        400:
 *          description: Bad request (comment not found or unauthorized)
 *        404:
 *          description: Product not found
 */
router.post(
  "/movie/:id/buy",
  authentication,
  AsyncHandle(movieController.BuyMovie)
);

/**
 * @swagger
 *  /movie/name/{name}:
 *    get:
 *      tags: [Movie]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - $ref: '#/components/parameters/Name'
 *        - $ref: '#/components/parameters/Skip'
 *        - $ref: '#/components/parameters/Limit'
 *      responses:
 *        200:
 *          description: Successfully removed comment from the product
 *        400:
 *          description: Bad request (comment not found or unauthorized)
 *        404:
 *          description: Product not found
 */
router.get("/movie/name/:name", AsyncHandle(movieController.GetMovieByName));

module.exports = router;
