import httpStatus from "http-status";
import { Types } from "mongoose";
import ApiError from "../../errors/ApiError";
import { User } from "../user/user.model";
import { IBook, IReview } from "./book.interface";
import { Book } from "./book.model";
export const saveBook = async (book: IBook): Promise<IBook | null> => {
  const getUser = await User.findOne({ _id: book.seller });

  if (!getUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  // else if (getUser.role !== role[1]) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "User is not a seller !");
  // }
  const result = await Book.create(book);
  return result;
};

export const getSingleBook = async (
  id: string | Types.ObjectId
): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id }).populate(
    "seller",
    "-password"
  );
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }
  return result;
};
export const getAllBook = async (): Promise<IBook[] | null> => {
  const result = await Book.find().populate("seller", "fullName");

  return result;
};
export const deleteBook = async (
  id: string,
  userId: string
): Promise<IBook | null> => {
  const bookFind = await Book.findOne({ _id: id });
  if (!bookFind) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }
  if (bookFind.seller.toString() !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }
  const result = await Book.findByIdAndDelete({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }
  return result;
};

export const updateBook = async (
  id: string,
  userId: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const bookFind = await Book.findOne({ _id: id });

  if (!bookFind) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }
  if (bookFind.seller.toString() !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }

  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const saveReview = async (
  reviewData: IReview,
  id: string
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: reviewData } },
    { new: true }
  );
  return result;
};
export const deleteReviewByID = async (
  userId: string,
  id: string
): Promise<IBook | null> => {
  const findReviews = await Book.findOne({
    "reviews._id": id,
    "reviews.user": userId,
  });
  if (!findReviews) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review not found !");
  }
  const result = await Book.findOneAndUpdate(
    { "reviews._id": id },
    { $pull: { reviews: { _id: id, user: userId } } },
    { new: true }
  );
  return result;
};
