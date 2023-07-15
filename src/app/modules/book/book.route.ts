import express from "express";
import { auth } from "../../middleware/Auth";
import validateRequest from "../../middleware/validateRequest";
import { role } from "../user/user.constant";
import {
  createBook,
  deleteBookById,
  getBookById,
  getBooks,
  updateBookById,
} from "./book.controller";
import { bookZodSchema, updateBookZodSchema } from "./book.validation";
const router = express.Router();

router.post("/", auth(...role), validateRequest(bookZodSchema), createBook);
router.get("/", auth(...role), getBooks);
router.get("/:id", auth(...role), getBookById);
router.delete("/:id", auth(...role), deleteBookById);
router.patch(
  "/:id",
  auth(...role),
  validateRequest(updateBookZodSchema),
  updateBookById
);
export const BookRoutes = router;
