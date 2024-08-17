"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var post_1 = require("../controllers/post");
var multer_1 = require("../utils/multer");
var multer_2 = require("multer");
var isToken_1 = require("../middlewares/isToken");
var router = (0, express_1.Router)();
router
    .route("/create/:id")
    .post((0, multer_2.default)({ storage: multer_1.default, limits: { fieldSize: 10000 } }).array("photos", 6), post_1.create);
router.route("/recent").get(post_1.getRecentPosts);
router.route("/like/:id").post(isToken_1.default, post_1.likePost);
router.route("/bookmark/:id").post(isToken_1.default, post_1.addBookamrk);
router
    .route("/:id")
    .get(post_1.getOnePost)
    .post((0, multer_2.default)({ storage: multer_1.default, limits: { fieldSize: 10000 } }).array("photos", 6), post_1.editPost);
router.route('/delete/:id').get(post_1.deletePost);
exports.default = router;
