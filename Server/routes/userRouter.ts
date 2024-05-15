import express from "express";
import * as Controller from "../controllers/userController";
import { validateSchema } from "../validation/validationSchema";
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validateProfileImg,
  validateUserInformation,
} from "../validation/userValidationSchema";
import { oneOf } from "express-validator";

const router = express.Router();

router.get("/get", Controller.getUsers);
router.post("/myuser", Controller.getMyUser);
router.post("/login", Controller.loginUser);
router.post("/logout", Controller.logoutUser);
router.post("/register", validateSchema(validateUserInformation), Controller.addUser);
router.patch( 
  "/update",
  oneOf([validateEmail, validatePassword, validateFirstName, validateLastName, validateProfileImg]),
  Controller.authenticateToken ,
  Controller.updateUser
);
router.delete("/delete", Controller.deleteUser);

export default router;
