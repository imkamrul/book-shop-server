import { Model, Types } from "mongoose";
export type ICurrentStatus = "Not Started" | "Running" | "Finished";
export interface IWhishList {
  book: Types.ObjectId;
  buyer: Types.ObjectId;
  currentStatus: ICurrentStatus;
}

export type WhishListModel = Model<IWhishList>;
