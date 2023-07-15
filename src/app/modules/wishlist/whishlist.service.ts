import httpStatus from "http-status";
import mongoose, { Types } from "mongoose";
import ApiError from "../../errors/ApiError";
import { Book } from "../book/book.model";
import { getSingleBook } from "../book/book.service";
import { getSingleUser } from "../user/user.service";
import { IWhishList } from "./whishlist.interface";
import { WhishList } from "./whishlist.model";
export const saveWhishList = async (data: IWhishList): Promise<any | null> => {
  const { book, buyer } = data;
  const findBookInWhishList = await WhishList.findOne({
    book: book,
    buyer: buyer,
  });
  if (findBookInWhishList) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Book already in your WhishList"
    );
  }
  const findBook = await getSingleBook(book);
  if (!findBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Book not found");
  }
  const findBuyer = await getSingleUser(buyer);
  if (!findBuyer) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Buyer not found");
  }

  let newOder: any;
  if (findBook && findBuyer) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      const options = { new: true, session: session };

      await Book.findOneAndUpdate(
        { _id: book },
        { $inc: { totalDownload: 1 } },
        options
      );

      newOder = await WhishList.create([data], { session });

      if (!newOder) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Failed to create New Order"
        );
      }

      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }
  return newOder;
};

export const deleteWhishListById = async (
  id: Types.ObjectId
): Promise<IWhishList[] | null> => {
  const findBookInWhishList = await WhishList.findById(id).populate("book");

  let deletedWhishList: any;
  if (!findBookInWhishList) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Book not available in whishlist"
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const options = { new: true, session: session };
    deletedWhishList = await WhishList.findByIdAndDelete(id, options);
    const result = await Book.findOneAndUpdate(
      { _id: findBookInWhishList?.book?._id },
      { $inc: { totalDownload: -1 } },
      options
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return deletedWhishList;
};

export const getWhishListById = async (
  id: Types.ObjectId
): Promise<IWhishList[] | null> => {
  const result = await WhishList.find({ buyer: id }).populate("book");
  return result;
};
export const updateWhishListById = async (
  id: Types.ObjectId,
  currentStatus: string
): Promise<IWhishList | null> => {
  const result = await WhishList.findOneAndUpdate(
    { _id: id },

    { currentStatus },
    {
      new: true,
    }
  );
  return result;
};
