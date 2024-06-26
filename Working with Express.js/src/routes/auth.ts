import { Router } from "express";
import {
  getLogin,
  getReset,
  getSignup,
  postLogin,
  postLogout,
  postReset,
  postSignup,
} from "../controllers/auth";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);

router.get("/signup", getSignup);
router.post("/signup", postSignup);

router.get("/reset", getReset);
router.post("/reset", postReset);

export default router;
