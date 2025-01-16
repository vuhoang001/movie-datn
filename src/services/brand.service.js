const brandModel = require("../models/brand.model");
const { convertToObjectMongoose } = require("../utils/index");

class BrandService {
  GetAll = async () => {
    const data = await brandModel.find();
    return data;
  };

  GetById = async (id) => {
    const data = await brandModel.findOne({ _id: convertToObjectMongoose(id) });
    return data;
  };

  Create = async (data) => {
    const result = await brandModel.create(data);
    return result;
  };

  Update = async (id, data) => {
    const result = await brandModel.updateOne(
      { _id: convertToObjectMongoose(id) },
      data
    );
    return result;
  };

  Delete = async (id) => {
    const result = await brandModel.deleteOne({
      _id: convertToObjectMongoose(id),
    });
    return result;
  };
}

module.exports = new BrandService();
