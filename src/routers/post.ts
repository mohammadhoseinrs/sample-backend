import { Router } from "express";
import {
  create,
  getRecentPosts,
  likePost,
  addBookamrk,
  getOnePost,
  editPost,
  deletePost,
} from "../controllers/post";
import uploader from "../utils/multer";
import multer from "multer";
import isToken from "../middlewares/isToken";

const router = Router();

router
  .route("/create/:id")
  .post(
    multer({ storage: uploader, limits: { fieldSize: 10000 } }).array(
      "photos",
      6
    ),
    create
  );

router.route("/recent").get(getRecentPosts);
router.route("/like/:id").post(isToken, likePost);
router.route("/bookmark/:id").post(isToken, addBookamrk);
router
  .route("/:id")
  .get(getOnePost)
  .post(
    multer({ storage: uploader, limits: { fieldSize: 10000 } }).array(
      "photos",
      6
    ),
    editPost
  );


  router.route('/delete/:id').get(deletePost)
export default router;
