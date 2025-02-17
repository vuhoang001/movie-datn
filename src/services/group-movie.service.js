const groupMovie = require("../models/group-movie.model");

const { convertToObjectIdMongose } = require("../utils/index");
const { NotFoundError } = require("../response/error.response");

class GroupMovieService {
  GetById = async (slug) => {
    const holderData = await groupMovie.findOne({ _id: slug });
    if (!holderData) throw new NotFoundError("can not find data");
    return holderData;
  };
  GetAll = async (skip = 0, limit = 30) => {
    const holderData = await groupMovie.find().skip(skip).limit(limit);
    return holderData;
  };
  Create = async (data) => {
    const res = await groupMovie.create(data);
    return res;
  };
  Update = async (slug, data) => {
    const holderData = await groupMovie.findOne({ _id: slug });
    if (!holderData) throw new NotFoundError("can not find data");
    const result = await groupMovie.updateOne(
      {
        _id: convertToObjectIdMongose(slug),
      },
      data
    );
    return result;
  };
  Delete = async (slug) => {
    const holderData = await groupMovie.findOne({ _id: slug });
    if (!holderData) throw new NotFoundError("can not find data");
    await groupMovie.deleteOne({ _id: convertToObjectIdMongose(id) });
    return 1;
  };
}

module.exports = new GroupMovieService();
