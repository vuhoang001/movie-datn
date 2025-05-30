const { SuccessResponse } = require("../response/success.response");
const movieService = require("../services/movie.service");
const { convertURL } = require("../utils");

class MovieController {
  GetAll = async (req, res) => {
    const { skip, limit, filters, movieType } = req.query;
    const { search } = req.query;

    new SuccessResponse({
      message: "Get all success",
      metadata: await movieService.getAll(search, skip, limit, filters, movieType),
    }).send(res);
  };
  GetById = async (req, res) => {
    const { slug } = req.params;
    const user = req.user
    new SuccessResponse({
      message: "Get by id",
      metadata: await movieService.getById(slug, user.userId),
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

  AddComment = async (req, res) => {
    const movieId = req.params.id;
    const user = req.user;

    new SuccessResponse({
      message: "Add comment success",
      metadata: await movieService.AddComment(movieId, req.body, user.userId),
    }).send(res);
  };

  RemoveComment = async (req, res) => {
    const movieId = req.params.id;
    commentId = req.params.commentId;
    const user = req.user;

    new SuccessResponse({
      message: "Remove comment success",
      metadata: await movieService.RemoveComment(
        movieId,
        commentId,
        user.userId
      ),
    }).send(res);
  };

  BuyMovie = async (req, res) => {
    const movieId = req.params.id;
    const user = req.user;

    new SuccessResponse({
      message: "Buy movie success",
      metadata: await movieService.BuyMovie(movieId, user.userId),
    }).send(res);
  };

  GetMovieByUserId = async (req, res) => {
    const user = req.user;

    new SuccessResponse({
      message: "movie",
      metadata: await movieService.getMovieByUserId(user.userId),
    }).send(res);
  };

  CheckMovie = async (req, res) => {
    const user = req.user;
    const movieId = req.params.id;
    console.log(1);

    new SuccessResponse({
      message: "Check movie success",
      metadata: await movieService.checkMovie(user.userId, movieId),
    }).send(res);
  };

  GetMovieByName = async (req, res) => {
    const { skip, limit, name } = req.params;

    new SuccessResponse({
      message: "Get movie success",
      metadata: await movieService.GetMovieByName(name, skip, limit),
    }).send(res);
  };
}

module.exports = new MovieController();
