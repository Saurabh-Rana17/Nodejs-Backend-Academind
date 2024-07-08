import { Router } from "express";
import {
  getLogin,
  getNewPassword,
  getReset,
  getSignup,
  postLogin,
  postLogout,
  postNewPassword,
  postReset,
  postSignup,
} from "../controllers/auth";
import { body, check } from "express-validator";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);

router.get("/signup", getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("invalid email")
      .custom((value, { req }) => {
        if (value === "test@test.com") {
          throw new Error("This is forbidden email");
        }
        return true;
      }),
    body("password", "invalid password").isLength({ min: 5 }).isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password dont match");
      }
      return true;
    }),
  ],
  postSignup
);

router.get("/reset", getReset);
router.post("/reset", postReset);

router.get("/reset/:token", getNewPassword);
router.post("/new-password", postNewPassword);

export default router;
