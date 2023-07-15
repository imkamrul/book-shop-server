import express from "express";
import validateRequest from "../../middleware/validateRequest";
import {
  createUser,
  logInUser,
  logOut,
  refreshToken,
} from "../user/user.controller";
import {
  CreateLogInZodSchema,
  CreateUserZodSchema,
} from "../user/user.validation";

const router = express.Router();
router.post("/register", validateRequest(CreateUserZodSchema), createUser);
router.post("/login", validateRequest(CreateLogInZodSchema), logInUser);
router.post(
  "/refresh-token",
  validateRequest(CreateLogInZodSchema),
  refreshToken
);
router.get("/logout", logOut);
export const AuthRoutes = router;
