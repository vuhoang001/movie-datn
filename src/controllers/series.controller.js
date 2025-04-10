const { SuccessResponse } = require("../response/success.response");
const seriesService = require("../services/series.service");

class SeriesController {
  GetAll = async (req, res) => {
    const { skip, limit, search } = req.body;
    new SuccessResponse({
      message: "Thành công",
      metadata: await seriesService.GetAll(skip, limit, search),
    }).send(res);
  };

  GetByid = async (req, res) => {
    const id = req.params.id;

    new SuccessResponse({
      metadata: await seriesService.GetById(id),
    }).send(res);
  };

  Create = async (req, res) => {
    new SuccessResponse({
      metadata: await seriesService.Create(req.body),
    }).send(res);
  };

  Update = async (req, res) => {
    const id = req.params.id;
    new SuccessResponse({
      metadata: await seriesService.Update(id, req.bod),
    }).send(res);
  };

  Delete = async (req, res) => {
    const id = req.params.id;

    new SuccessResponse({
      metadata: await seriesService.Delete(id),
    }).send(res);
  };


  GetByMovie = async(req, res) => {
    const id = req.params.id

    new SuccessResponse({
      metadata: await seriesService.GetByMovie(id)
    }).send(res)
  }
}

module.exports = new SeriesController();
