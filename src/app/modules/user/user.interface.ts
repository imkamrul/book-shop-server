import { Model } from "mongoose";
export type IUserRole = "default" | "buyer" | "seller" | "admin";
export type IUser = {
  // id?: string;
  // _id?: string;
  password: string;
  role: IUserRole;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  email: string;
  totalBuy?: number;
  totalSell?: number;
};
export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
export type IPasswordChangeUser = {
  newPassword: string;
  oldPassword: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: UserModel;
};
export type ILogInUser = {
  email: string;
  password: string;
};
