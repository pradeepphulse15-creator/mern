import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("Company is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("jobLocation").notEmpty().withMessage("Job location is required"),
  body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("Invalid job status"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new Error("Invalid MongoDB ID");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);

    const isAdmin = req.user.role === "admin";
    const isOwner = job.createdBy.toString() === req.user.userId;
    if (!isAdmin && !isOwner) throw new UnauthorizedError(`Not authorized to access this route`);
  }),
]);

export const validateRegisterinput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("Email already in use");
    }),
  body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("location").notEmpty().withMessage("Location is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("Email already in use");
      }
    }),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("location").notEmpty().withMessage("Location is required"),
]);
