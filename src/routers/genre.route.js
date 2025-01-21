const express = require("express");
const router = express.Router();
const { AsyncHandle } = require("../helpers/AsyncHandle");
const genreController = require("../controllers/genre.controller");

router.get("/genres", AsyncHandle(genreController.GetAll));
router.get("/genre/:slug", AsyncHandle(genreController.GetById));
router.post("/genre", AsyncHandle(genreController.Create));
router.patch("/genre/:slug", AsyncHandle(genreController.Update));
router.delete("/genre/:slug", AsyncHandle(genreController.Delete));

module.exports = router;
