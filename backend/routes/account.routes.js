import express from "express";
import { handleLogin, createAdmin } from "../controllers/account.controller.js";

const router = express.Router();

router.post("/admin" , handleLogin)
router.post("/admin/create" , createAdmin)

export default router;