const movieModel = require("../models/movie.model");
const { BadRequestError } = require("../response/error.response");
const { convertToObjectIdMongose } = require("../utils");

class MovieService {
  create = async (data) => {
    const result = await movieModel.create(data);
    return result;
  };
  update = async (slug, data) => {
    const holder = await movieModel.findOne({ _id: slug });
    if (!holder) throw new BadRequestError("no datas");

    const result = await movieModel.updateOne(
      {
        _id: convertToObjectIdMongose(slug),
      },
      data
    );

    return result;
  };
  getAll = async (skip = 0, limit = 30) => {
    const data = await movieModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate("language")
      .populate("genre")
      .populate('actor')
    return data;
  };
  delete = async (slug) => {
    const holder = await movieModel.findOne({
      _id: convertToObjectIdMongose(slug),
    });
    if (!holder) throw new BadRequestError("no datas");

    await movieModel.deleteOne({ _id: convertToObjectIdMongose(slug) });
    return true;
  };

  getById = async (slug) => {
    const holder = await movieModel.findOne({
      _id: convertToObjectIdMongose(slug),
    });

    if (!holder) throw new BadRequestError("no datasF");
    return holder;
  };
}

module.exports = new MovieService();
