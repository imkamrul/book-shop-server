import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IReview {
  name: string;
  rating: number;
  message: string;
  user: Types.ObjectId | IUser;
}

export type IBook = {
  book_img: string;
  rating: number;
  title: string;
  author: string;
  genre: string;
  publishDate: string;
  totalDownload: number;
  price: number;
  seller: Types.ObjectId | IUser;
  reviews?: IReview[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type ICowsFilters = {
  sortBy?: string;
  sortOrder?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  rating?: number;
  title?: string;
  author?: string;
  genre?: string;
  publishDate?: Date;
  totalDownload?: number;
  price?: number;
  searchTerm?: string;
};
