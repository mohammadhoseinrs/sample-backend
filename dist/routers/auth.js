"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const isToken_1 = __importDefault(require("../middlewares/isToken"));
const router = (0, express_1.Router)();
router.route("/register").post(auth_1.register);
router.route('/login').post(auth_1.login);
router.route('/getMe').get(isToken_1.default, auth_1.getMe);
exports.default = router;
