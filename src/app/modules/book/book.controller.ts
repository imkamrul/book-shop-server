import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../common/catchAsync";
import sendResponse from "../../common/response";
import { IBook } from "./book.interface";
import {
  deleteBook,
  deleteReviewByID,
  getAllBook,
  getSingleBook,
  saveBook,
  saveReview,
  updateBook,
} from "./book.service";
export const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookData = req.body;
    console.log("bookData :", bookData);

    const result = await saveBook(bookData);

    sendResponse<IBook>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book created successfully",
      data: result,
    });
  }
);
export const getBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllBook();

    sendResponse<IBook[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book retrieved successfully",
      data: result,
    });
  }
);
export const getBookById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleBook(id);

    sendResponse<IBook>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book retrieved successfully",
      data: result,
    });
  }
);
export const deleteBookById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = req.user?.id;
    const result = await deleteBook(id, userId);

    sendResponse<IBook>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book deleted successfully",
      data: result,
    });
  }
);
export const updateBookById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const userId = req.user?.id;
    const result = await updateBook(id, userId, updatedData);

    sendResponse<IBook>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Books updated successfully",
      data: result,
    });
  }
);
export const createReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const reviewData = req.body;
    const id = req.params.id;
    const result = await saveReview(reviewData, id);

    sendResponse<IBook>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book review added successfully",
      data: result,
    });
  }
);
export const deleteReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const id = req.params.id;
    const result = await deleteReviewByID(userId, id);

    sendResponse<IBook>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book review deleted successfully",
      data: result,
    });
  }
);
