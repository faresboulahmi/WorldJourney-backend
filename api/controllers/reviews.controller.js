import Reviews from "../models/reviews.model.js";
import { errorHandler } from "../utils/error.js";

export const createReviews = async (req, res, next) => {
  try {
    const reviews = await Reviews.create(req.body);
    return res.status(201).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const deletedReviews = async (req, res, next) => {
  const reviews = await Reviews.findById(req.params.id);
  if (!reviews) {
    return next(errorHandler(404, "Reviews not found!"));
  }
  try {
    await Reviews.findByIdAndDelete(req.params.id);
    res.status(200).json("Reviews has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateReviews = async (req, res, next) => {
  const reviews = await Reviews.findById(req.params.id);
  if (!reviews) {
    return next(errorHandler(404, "Reviews not found!"));
  }

  try {
    const updateReviews = await Reviews.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateReviews);
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;



    
    const searchTerm = req.query.productId || "";

    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const reviews = await Reviews.find({
      productId: { $regex: searchTerm, $options: "i" },
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
export const getReviewAdmin = async (req , res , next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let favorite = req.query.favorite;

    if (favorite === undefined || favorite === "true" ) {
      favorite = true; // Set favorite to true explicitly
    } else if (favorite === "false") {
      favorite = false; // Set favorite to false explicitly
    }

    let rating = req.query.rating;
    if (rating === undefined || rating === "false") {
      rating = { $in: [1, 2, 3, 4, 5] };
    }
    

    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const reviews = await Reviews.find({
      rating,
      favorite,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
}