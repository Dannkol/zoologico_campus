import { body } from 'express-validator'

export const validateInfoInicioSesion = [
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
    .withMessage('La contraseña debe ser una cadena de texto')
]
