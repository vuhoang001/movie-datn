const WishlistService = require("../services/wishList.service");
const { SuccessResponse } = require("../response/success.response");

class WishLishController {
  GetAll = async (req, res) => {
    const skip = req.query.skip;
    const limit = req.query.limit;
    new SuccessResponse({
      message: "Get all wish list",
      metadata: await WishlistService.GetAll(skip, limit),
    }).send(res);
  };

  Update = async (req, res) => {
    new SuccessResponse({
      message: "Update wish list",
      metadata: await WishlistService.Update(),
    }).send(res);
  };

  Delete = async (req, res) => {
    const id = req.params.id;
    new SuccessResponse({
      message: "Delete wish list",
      metadata: await WishlistService.Delete(id),
    }).send(res);
  };

  Create = async (req, res) => {
    new SuccessResponse({
      message: "Update",
      metadata: await WishlistService.Create(req.body),
    }).send(res);
  };
}

module.exports = new WishLishController();
