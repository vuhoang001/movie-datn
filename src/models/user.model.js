const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Account";
const COLLECTION_NAME = "Accounts";

const accountSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    accountBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    password: {
      type: String,
      required: true,
    },
    moviePurchased: {
      type: [Schema.Types.ObjectId],
      ref: "Movie",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, accountSchema);
