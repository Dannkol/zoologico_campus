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
    .isArray()
    .withMessage('El rol es obligatorio')
    .notEmpty()
    .withMessage('El rol es obligatorio')
    .custom(values => values.every(value => typeof value === 'string'))
    .withMessage('Cada elemento del rol debe ser una cadena de texto'),
  body('permisos')
    .isArray()
    .optional()
    .custom(values => values.every(value => typeof value === 'string'))
    .withMessage('Los permisos deben ser una cadena')

]
