const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brand.controller");
const { AsyncHandle } = require("../helpers/AsyncHandle");

router.get("/brands", AsyncHandle(brandController.GetAll));
router.get("/brand/:id", AsyncHandle(brandController.GetById));
router.post("/brand", AsyncHandle(brandController.Create));
router.patch("/brand/:id", AsyncHandle(brandController.Update));
router.delete("/brand/:id", AsyncHandle(brandController.Delete));

module.exports = router;
