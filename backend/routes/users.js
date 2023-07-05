import express from "express";
import { findUser, updateUser, users } from "../controller/usersController.js";

const router = express.Router();
router.get("/users", users);
router.get("/users/:id", findUser);
router.put("/users/:id", updateUser);

export default router;
