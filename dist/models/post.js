"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    caption: {
        type: String,
        required: true,
    },
    file: {
        type: [String],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    creator: {
        type: mongoose_1.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    like: {
        type: [String]
    },
    bookmark: {
        type: [String]
    }
}, {
    timestamps: true,
    versionKey: false,
});
const postModel = (0, mongoose_1.model)("Post", schema);
exports.default = postModel;
