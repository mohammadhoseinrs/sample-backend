"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookmark_1 = require("../controllers/bookmark");
const router = (0, express_1.Router)();
router.route('/add').post(bookmark_1.createBookmark);
router.route('/:id').get(bookmark_1.whichOneIsSaved);
exports.default = router;
