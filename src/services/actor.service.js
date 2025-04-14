const actorModel = require("../models/actor.model");
const movieModel = require("../models/movie.model");
const { BadRequestError } = require("../response/error.response");
const { ModelStatus } = require("../utils/enum");
const { convertToObjectIdMongose } = require("../utils/index");

class ActorService {
  Create = async (data) => {
    const response = await actorModel.create(data);
    return response;
  };
  GetAll = async (skip = 0, limit = 30) => {
    const data = await actorModel.find().skip(skip).limit(limit);
    return data;
  };

  GetById = async (id) => {
    const data = await actorModel.findOne({ _id: id });
    const movies = await movieModel.find({ actors: data._id });

    return { data, movies };
  };

  Update = async (id, data) => {
    const response = await actorModel.findOne({ _id: id });
    if (!response) throw new BadRequestError("no datas");

    const result = await actorModel.updateOne(
      { _id: convertToObjectIdMongose(response._id) },
      data
    );

    return result;
  };

  Delete = async (id) => {
    const holder = await actorModel.findOne({
      _id: convertToObjectIdMongose(id),
    });
    if (!holder) return null;

    await actorModel.deleteOne({ _id: id });
    return true;
  };
}

module.exports = new ActorService();
