import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
  book_img: {
    type: Schema.Types.Mixed,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publishDate: {
    type: String,
    required: true,
  },
  totalDownload: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

bookSchema.pre("save", function (next) {
  this.totalDownload = 0;
  next();
});

export const Book = model<IBook, BookModel>("Book", bookSchema);
