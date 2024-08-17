import express from "express";
import connectToDB from "./configs/db";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routers/auth";
import postRouter from "./routers/post";
import path from "path";
import uploader from "./utils/multer";
import multer from "multer";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/posts", express.static(path.join(__dirname, "public", "posts")));

connectToDB();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is connected to ${PORT}`);
});

app.use("/auth", authRouter);
app.use("/post", postRouter);
