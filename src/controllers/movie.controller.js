const { SuccessResponse } = require("../response/success.response");
const movieService = require("../services/movie.service");
class MovieController {
  GetAll = async () => {
    const { skip, limit } = req.query;

    new SuccessResponse({
      message: "Get all success",
      metadata: await movieService.getAll(skip, limit),
    }).send(res);
  };
  GetById = async (slug) => {
    const { slug } = req.params;
    new SuccessResponse({
      message: "Get by id",
      metadata: await movieService.getById(slug),
    });
  };
  Update = async () => {};
  Delete = async () => {};
  Create = async () => {};
}

module.exports = new MovieController();
