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
exports.verifyToken = exports.generateAccessToken = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    return hashedPassword;
});
exports.hashPassword = hashPassword;
const comparePassword = (pass, hashPass) => __awaiter(void 0, void 0, void 0, function* () {
    const isEqual = yield bcrypt_1.default.compare(pass, hashPass);
    return isEqual;
});
exports.comparePassword = comparePassword;
const generateAccessToken = (id) => {
    const accessToken = jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: "30d",
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
const verifyToken = (token) => {
    const jwtPayload = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    return jwtPayload;
};
exports.verifyToken = verifyToken;
