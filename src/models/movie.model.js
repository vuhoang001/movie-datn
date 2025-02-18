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
    runTime: {
      type: Number,
    },
    releaseDate: {
      type: Date,
      default: Date.now,
    },
    budget: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
    },
    genre: { type: [Types.ObjectId] },
    actors: { type: [Types.ObjectId] },
    language: { type: String },
    images: {
      type: [String],
    },
    videos: {
      type: [String],
    },
    trailer: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, MovieSchema);
