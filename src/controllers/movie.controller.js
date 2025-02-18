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
    }).send(res);
  };

  Update = async (req, res) => {
    const slug = req.params.slug;
    const { images, videos, trailer } = req.files;

    const items = JSON.parse(req.body.items);

    if (images) items.images = convertURL(images);
    if (videos) items.videos = convertURL(videos);
    if (trailer) items.trailer = convertURL(trailer);

    new SuccessResponse({
      message: "Update movie success",
      metadata: await movieService.update(slug, items),
    }).send(res);
  };

  Delete = async (req, res) => {
    const slug = req.params.slug;

    new SuccessResponse({
      message: "Delete movie success",
      metadata: await movieService.delete(slug),
    }).send(res);
  };
  Create = async (req, res) => {
    const { images, videos, trailer } = req.files;

    const items = JSON.parse(req.body.items);
    if (images) items.images = convertURL(images);

    if (videos) items.videos = convertURL(videos);

    if (trailer) items.trailer = convertURL(trailer);

    console.log(items);

    new SuccessResponse({
      message: "Create movie success",
      metadata: await movieService.create(items),
    }).send(res);
  };
}

module.exports = new MovieController();
