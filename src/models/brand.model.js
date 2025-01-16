const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Brand";
const COLLECTION_NAME = "Brands";

const BrandSchema = new Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    brandDescription: {
      type: String,
    },
    parentId: {
      type: Types.ObjectId,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, BrandSchema);
