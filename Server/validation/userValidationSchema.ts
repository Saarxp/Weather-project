import { body } from "express-validator";

export const validateEmail = body("email")
  .isLength({ min: 5 })
  .withMessage("email less than 5")
  .isEmail()
  .trim()
  .escape();

export const validatePassword = body("password")
  .isLength({ min: 5 })
  .withMessage("password less than 5")
  .trim()
  .escape();

export const validateFirstName = body("firstName").trim().notEmpty().escape();

export const validateLastName = body("lastName").trim().notEmpty().escape();

export const validateProfileImg = body("profileImage").trim().escape();

export const validateUserInformation = [
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateProfileImg,
];
