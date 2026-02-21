import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestuser } from "./../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestuser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .put(checkForTestuser, validateIdParam, validateJobInput, updateJob)
  .delete(checkForTestuser, validateIdParam, deleteJob);

export default router;
