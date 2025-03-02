const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "WishList";
const COLLECTION_NAME = "WishLists";

const wishListSchema = new Schema(
  {
    movie: {
      type: Types.ObjectId,
      ref: "Movie",
    },
    user: {
      type: Types.ObjectId,
      ref: "Account",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

wishListSchema.pre("find", function () {
  this.populate({
    path: "user",
    select: "-password",
  });

  // this.populate({
  //   path: "movie",
  //   select: "movieName",
  // });
});

module.exports = model(DOCUMENT_NAME, wishListSchema);
