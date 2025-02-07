const express = require("express");

const router = express.Router();

router.use("/", require("./user.route"));
router.use("/", require("./actor.route"));
router.use("/", require("./genre.route"));
router.use("/", require("./movie.route"));

module.exports = router;
