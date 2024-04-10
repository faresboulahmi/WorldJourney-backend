import Tour from "../models/tour.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createTour = async (req, res, next) => {
  try {
    const tour = await Tour.create(req.body);
    return res.status(201).json(tour);
  } catch (error) {
    next(error);
  }
};

export const deleteTour = async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(errorHandler(404, "Tour not found!"));
  }
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json("Tour has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateTour = async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(errorHandler(404, "Tour not found "));
  }
  try {
    const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateTour);
  } catch (error) {
    next(error);
  }
};

export const getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return next(errorHandler(404, "Tour not found!"));
    }
    res.status(200).json(tour);
  } catch (error) {
    next(error);
  }
};

export const getTours = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let maxPeople = req.query.maxPeople;

    if (maxPeople === undefined || maxPeople === "false") {
      maxPeople = { $in: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
    } 

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createAt";

    const order = req.query.order || "desc";

    const tour = await Tour.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      maxPeople,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(tour);
  } catch (error) {
    next(error);
  }
};
