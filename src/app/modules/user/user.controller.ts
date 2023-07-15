import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../common/catchAsync";
import sendResponse from "../../common/response";
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUser,
} from "./user.interface";
import {
  UserLogIn,
  deleteUser,
  getSingleUser,
  handleRefreshToken,
  saveUser,
  updateUser,
  updateUserPassword,
} from "./user.service";

export const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await saveUser(userData);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users created successfully",
      data: result,
    });
  }
);

export const logInUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const logInData = req.body;

    const result = await UserLogIn(logInData);
    if (!result) {
      throw new Error("Login failed");
    }
    const { refreshToken, ...others } = result;

    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: "User login successfully !",
      data: others,
    });
  }
);

export const getMyProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req;
    console.log("user :", user);
    if (!user) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "User not authenticated",
      });
    }
    const result = await getSingleUser(user.id);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved successfully",
      data: result,
    });
  }
);
export const deleteUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await deleteUser(id);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User deleted successfully",
      data: result,
    });
  }
);

export const updateMyProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req;
    if (!user) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "User not authenticated",
      });
    }
    const updatedData = req.body;

    const result = await updateUser(user?.id, updatedData);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User updated successfully",
      data: result,
    });
  }
);
export const updateMyPassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req;
    if (!user) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "User not authenticated",
      });
    }
    const updatedData = req.body;
    const result = await updateUserPassword(user?.id, updatedData);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User password successfully",
      data: result,
    });
  }
);
export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await handleRefreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "New access token generated successfully !",
    data: result,
  });
});
export const logOut = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "User Logout successfully !",
    data: null,
  });
});
