import express from "express";
import { auth } from "../../middleware/Auth";
import validateRequest from "../../middleware/validateRequest";
import { role } from "../user/user.constant";
import {
  createBook,
  createReview,
  deleteBookById,
  deleteReview,
  getBookById,
  getBooks,
  updateBookById,
} from "./book.controller";
import {
  bookZodSchema,
  reviewZodSchema,
  updateBookZodSchema,
} from "./book.validation";
const router = express.Router();

router.post("/", auth(...role), validateRequest(bookZodSchema), createBook);
router.post(
  "/review/:id",
  auth(...role),
  validateRequest(reviewZodSchema),
  createReview
);
router.delete("/review/:id", auth(...role), deleteReview);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.delete("/:id", auth(...role), deleteBookById);
router.patch(
  "/:id",
  auth(...role),
  validateRequest(updateBookZodSchema),
  updateBookById
);
export const BookRoutes = router;
