const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Language";
const COLLECTION_NAME = "Languages";

const LanguageSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, LanguageSchema);
