const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Series";
const COLLECTION_NAME = "Series";

const SeriesSchema = new Schema(
  {
    title: { type: String },

    description: String,
    episodes: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, SeriesSchema);
