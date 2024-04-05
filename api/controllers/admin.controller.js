import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          role: req.body.role,
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.avatar,
          wishList: req.body.wishList
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIdex = parseInt(req.query.startIdex) || 0;
    const searchTerm = req.query.role || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const user = await User.find({
      role: { $regex: searchTerm, $options: "i" },
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIdex);
      
      const modifiedUsers = user.map(user => {
        const { password: pass, ...rest } = user._doc;
        return { ...rest, pass };
      });
    return res.status(200).json(modifiedUsers);
  } catch (error) {
    next(error);
  }
};
