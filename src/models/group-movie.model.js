const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "GroupMovie";
const COLLECTION_NAME = "GroupMovies";

const GroupMovieSchema = new Schema(
  {
    GroupName: {
      type: String,
      required: true,
    },
    GroupDescription: {
      type: String,
      required: true,
    },
    MovieIds: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Movie",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, GroupMovieSchema);
