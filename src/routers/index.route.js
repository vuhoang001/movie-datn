const express = require("express");

const router = express.Router();

router.use("/", require("./user.route"));
router.use("/", require("./brand.route"));

module.exports = router;
