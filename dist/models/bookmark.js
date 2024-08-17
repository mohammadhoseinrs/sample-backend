"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    creator: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
    },
    post: {
        type: mongoose_1.Types.ObjectId,
        ref: "posts",
    },
}, { versionKey: false, timestamps: true });
const bookmarkModel = (0, mongoose_1.model)("bookmarks", schema);
exports.default = bookmarkModel;
