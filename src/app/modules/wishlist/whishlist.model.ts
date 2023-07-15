import { Schema, model } from "mongoose";
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
  },
  {
    timestamps: true,
  }
);

export const WhishList = model<IWhishList, WhishListModel>(
  "WhishList",
  WhishListSchema
);
