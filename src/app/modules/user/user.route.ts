import express from "express";
import { auth } from "../../middleware/Auth";
import validateRequest from "../../middleware/validateRequest";
import { role } from "./user.constant";
import {
  deleteUserById,
  getMyProfile,
  updateMyPassword,
  updateMyProfile,
} from "./user.controller";
import {
  PasswordChangeUserZodSchema,
  UpdateUserZodSchema,
} from "./user.validation";
const router = express.Router();

router.get("/my-profile", auth(...role), getMyProfile);
router.patch(
  "/my-profile",
  auth(...role),
  validateRequest(UpdateUserZodSchema),
  updateMyProfile
);
router.patch(
  "/my-profile/password-change",
  auth(...role),
  validateRequest(PasswordChangeUserZodSchema),
  updateMyPassword
);

router.delete("/my-profile/:id", deleteUserById);
export const UserRoutes = router;
