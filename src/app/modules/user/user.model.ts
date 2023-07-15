import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../../config";
import { role } from "./user.constant";
import { IUser, UserModel } from "./user.interface";
const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
      enum: role,
      default: role[0],
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      required: false,
    },
    totalBuy: {
      type: Number,
      required: false,
    },
    totalSell: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
export const User = model<IUser, UserModel>("User", userSchema);
