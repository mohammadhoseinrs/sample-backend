import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (pass: string, hashPass: string) => {
  const isEqual = await bcrypt.compare(pass, hashPass);
  return isEqual;
};

export const generateAccessToken = (id: Types.ObjectId): string => {
  const accessToken = jwt.sign({ id }, process.env.SECRET_KEY as string, {
    expiresIn: "30d",
  });
  return accessToken;
};

export const verifyToken = (token: string) => {
  const jwtPayload = jwt.verify(token, process.env.SECRET_KEY as string);  
  return jwtPayload as JwtPayload;
};
