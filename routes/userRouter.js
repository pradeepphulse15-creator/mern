import { Router } from "express";
import {
  getCurrentUser,
  getAppliationStatus,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import {
  authorizePermissions,
  checkForTestuser,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [
  authorizePermissions("admin"),
  getAppliationStatus,
]);
router.patch(
  "/update-user",
  checkForTestuser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser,
);

export default router;
