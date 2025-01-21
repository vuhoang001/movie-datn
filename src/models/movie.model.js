const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Movie";
const COLLECTION_NAME = "Movies";

const MovieSchema = new Schema(
  {
    movieName: {
      type: String,
      required: true,
    },
    movieDescription: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    time: {
      type: Number,
    },
    releaseDate: {
      type: Date,
      default: new Date.now(),
    },
    genre: { type: [Types.ObjectId], default: "" },
    actors: { type: [Types.ObjectId], default: "" },
    language: { type: String },
    images: {
      type: [String],
    },
    videos: {
      type: [String],
    },
    // status: {
    //   type: String,
    //   enum: ["active", "inactive", "deleted"],
    //   default: "active",
    // },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, MovieSchema);
