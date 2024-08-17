import { Request, Response } from "express";
import UserModel, { IUser } from "../models/user";
import {
  comparePassword,
  generateAccessToken,
  hashPassword,
} from "../utils/auth";
import { Types } from "mongoose";
import { CustomRequest } from "../middlewares/isToken";

export const register = async (
  req: Request<{}, {}, IUser>,
  res: Response
): Promise<Response> => {
  const { name, username, email, password } = req.body;
  try {
    const isUserAvailable = await UserModel.findOne({
      username,
    });
    if (isUserAvailable) {
      return res.status(401).json({
        message: "the username is avaialble",
      });
    }
    const hashingPassword = await hashPassword(password);
    const user: IUser = await UserModel.create({
      name,
      username,
      email,
      password: hashingPassword,
    });

    const newUser = user.toObject();
    Reflect.deleteProperty(newUser, "password");
    Reflect.deleteProperty(newUser, "createdAt");
    Reflect.deleteProperty(newUser, "updatedAt");

    const accessToken = generateAccessToken(user._id as Types.ObjectId);

    return res.status(201).json({ newUser, accessToken });
  } catch (err) {
    return res.status(201).json({ message: "unkown error" });
  }
};

export const login = async (
  req: Request<{}, {}, IUser>,
  res: Response
): Promise<Response> => {
  try {
    const { username, password } = req.body;
    console.log(username);
    
    const user: IUser | null = await UserModel.findOne({
      username,
    });
    console.log(user);
    
    if (!user) {
      return res.status(401).json({
        message: "you dont have an account",
      });
    }
    
    const isPasswordOk = await comparePassword(password, user.password);
    if (!isPasswordOk) {
      return res.status(403).json({
        message: "the password is not correct",
      });
    }
    const newUser = user.toObject();
    Reflect.deleteProperty(newUser, "password");
    Reflect.deleteProperty(newUser, "createdAt");
    Reflect.deleteProperty(newUser, "updatedAt");
    const accessToken = generateAccessToken(user._id as Types.ObjectId);

    return res.status(200).json({
      newUser,
      accessToken,
    });
  } catch (err) {
    return res.status(200).json({
      message: "scc",
    });
  }
};

export const getMe = async (req: Request, res: Response): Promise<Response> => {
  const newUser=(req as CustomRequest).user
  try {
    return res.status(202).json({
      newUser
    });
  } catch (err) {
    return res.status(402).json({
      message: "error",
    });
  }
};
