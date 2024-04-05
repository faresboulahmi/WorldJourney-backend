import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
      default: 'country',
    },
    description: {
      type: String,
      require: true,
    },
    regularPrice: {
      type: Number,
      require: true,
    },
    discountPrice: {
      type: Number,
      require: true,
    },
    offer: {
      type: Boolean,
      require: true,
    },
    imageUrls: {
      type: Array,
      require: true,
    },
    maxPeople: {
      type: Number,
      require: true,
      min: 1,
      max: 10,
      default: 1,
    },
    totalReviews: {
      type: Number,
      default: 1,
    },
    reviews: {
      type: Number,
      default: 5,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
