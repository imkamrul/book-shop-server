import express from "express";
import { auth } from "../../middleware/Auth";
import validateRequest from "../../middleware/validateRequest";
import { role } from "../user/user.constant";
import {
  createWhishList,
  deleteSingleWhishList,
  getSingleWhishList,
  updateSingleWhishList,
} from "./whishlist.controller";
import {
  WhishListUpdateZodSchema,
  WhishListZodSchema,
} from "./whishlist.validation";
const router = express.Router();
router.post(
  "/",
  auth(...role),
  validateRequest(WhishListZodSchema),
  createWhishList
);
router.patch(
  "/:id",
  auth(...role),
  validateRequest(WhishListUpdateZodSchema),
  updateSingleWhishList
);
router.get("/:id", auth(...role), getSingleWhishList);
router.delete("/:id", auth(...role), deleteSingleWhishList);
export const WhishListRoutes = router;
