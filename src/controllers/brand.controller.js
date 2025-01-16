const { SuccessResponse } = require("../response/success.response");
const brandService = require("../services/brand.service");

class BrandController {
  Create = async (req, res) => {
    new SuccessResponse({
      message: "create success",
      metadata: await brandService.Create(req.body),
    }).send(res);
  };

  GetAll = async (req, res) => {
    new SuccessResponse({
      message: "Get all success",
      metadata: await brandService.GetAll(),
    }).send(res);
  };

  GetById = async (req, res) => {
    const { id } = req.params;
    new SuccessResponse({
      message: "Get by id success",
      metadata: await brandService.GetById(id),
    }).send(res);
  };

  Update = async (req, res) => {
    const { id } = req.params;
    new SuccessResponse({
      message: "Update success",
      metadata: await brandService.Update(id, req.body),
    }).send(res);
  };

  Delete = async (req, res) => {
    const { id } = req.params;
    new SuccessResponse({
      message: "delete success",
      metadata: await brandService.Delete(id),
    }).send(res);
  };
}

module.exports = new BrandController();
