import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../common/catchAsync";
import sendResponse from "../../common/response";
import { IWhishList } from "./whishlist.interface";
import {
  deleteWhishListById,
  getWhishListById,
  saveWhishList,
  updateWhishListById,
} from "./whishlist.service";

export const createWhishList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const orderData = req.body;
    const result = await saveWhishList(orderData);

    sendResponse<IWhishList>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Whishlist created successfully",
      data: result,
    });
  }
);
export const getSingleWhishList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getWhishListById(id as any);

    sendResponse<IWhishList[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Whishlist retrieved successfully",
      data: result,
    });
  }
);
export const updateSingleWhishList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { currentStatus } = req.body;

    const result = await updateWhishListById(id as any, currentStatus);

    sendResponse<IWhishList>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Whishlist update successfully",
      data: result,
    });
  }
);
export const deleteSingleWhishList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await deleteWhishListById(id as any);

    sendResponse<IWhishList[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Whishlist deleted successfully",
      data: result,
    });
  }
);
