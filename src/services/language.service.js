const { BadRequestError } = require("../response/error.response");
const languageModel = require("../models/languages.model");

class LanguageService {
  AsyncData = async (languages) => {
    for (let language of languages) {
      const existingData = await languageModel.findOne({ code: language.code });
      if (!existingData) {
        const newLanguage = new languageModel(language);
        await newLanguage.save();
      }
    }
    return "Async Data successed";
  };

  GetAll = async (skip = 0, limit = 30) => {
    const holder = await languageModel
      .find()
      .skip(skip)
      .limit(limit)
    return holder;
  };

  GetByCode = async (code) => {
    const holder = await languageModel.findOne({ _id: code });
    return holder;
  };
}

module.exports = new LanguageService();
