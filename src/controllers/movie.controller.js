const { SuccessResponse } = require("../response/success.response");
const movieService = require("../services/movie.service");
const { convertURL } = require("../utils");
class MovieController {
  GetAll = async (req, res) => {
    const { skip, limit } = req.query;

    new SuccessResponse({
      message: "Get all success",
      metadata: await movieService.getAll(skip, limit),
    }).send(res);
  };
  GetById = async (req, res) => {
    const { slug } = req.params;
    new SuccessResponse({
      message: "Get by id",
      metadata: await movieService.getById(slug),
    });
  };

  Update = async (req, res) => {
    const { images, videos, trailer } = req;

    const items = JSON.parse(req.body.items);
    items.images = convertURL(images);
    items.videos = convertURL(videos);
    items.trailer = convertURL(trailer);

    new SuccessResponse({
      message: "Update movie success",
      metadata: await movieService.update(slug, items),
    }).send(res);
  };

  Delete = async (req, res) => {};
  Create = async (req, res) => {
    const { images, videos, trailer } = req;

    const items = JSON.parse(req.body.items);
    items.images = convertURL(images);
    items.videos = convertURL(videos);
    items.trailer = convertURL(trailer);

    new SuccessResponse({
      message: "Create movie success",
      metadata: await movieService.create,
    }).send(res);
  };
}

module.exports = new MovieController();
