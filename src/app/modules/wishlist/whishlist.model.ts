import { Schema, model } from "mongoose";
import { currentStatus } from "./whishlist.constant";
import { IWhishList, WhishListModel } from "./whishlist.interface";

const WhishListSchema = new Schema<IWhishList>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentStatus: {
      type: String,
      required: true,
      enum: currentStatus,
      default: currentStatus[0],
    },
  },
  {
    timestamps: true,
  }
);

export const WhishList = model<IWhishList, WhishListModel>(
  "WhishList",
  WhishListSchema
);
