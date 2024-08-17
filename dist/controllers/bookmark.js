"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whichOneIsSaved = exports.createBookmark = void 0;
const bookmark_1 = __importDefault(require("../models/bookmark"));
const createBookmark = async (req, res) => {
    try {
        const { creator, post } = req.body;
        console.log({ creator, post });
        if (!creator || !post) {
            return res.status(404).json({
                message: "not found",
            });
        }
        const isBookmark = await bookmark_1.default.findOne({
            $and: [{ creator }, { post }],
        });
        if (isBookmark) {
            await isBookmark.deleteOne();
            return res.status(201).json({
                message: "deleted",
            });
        }
        const bookmark = await bookmark_1.default.create({
            creator,
            post,
        });
        return res.status(201).json(bookmark);
    }
    catch (err) {
        return res.status(401).json(err);
    }
};
exports.createBookmark = createBookmark;
const whichOneIsSaved = async (req, res) => {
    try {
        const { id } = req.params;
        const allBookmark = await bookmark_1.default.find({
            creator: id,
        });
        return res.status(201).json(allBookmark);
    }
    catch (err) {
        return res.status(400).json(err);
    }
};
exports.whichOneIsSaved = whichOneIsSaved;
