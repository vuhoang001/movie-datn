const { BadRequestError } = require("../response/error.response");
const languageModel = require("../models/languages.model");
const fs = require("fs");
const path = require("path");

class LanguageService {
  AsyncData = async () => {
    const filePath = path.join(__dirname, "../../language.json");
    const fileData = fs.readFileSync(filePath, "utf8");

    const languages = JSON.parse(fileData);
    console.log(languages);
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
    const holder = await languageModel.find().skip(skip).limit(limit);
    return holder;
  };

  GetByCode = async (code) => {
    const holder = await languageModel.findOne({ _id: code });
    return holder;
  };
}

module.exports = new LanguageService();
