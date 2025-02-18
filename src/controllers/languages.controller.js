const languageService = require("../services/language.service");
const { SuccessResponse } = require("../response/success.response");

class LanguageController {
  AsyncData = async (req, res) => {
    new SuccessResponse({
      message: "AsyncData",
      metadata: await languageService.AsyncData(),
    }).send(res);
  };

  GetAll = async (req, res) => {
    const { skip, limit } = req.query;
    new SuccessResponse({
      message: "Get all languages",
      metadata: await languageService.GetAll(skip, limit),
    }).send(res);
  };

  GetByCode = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    new SuccessResponse({
      message: "Get by code",
      metadata: await languageService.GetByCode(id),
    }).send(res);
  };
}

module.exports = new LanguageController();
