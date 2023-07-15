import express from "express";
import { auth } from "../../middleware/Auth";
import validateRequest from "../../middleware/validateRequest";
import { role } from "../user/user.constant";
import {
  createWhishList,
  deleteSingleWhishList,
  getSingleWhishList,
} from "./whishlist.controller";
import { WhishListZodSchema } from "./whishlist.validation";
const router = express.Router();
router.post(
  "/",
  auth(...role),
  validateRequest(WhishListZodSchema),
  createWhishList
);
router.get("/:id", auth(...role), getSingleWhishList);
router.delete("/:id", auth(...role), deleteSingleWhishList);
export const WhishListRoutes = router;
