const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Movie";
const COLLECTION_NAME = "Movies";

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    content: { type: String },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 3,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

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
    movieLink: {
      type: String,
    },
    movieType: {
      type: String,
      enum: ["L", "B"],
      default: "L",
    },
    language: {
      type: [Types.ObjectId],
      ref: "Language",
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: [CommentSchema],
    genre: { type: [Types.ObjectId], ref: "Genre" },
    director: { type: Types.ObjectId, ref: "Actor" },
    actors: { type: [Types.ObjectId], ref: "Actor" },
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
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, MovieSchema);
