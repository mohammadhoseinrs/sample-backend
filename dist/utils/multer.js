"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uploader = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "..", "public", "posts"));
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + Math.random() * 9999;
        const ext = path_1.default.extname(file.originalname);
        cb(null, fileName + ext);
    },
});
exports.default = uploader;
