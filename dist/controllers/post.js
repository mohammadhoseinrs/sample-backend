"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.getOnePost = exports.addBookamrk = exports.likePost = exports.getRecentPosts = exports.create = void 0;
const post_1 = __importDefault(require("../models/post"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { caption, location, tags } = req.body;
    const files = req.files;
    const params = req.params;
    if (!files) {
        return res.status(402).json({
            message: "there is no files",
        });
    }
    const allUrl = files === null || files === void 0 ? void 0 : files.map((file) => file.filename);
    try {
        const newPost = yield post_1.default.create({
            caption,
            location,
            tags,
            file: allUrl,
            creator: params.id,
            like: [],
        });
        if (!newPost) {
            return res.status(402).json({
                message: "we cannot create post",
            });
        }
        return res.status(200).json({
            newPost,
        });
    }
    catch (err) {
        return res.status(401).json({
            message: err,
        });
    }
});
exports.create = create;
const getRecentPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recentPost = yield post_1.default
            .find({})
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("creator");
        return res.status(201).json({
            recentPost,
        });
    }
    catch (err) {
        return res.status(401).json({
            message: "unkown error",
        });
    }
});
exports.getRecentPosts = getRecentPosts;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.user;
    try {
        const { id } = req.params;
        const post = yield post_1.default.findById({ _id: id });
        if (post === null || post === void 0 ? void 0 : post.like.includes(newUser._id)) {
            post.like = post.like.filter((item) => item !== String(newUser._id));
        }
        else {
            post === null || post === void 0 ? void 0 : post.like.push(newUser._id);
        }
        yield (post === null || post === void 0 ? void 0 : post.save());
        return res.status(200).json({
            post,
        });
    }
    catch (err) {
        return res.status(402).json({
            message: "unkown",
        });
    }
});
exports.likePost = likePost;
const addBookamrk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.user;
    try {
        const { id } = req.params;
        const post = yield post_1.default.findById({ _id: id });
        if (post === null || post === void 0 ? void 0 : post.bookmark.includes(newUser._id)) {
            post.bookmark = post.bookmark.filter((item) => item !== String(newUser._id));
        }
        else {
            post === null || post === void 0 ? void 0 : post.bookmark.push(newUser._id);
        }
        yield (post === null || post === void 0 ? void 0 : post.save());
        return res.status(200).json({
            post,
        });
    }
    catch (err) {
        return res.status(402).json({
            message: "unkown",
        });
    }
});
exports.addBookamrk = addBookamrk;
const getOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield post_1.default.findById({ _id: id }, "-like -bookmark -updatedAt -createdAt");
        if (!post) {
            return res.status(404).json({
                message: "not found",
            });
        }
        return res.status(200).json(post);
    }
    catch (err) {
        return res.json("sca");
    }
});
exports.getOnePost = getOnePost;
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const params = req.params;
        const { caption, location, tags } = req.body;
        const post = yield post_1.default.findById({ _id: params.id });
        console.log(params.id);
        if (!post) {
            return res.status(404).json({
                message: "not found",
            });
        }
        console.log(caption);
        console.log(post);
        const allUrl = files === null || files === void 0 ? void 0 : files.map((file) => file.filename);
        const newPost = yield post_1.default.findByIdAndUpdate({
            _id: params.id,
        }, {
            caption,
            file: allUrl,
            location,
            tags,
            creator: post.creator,
            like: post.like,
            bookmark: post.bookmark,
        });
        console.log(newPost);
        return res.status(200).json(newPost);
    }
    catch (err) {
        return res.json(err);
    }
});
exports.editPost = editPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedPots = yield post_1.default.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            message: "deleted",
        });
    }
    catch (err) {
        return res.status(400).json({
            message: err,
        });
    }
});
exports.deletePost = deletePost;
