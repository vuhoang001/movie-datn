const express = require("express");
const router = express.Router();

const { AsyncHandle } = require("../helpers/AsyncHandle");
const userController = require("../controllers/user.controller");
const { authentication } = require("../helpers/auth");

router.post("/login", AsyncHandle(userController.Login));
router.post("/register", AsyncHandle(userController.Register));
router.post("/handleRF", authentication, AsyncHandle(userController.HandleRF));
router.get("/get-me", authentication, AsyncHandle(userController.GetMe));

module.exports = router;
