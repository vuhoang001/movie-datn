const { SuccessResponse } = require("../response/success.response");
const GroupMovieService = require("../services/group-movie.service");

class GroupMovieController {
  GetById = async (req, res) => {
    const slug = req.params.slug;

    new SuccessResponse({
      message: "Get by id success",
      metadata: await GroupMovieService.GetById(slug),
    }).send(res);
  };
  GetAll = async (req, res) => {
    const limit = req.query.limit;
    const skip = req.query.skip;
    const search = req.query.search;
    new SuccessResponse({
      message: "Get all",
      metadata: await GroupMovieService.GetAll(skip, limit),
    }).send(res);
  };
  Create = async (req, res) => {
    new SuccessResponse({
      message: "Create success",
      metadata: await GroupMovieService.Create(req.body),
    }).send(res);
  };
  Delete = async (req, res) => {
    const slug = req.params.slug;

    new SuccessResponse({
      message: "delete success",
      metadata: await GroupMovieService(slug),
    }).send(res);
  };
  Update = async (req, res) => {
    const slug = req.params.slug;

    new SuccessResponse({
      message: "update success",
      metadata: await GroupMovieService(slug, req.body),
    }).send(res);
  };
}

module.exports = new GroupMovieController();
