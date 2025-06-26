// services/user.service.ts

import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import JwtService from "../utils/jwtService.js";

export const createUserService = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already exists");

  const encryptedPassword = await hashPassword(password);
  const newUser = await User.create({ name, email, password: encryptedPassword });

  const token = JwtService.sign({ userId: newUser._id.toString() });

  return {
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  };
};

export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = JwtService.sign({ userId: user._id.toString() });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const getAllUsersService = async (excludeUserId: string) => {
  return await User.find({ _id: { $ne: excludeUserId } });
};

export const getUserByIdService = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};
