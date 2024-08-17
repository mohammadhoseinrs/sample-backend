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
exports.getMe = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const auth_1 = require("../utils/auth");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, password } = req.body;
    try {
        const isUserAvailable = yield user_1.default.findOne({
            username,
        });
        if (isUserAvailable) {
            return res.status(401).json({
                message: "the username is avaialble",
            });
        }
        const hashingPassword = yield (0, auth_1.hashPassword)(password);
        const user = yield user_1.default.create({
            name,
            username,
            email,
            password: hashingPassword,
        });
        const newUser = user.toObject();
        Reflect.deleteProperty(newUser, "password");
        Reflect.deleteProperty(newUser, "createdAt");
        Reflect.deleteProperty(newUser, "updatedAt");
        const accessToken = (0, auth_1.generateAccessToken)(user._id);
        return res.status(201).json({ newUser, accessToken });
    }
    catch (err) {
        return res.status(201).json({ message: "unkown error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        console.log(username);
        const user = yield user_1.default.findOne({
            username,
        });
        console.log(user);
        if (!user) {
            return res.status(401).json({
                message: "you dont have an account",
            });
        }
        const isPasswordOk = yield (0, auth_1.comparePassword)(password, user.password);
        if (!isPasswordOk) {
            return res.status(403).json({
                message: "the password is not correct",
            });
        }
        const newUser = user.toObject();
        Reflect.deleteProperty(newUser, "password");
        Reflect.deleteProperty(newUser, "createdAt");
        Reflect.deleteProperty(newUser, "updatedAt");
        const accessToken = (0, auth_1.generateAccessToken)(user._id);
        return res.status(200).json({
            newUser,
            accessToken,
        });
    }
    catch (err) {
        return res.status(200).json({
            message: "scc",
        });
    }
});
exports.login = login;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.user;
    try {
        return res.status(202).json({
            newUser
        });
    }
    catch (err) {
        return res.status(402).json({
            message: "error",
        });
    }
});
exports.getMe = getMe;
