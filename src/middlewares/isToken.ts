import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth";
import UserModel, { IUser } from "../models/user";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request{
    user:IUser
}
const isToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "you donot have access",
      });
    }
    const jwtToken: JwtPayload = verifyToken(token);
    if (!jwtToken) {
      return res.status(401).json({
        message: "token i not valid",
      });
    }
    const user = await UserModel.findById({
      _id: jwtToken?.id,
    });
    
    if(!user){
        return res.status(402).json({
            message:'user is not found'
        })
    }
    const newUser = user.toObject();
    Reflect.deleteProperty(newUser, "password");
    Reflect.deleteProperty(newUser, "createdAt");
    Reflect.deleteProperty(newUser, "updatedAt");
    
    (req as CustomRequest).user=newUser
    next()
  } catch (err) {
    return res.status(401).json({
      message: "unkown erro",
    });
  }
};

export default isToken;
