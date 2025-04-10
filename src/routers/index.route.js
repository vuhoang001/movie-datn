const express = require("express");

const router = express.Router();

router.use("/", require("./user.route"));
router.use("/", require("./actor.route"));
router.use("/", require("./genre.route"));
router.use("/", require("./movie.route"));
router.use("/", require("./group-movie.route"));
router.use("/", require("./language.route"));
router.use("/", require("./wish-list.route"));
router.use("/", require("./payment.route"));
router.use("/", require("./branner.route"));
router.use("/", require("./nation.route"));
router.use("/", require("./series.route"));

module.exports = router;
