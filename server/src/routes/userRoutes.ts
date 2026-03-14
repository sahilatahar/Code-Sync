import { Router } from "express";
import { LoginUser, RegisterUser } from "../controller/userController";

const router = Router();

// register user routes here

router.post("/register", RegisterUser);

router.post("/login", LoginUser);

export default router;