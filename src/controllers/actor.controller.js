const { SuccessResponse } = require("../response/success.response");
const actorService = require("../services/actor.service");
const { convertURL } = require("../utils/index");

class ActorController {
  Create = async (req, res, next) => {
    const { files } = req;
    // req.body.images = convertURL(files);
    let items = JSON.parse(req.body.items);
    items.images = convertURL(files);
    new SuccessResponse({
      message: "create actor success",
      metadata: await actorService.Create(items),
    }).send(res);
  };

  Update = async (req, res, next) => {
    const { slug } = req.params;
    const { files } = req;
    req.body.images = convertURL(files);
    new SuccessResponse({
      message: "update success",
      metadata: await actorService.Update(slug, req.body),
    }).send(res);
  };

  GetAll = async (req, res, next) => {
    const { skip, limit } = req.query;
    new SuccessResponse({
      message: "get all success",
      metadata: await actorService.GetAll(skip, limit),
    }).send(res);
  };

  GetById = async (req, res, next) => {
    const { slug } = req.params;
    new SuccessResponse({
      message: "get by id success",
      metadata: await actorService.GetById(slug),
    }).send(res);
  };

  Delete = async (req, res, next) => {
    const { slug } = req.params;
    new SuccessResponse({
      message: "delete success",
      metadata: await actorService.Delete(slug),
    }).send(res);
  };
}

module.exports = new ActorController();
