import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json({ message: "User not found" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        res.status(400).json({ message: "Invalid credentials" });
      } else {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT
        );

        const { password, isAdmin, ...otherDetails } = user._doc;

        res
          .cookie("acces_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ ...otherDetails });
      }
    }
  } catch (err) {
    next(err);
  }
};
