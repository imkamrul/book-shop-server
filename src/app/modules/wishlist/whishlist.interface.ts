import { Model, Types } from "mongoose";

export interface IWhishList {
  book: Types.ObjectId;
  buyer: Types.ObjectId;
}

export type WhishListModel = Model<IWhishList>;
