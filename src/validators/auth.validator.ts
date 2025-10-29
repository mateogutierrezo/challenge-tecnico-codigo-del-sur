import { body } from 'express-validator';

// Validar los campos de registro
export const signUpValidation = [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email'),

  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),

  body('lastName')
    .notEmpty()
    .withMessage('Last name is required'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// Validar los campos de login
export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];
