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
  getAll = async (search = null, skip = 0, limit = 30) => {
    let query = {};

    if (search) {
      // Tạo điều kiện tìm kiếm
      let orConditions = [
        { movieName: { $regex: search, $options: "i" } }, // Tìm theo tên phim
      ];

      // 🔍 Tìm danh sách ID của actors, genre theo tên
      const [actorIds, genreIds] = await Promise.all([
        actorModel
          .find({ actorName: { $regex: search, $options: "i" } })
          .select("_id"),
        genreModel
          .find({ genreName: { $regex: search, $options: "i" } })
          .select("_id"),
      ]);

      if (actorIds.length > 0) {
        orConditions.push({ actors: { $in: actorIds.map((a) => a._id) } });
      }
      if (genreIds.length > 0) {
        orConditions.push({ genre: { $in: genreIds.map((g) => g._id) } });
      }

      query = { $or: orConditions };
    }

    const data = await movieModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .populate("language")
      .populate("genre")
      .populate("actors");

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
