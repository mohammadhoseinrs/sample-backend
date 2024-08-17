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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.getOnePost = exports.addBookamrk = exports.likePost = exports.getRecentPosts = exports.create = void 0;
var post_1 = require("../models/post");
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, caption, location, tags, files, params, allUrl, newPost, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, caption = _a.caption, location = _a.location, tags = _a.tags;
                files = req.files;
                params = req.params;
                if (!files) {
                    return [2 /*return*/, res.status(402).json({
                            message: "there is no files",
                        })];
                }
                allUrl = files === null || files === void 0 ? void 0 : files.map(function (file) { return file.filename; });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post_1.default.create({
                        caption: caption,
                        location: location,
                        tags: tags,
                        file: allUrl,
                        creator: params.id,
                        like: [],
                    })];
            case 2:
                newPost = _b.sent();
                if (!newPost) {
                    return [2 /*return*/, res.status(402).json({
                            message: "we cannot create post",
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        newPost: newPost,
                    })];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(401).json({
                        message: err_1,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var getRecentPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recentPost, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, post_1.default
                        .find({})
                        .sort({ createdAt: -1 })
                        .limit(10)
                        .populate("creator")];
            case 1:
                recentPost = _a.sent();
                return [2 /*return*/, res.status(201).json({
                        recentPost: recentPost,
                    })];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(401).json({
                        message: "unkown error",
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRecentPosts = getRecentPosts;
var likePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, id, post, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newUser = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                id = req.params.id;
                return [4 /*yield*/, post_1.default.findById({ _id: id })];
            case 2:
                post = _a.sent();
                if (post === null || post === void 0 ? void 0 : post.like.includes(newUser._id)) {
                    post.like = post.like.filter(function (item) { return item !== String(newUser._id); });
                }
                else {
                    post === null || post === void 0 ? void 0 : post.like.push(newUser._id);
                }
                return [4 /*yield*/, (post === null || post === void 0 ? void 0 : post.save())];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        post: post,
                    })];
            case 4:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(402).json({
                        message: "unkown",
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.likePost = likePost;
var addBookamrk = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, id, post, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newUser = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                id = req.params.id;
                return [4 /*yield*/, post_1.default.findById({ _id: id })];
            case 2:
                post = _a.sent();
                if (post === null || post === void 0 ? void 0 : post.bookmark.includes(newUser._id)) {
                    post.bookmark = post.bookmark.filter(function (item) { return item !== String(newUser._id); });
                }
                else {
                    post === null || post === void 0 ? void 0 : post.bookmark.push(newUser._id);
                }
                return [4 /*yield*/, (post === null || post === void 0 ? void 0 : post.save())];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        post: post,
                    })];
            case 4:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(402).json({
                        message: "unkown",
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addBookamrk = addBookamrk;
var getOnePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, post_1.default.findById({ _id: id }, "-like -bookmark -updatedAt -createdAt")];
            case 1:
                post = _a.sent();
                if (!post) {
                    return [2 /*return*/, res.status(404).json({
                            message: "not found",
                        })];
                }
                return [2 /*return*/, res.status(200).json(post)];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, res.json("sca")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOnePost = getOnePost;
var editPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var files, params, _a, caption, location_1, tags, post, allUrl, newPost, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                files = req.files;
                params = req.params;
                _a = req.body, caption = _a.caption, location_1 = _a.location, tags = _a.tags;
                return [4 /*yield*/, post_1.default.findById({ _id: params.id })];
            case 1:
                post = _b.sent();
                console.log(params.id);
                if (!post) {
                    return [2 /*return*/, res.status(404).json({
                            message: "not found",
                        })];
                }
                console.log(caption);
                console.log(post);
                allUrl = files === null || files === void 0 ? void 0 : files.map(function (file) { return file.filename; });
                return [4 /*yield*/, post_1.default.findByIdAndUpdate({
                        _id: params.id,
                    }, {
                        caption: caption,
                        file: allUrl,
                        location: location_1,
                        tags: tags,
                        creator: post.creator,
                        like: post.like,
                        bookmark: post.bookmark,
                    })];
            case 2:
                newPost = _b.sent();
                console.log(newPost);
                return [2 /*return*/, res.status(200).json(newPost)];
            case 3:
                err_6 = _b.sent();
                return [2 /*return*/, res.json(err_6)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.editPost = editPost;
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedPots, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, post_1.default.findByIdAndDelete({ _id: id })];
            case 1:
                deletedPots = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "deleted",
                    })];
            case 2:
                err_7 = _a.sent();
                return [2 /*return*/, res.status(400).json({
                        message: err_7,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
