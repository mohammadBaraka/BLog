import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controller/postsController.js";
const router = express.Router();
router.get("/posts", getAllPosts);
router.post("/posts", createPost);
router.get("/posts/:id", getPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);
export default router;
