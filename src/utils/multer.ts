import multer from "multer";
import path from "path";
import crypto from "crypto";

 const uploader = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "posts"));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + (Math.random() * 9999)
    const ext = path.extname(file.originalname);
    cb(null, fileName + ext);
  },
});

export default uploader
