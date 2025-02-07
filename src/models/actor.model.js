const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Actor";
const COLLECTION_NAME = "Actors";

const ActorSchema = new Schema(
  {
    actorName: {
      type: String,
      required: true,
    },
    actorDescription: {
      type: String,
      required: true,
    },
    placeOfBirth: {
      type: String,
    },
    birthDay: {
      type: Date,
    },
    images: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      default: "A",
      Enum: ["D", "A"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, ActorSchema);
