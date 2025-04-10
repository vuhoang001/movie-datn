const movieModel = require("../models/movie.model");
const userModel = require("../models/user.model");
const { BadRequestError } = require("../response/error.response");
const { convertToObjectIdMongose } = require("../utils");
const seriesModel = require("../models/series.model");

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
      .populate("actors")
      .populate("director")
      .populate({
        path: "comments.user",
        select: "name thumbanil email",
      });

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
      .populate("director")
      .populate("actors")
      .populate({
        path: "comments.user",
        select: "name thumbnail email",
      });

    const series = await seriesModel
      .find({
        episodes: { $in: slug },
      })
      .populate("episodes");

    if (!holder) throw new BadRequestError("no datasF");
    holder.episodes = series;
    return holder;
  };

  getMovieByUserId = async (userId) => {
    const movie = await userModel
      .findOne({ _id: userId })
      .populate("moviePurchased");

    return movie.moviePurchased;
  };
  checkMovie = async (userId, movieId) => {
    const movie = await userModel
      .findOne({ _id: userId })
      .populate("moviePurchased");

    return movie.moviePurchased.find(
      (movie) => movie._id.toString() == movieId.toString()
    );
  };

  AddComment = async (id, payload, user) => {
    const { content, rating } = payload;

    const movie = await movieModel.findOne({ _id: id });
    if (!movie) throw new BadRequestError("no datas");

    movie.comments.push({
      user: user,
      content,
      rating,
    });

    await movie.save();
    return "Successfully added comment";
  };

  BuyMovie = async (movieId, user) => {
    const movieHolder = await movieModel.findOne({ _id: movieId });
    if (!movieHolder) throw new BadRequestError("Không tìm thấy phim");

    const userHolder = await userModel.findOne({ _id: user });
    if (!userHolder) throw new BadRequestError("Không tìm thấy người dùng");

    if (movieHolder.price > userHolder.accountBalance)
      throw new BadRequestError("Tài khoản không đủ tiền");

    userHolder.accountBalance -= movieHolder.price;

    userHolder.moviePurchased.push(movieId);
    movieHolder.views += 1;
    await userHolder.save();

    return "Success";
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
