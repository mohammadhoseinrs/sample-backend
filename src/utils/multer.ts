import multer, { Multer } from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";

const uploader = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, path.join(__dirname, "..", "public", "posts"));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + Math.random() * 9999;
    const ext = path.extname(file.originalname);
    cb(null, fileName + ext);
  },
});

export default uploader;
