import { body } from 'express-validator'

export const validateInfo = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .matches(/^[a-zA-Z ]+$/, 'g')
    .withMessage('El nombre solo puede contener letras y espacios'),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isString()
    .withMessage('La contraseña debe ser una cadena de texto'),

  body('rol')
    .notEmpty()
    .isInt()
    .withMessage('El rol es obligatorio'),
  body('permisos')
    .isArray()
    .optional(),
  body('permisos.*')
    .isString()
    .withMessage('Los permisos deben ser una cadena')

]
