// controllers/user.controller.ts

import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError.js";
import sendResponse from "../utils/sendResponse.js";
import {
  createUserService,
  loginUserService,
  getAllUsersService,
  getUserByIdService,
} from "../services/auth.service.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const result = await createUserService(name, email, password);
    sendResponse(res, 200, result);
  } catch (error: any) {
    return next(new CustomError(error.message, 400));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);
    sendResponse(res, 200, result);
  } catch (error: any) {
    return next(new CustomError(error.message, 400));
  }
};

export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId:any = req?.user?._id
    const users = await getAllUsersService( userId?.userId,);
    sendResponse(res, 200, users);
  } catch (error: any) {
    return next(new CustomError(error.message, 500));
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await getUserByIdService(req.params.id);
    sendResponse(res, 200, user);
  } catch (error: any) {
    return next(new CustomError(error.message, 404));
  }
};
