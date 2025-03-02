const model = require("../models/wish-list.model");

class WishListService {
  GetAll = async (skip = 0, limit = 30) => {
    const result = await model
      .find()
      .populate("movie")
      .populate("user")
      .skip(skip)
      .limit(limit);
    return result;
  };
  Update = async () => {};
  Delete = async (id) => {
    const result = await model.deleteOne({ _id: id });
    return result;
  };
  Create = async (data) => {
    const result = await model.create(data);
    return result;
  };
}

module.exports = new WishListService();
