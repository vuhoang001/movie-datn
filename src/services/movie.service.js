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
  getAll = async (search = null, skip = 0, limit = 30, filters = null) => {
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
    const holder = await movieModel
      .findOne({
        _id: convertToObjectIdMongose(slug),
      })
      .populate("genre")
      .populate("language")
      .populate("actors");

    if (!holder) throw new BadRequestError("no datasF");
    return holder;
  };

  AddComment = async (id, payload, user) => {
    const { content, rating } = payload;

    const movie = await movieModel.findOne({ _id: id });
    if (!movie) throw new BadRequestError("no datas");

    movie.comments.push({
      user: user._id,
      content,
      rating,
    });

    await movie.save();
    return "Successfully added comment";
  };

  RemoveComment = async (id, commentId, user) => {
    const movie = await movieModel.findOne({ _id: id });
    if (!movie) throw new BadRequestError("no datas");

    const commentIndex = movie.comments.findIndex(
      (comment) =>
        comment._id.toString() === commentId &&
        comment.user.toString() === user.toString()
    );

    if (commentIndex === -1) throw new BadRequestError("no datas");

    movie.comments.splice(commentIndex, 1);
    await movie.save();
    return "Successfully removed comment";
  };
}

module.exports = new MovieService();
