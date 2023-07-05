import express from "express";
import { login, logout, regester } from "../controller/authControllerr.js";

const router = express.Router();
router.post("/regester", regester);
router.post("/login", login);
router.post("/logout", logout);
export default router;
