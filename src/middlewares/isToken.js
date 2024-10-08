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
var auth_1 = require("../utils/auth");
var user_1 = require("../models/user");
var isToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, jwtToken, user, newUser, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1])];
            case 1:
                token = _b.sent();
                if (!token) {
                    return [2 /*return*/, res.status(403).json({
                            message: "you donot have access",
                        })];
                }
                jwtToken = (0, auth_1.verifyToken)(token);
                if (!jwtToken) {
                    return [2 /*return*/, res.status(401).json({
                            message: "token i not valid",
                        })];
                }
                return [4 /*yield*/, user_1.default.findById({
                        _id: jwtToken === null || jwtToken === void 0 ? void 0 : jwtToken.id,
                    })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(402).json({
                            message: 'user is not found'
                        })];
                }
                newUser = user.toObject();
                Reflect.deleteProperty(newUser, "password");
                Reflect.deleteProperty(newUser, "createdAt");
                Reflect.deleteProperty(newUser, "updatedAt");
                req.user = newUser;
                next();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(401).json({
                        message: "unkown erro",
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = isToken;
