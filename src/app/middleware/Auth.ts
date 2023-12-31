import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { verifyToken } from "../common/jwtHelpeer";
import ApiError from "../errors/ApiError";
export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers?.authorization?.split(" ")[1];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      let verifiedUser = null;

      verifiedUser = verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
