import statusCodes from "http-status-codes";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError, BadRequestError } from "../errors/customErrors.js";
import { createToken } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments({})) === 0;
  req.body.role = isFirstAccount ? "admin" : "user"; // Assign "admin" role to the first registered user

  req.body.password = await hashPassword(req.body.password); // Hash the password before saving to the database

  const user = await User.create(req.body);
  res.status(statusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidUser = user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("Invalid credentials");

  const oneDay = 1000 * 60 * 60 * 24;

  const token = createToken({ userId: user._id, role: user.role });
  res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + oneDay), secure: process.env.NODE_ENV === "production" }); // Set the token as an HTTP-only cookie

  res.status(statusCodes.OK).json({ msg: "user logged in" });
};

export const logout = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) }); // Clear the token cookie by setting it to an empty value and an expired date
  res.status(statusCodes.OK).json({ msg: "user logged out" });
};
