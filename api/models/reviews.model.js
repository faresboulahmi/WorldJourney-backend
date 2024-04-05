import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      require:true,
    },
    username: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      require: true,
      min: 0,
      max: 5,
      default: 0,
    },
    avatar : {
      type: String,
      default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    favorite: {
      type: Boolean,
      default:false,
    },
    _id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", reviewsSchema);

export default Reviews;
