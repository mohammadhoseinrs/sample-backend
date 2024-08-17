"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./configs/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routers/auth"));
const post_1 = __importDefault(require("./routers/post"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use("/posts", express_1.default.static(path_1.default.join(__dirname, "public", "posts")));
(0, db_1.default)();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is connected to ${PORT}`);
});
app.use("/auth", auth_1.default);
app.use("/post", post_1.default);
