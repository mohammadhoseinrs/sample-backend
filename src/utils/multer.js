"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = require("multer");
var path_1 = require("path");
var uploader = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "..", "public", "posts"));
    },
    filename: function (req, file, cb) {
        var fileName = Date.now() + Math.random() * 9999;
        var ext = path_1.default.extname(file.originalname);
        cb(null, fileName + ext);
    },
});
exports.default = uploader;
