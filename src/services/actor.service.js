const actorModel = require("../models/actor.model");
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
    return data;
  };

  Update = async (id, data) => {
    const response = await actorModel.findOne({ _id: id });
    if (!response) return null;

    const update = await actorModel.updateOne(
      {
        _id: convertToObjectIdMongose(id),
      },
      data
    );

    return update;
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
