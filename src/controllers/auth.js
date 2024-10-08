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
exports.getMe = exports.login = exports.register = void 0;
var user_1 = require("../models/user");
var auth_1 = require("../utils/auth");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, username, email, password, isUserAvailable, hashingPassword, user, newUser, accessToken, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, username = _a.username, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, user_1.default.findOne({
                        username: username,
                    })];
            case 2:
                isUserAvailable = _b.sent();
                if (isUserAvailable) {
                    return [2 /*return*/, res.status(401).json({
                            message: "the username is avaialble",
                        })];
                }
                return [4 /*yield*/, (0, auth_1.hashPassword)(password)];
            case 3:
                hashingPassword = _b.sent();
                return [4 /*yield*/, user_1.default.create({
                        name: name,
                        username: username,
                        email: email,
                        password: hashingPassword,
                    })];
            case 4:
                user = _b.sent();
                newUser = user.toObject();
                Reflect.deleteProperty(newUser, "password");
                Reflect.deleteProperty(newUser, "createdAt");
                Reflect.deleteProperty(newUser, "updatedAt");
                accessToken = (0, auth_1.generateAccessToken)(user._id);
                return [2 /*return*/, res.status(201).json({ newUser: newUser, accessToken: accessToken })];
            case 5:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(201).json({ message: "unkown error" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, isPasswordOk, newUser, accessToken, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, username = _a.username, password = _a.password;
                console.log(username);
                return [4 /*yield*/, user_1.default.findOne({
                        username: username,
                    })];
            case 1:
                user = _b.sent();
                console.log(user);
                if (!user) {
                    return [2 /*return*/, res.status(401).json({
                            message: "you dont have an account",
                        })];
                }
                return [4 /*yield*/, (0, auth_1.comparePassword)(password, user.password)];
            case 2:
                isPasswordOk = _b.sent();
                if (!isPasswordOk) {
                    return [2 /*return*/, res.status(403).json({
                            message: "the password is not correct",
                        })];
                }
                newUser = user.toObject();
                Reflect.deleteProperty(newUser, "password");
                Reflect.deleteProperty(newUser, "createdAt");
                Reflect.deleteProperty(newUser, "updatedAt");
                accessToken = (0, auth_1.generateAccessToken)(user._id);
                return [2 /*return*/, res.status(200).json({
                        newUser: newUser,
                        accessToken: accessToken,
                    })];
            case 3:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "scc",
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var getMe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser;
    return __generator(this, function (_a) {
        newUser = req.user;
        try {
            return [2 /*return*/, res.status(202).json({
                    newUser: newUser
                })];
        }
        catch (err) {
            return [2 /*return*/, res.status(402).json({
                    message: "error",
                })];
        }
        return [2 /*return*/];
    });
}); };
exports.getMe = getMe;
