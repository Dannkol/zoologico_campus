import { body } from 'express-validator'

export const validarBajaPersonal = [
  body('personal_id')
    .notEmpty()
    .withMessage('El ID del empleado es obligatorio')
    .isString()
    .withMessage('El ID del empleado debe ser una cadena de texto'),

  body('motivo')
    .notEmpty()
    .withMessage('El motivo de la baja es obligatorio')
    .isString()
    .withMessage('El motivo de la baja debe ser una cadena de texto'),

  body('fecha')
    .notEmpty()
    .withMessage('La fecha de la baja es obligatoria')
    .isISO8601()
    .withMessage('El formato de fecha debe ser ISO 8601')
    .toDate(),

  body('tipo')
    .notEmpty()
    .withMessage('El tipo de la baja es obligatorio')
    .isString()
    .withMessage('El tipo de la baja debe ser una cadena de texto')
    .isIn(['renuncia', 'abandono', 'muerte', 'jubilación'])
    .withMessage('El tipo de la baja debe ser uno de: renuncia, abandono, muerte, jubilación'),

  body('documentacion')
    .isArray()
    .withMessage('La documentación relacionada con la baja debe ser un arreglo')
    .custom(values => values.every(value => typeof value === 'string'))
    .withMessage('Cada elemento de documentación debe ser una cadena de texto')
]
