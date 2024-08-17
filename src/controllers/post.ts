import { Request, Response } from "express";
import postModel, { Ipost } from "../models/post";
import { Types } from "mongoose";
import { CustomRequest } from "../middlewares/isToken";

export const create = async (
  req: Request<{}, {}, Ipost>,
  res: Response
): Promise<Response> => {
  const { caption, location, tags } = req.body;

  const files = req.files as Express.Multer.File[] | undefined;
  const params = req.params as Types.ObjectId;
  if (!files) {
    return res.status(402).json({
      message: "there is no files",
    });
  }
  const allUrl = files?.map((file) => file.filename);

  try {
    const newPost = await postModel.create({
      caption,
      location,
      tags,
      file: allUrl,
      creator: params.id,
      like: [],
    });
    if (!newPost) {
      return res.status(402).json({
        message: "we cannot create post",
      });
    }

    return res.status(200).json({
      newPost,
    });
  } catch (err) {
    return res.status(401).json({
      message: err,
    });
  }
};

export const getRecentPosts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const recentPost = await postModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("creator");

    return res.status(201).json({
      recentPost,
    });
  } catch (err) {
    return res.status(401).json({
      message: "unkown error",
    });
  }
};

export const likePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser = (req as CustomRequest).user;
  try {
    const { id } = req.params;
    const post = await postModel.findById({ _id: id });
    if (post?.like.includes(newUser._id as string)) {
      post.like = post.like.filter((item) => item !== String(newUser._id));
    } else {
      post?.like.push(newUser._id as string);
    }
    await post?.save();
    return res.status(200).json({
      post,
    });
  } catch (err) {
    return res.status(402).json({
      message: "unkown",
    });
  }
};

export const addBookamrk = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser = (req as CustomRequest).user;
  try {
    const { id } = req.params;
    const post = await postModel.findById({ _id: id });
    if (post?.bookmark.includes(newUser._id as string)) {
      post.bookmark = post.bookmark.filter(
        (item) => item !== String(newUser._id)
      );
    } else {
      post?.bookmark.push(newUser._id as string);
    }
    await post?.save();
    return res.status(200).json({
      post,
    });
  } catch (err) {
    return res.status(402).json({
      message: "unkown",
    });
  }
};

export const getOnePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(
      { _id: id },
      "-like -bookmark -updatedAt -createdAt"
    );
    if (!post) {
      return res.status(404).json({
        message: "not found",
      });
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.json("sca");
  }
};

export const editPost = async (
  req: Request<{}, {}, Ipost>,
  res: Response
): Promise<Response> => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const params = req.params as Types.ObjectId;
    const { caption, location, tags } = req.body;
    const post = await postModel.findById({ _id: params.id });
    console.log(params.id);
    
    if (!post) {
      return res.status(404).json({
        message: "not found",
      });
    }
    console.log(caption);
    console.log(post);
    
    const allUrl = files?.map((file) => file.filename);

    const newPost = await postModel.findByIdAndUpdate(
      {
        _id: params.id,
      },
      {
        caption,
        file: allUrl,
        location,
        tags,
        creator: post.creator,
        like: post.like,
        bookmark: post.bookmark,
      }
    );
    console.log(newPost);
    
    return res.status(200).json(newPost);
  } catch (err) {
    return res.json(err)
  }
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const deletedPots = await postModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      message: "deleted",
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};
