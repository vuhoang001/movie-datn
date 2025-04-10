const seriesModel = require("../models/series.model");
const genreModel = require("../models/genre.model");
const movieModel = require("../models/movie.model");

const { BadRequestError } = require("../response/error.response");

class SeriesService {
  GetAll = async (skip, limit, search) => {
    let filter = {};
    if (search) {
      filter = {
        $or: [{ title: { $regex: search, $options: "i" } }],
      };
    }

    const series = await seriesModel.find().skip(skip).limit(limit);
    return series;
  };

  GetById = async (id) => {
    const series = await seriesModel.findOne({ _id: id });
    if (!series) throw new BadRequestError("Không tìm thấy phim ");
    return series;
  };

  GetByMovie = async (id) => {
    const serier = await seriesModel.findOne({ episodes: { $in: id } }).populate('episodes');

    return serier
  };

  Create = async (payload) => {
    const { title, description, episodes } = payload;

    const holderMovie = await movieModel.find({ _id: { $in: episodes } });
    if (holderMovie.length != episodes.length)
      throw new BadRequestError("Phim không tồn tại");

    const data = new seriesModel({
      title: title,
      description: description,

      episodes: episodes,
    });

    await data.save();

    return data;
  };

  Update = async (id, payload) => {
    const { title, description, episodes } = payload;
    const seriesHolder = await seriesModel.findOne({ _id: id });
    if (!seriesHolder)
      throw new BadRequestError("Không tìm thấy series: ", seriesHolder);

    const holderMovie = await movieModel.find({ _id: { $in: episodes } });
    if (holderMovie.length != episodes.length)
      throw new BadRequestError("Phim không tồn tại");

    seriesHolder.title = title;
    seriesHolder.description = description;

    seriesHolder.episodes = episodes;

    await seriesHolder.save();

    return "Cập nhật thành công";
  };

  Delete = async (id) => {
    const series = await seriesModel.findOne({ _id: id });
    if (!series) throw new BadRequestError("Không tìm thấy serier: ", id);

    await series.deleteOne();
    return "Success";
  };
}

module.exports = new SeriesService();
