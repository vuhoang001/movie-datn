const express = require("express");
const router = express.Router();
const { AsyncHandle } = require("../helpers/AsyncHandle");
const actorController = require("../controllers/actor.controller");
const { uploadDisk } = require("../configs/multer.config");

router.get("/actors", AsyncHandle(actorController.GetAll));
router.get("/actor/:slug", AsyncHandle(actorController.GetById));
router.post(
  "/actor",
  uploadDisk.array("images"),
  AsyncHandle(actorController.Create)
);
router.delete("/actor/:slug", AsyncHandle(actorController.Delete));
router.patch(
  "/actor/:slug",
  uploadDisk.array("images"),
  AsyncHandle(actorController.Update)
);

module.exports = router;
