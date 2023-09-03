import { body } from 'express-validator'
import { ObjectId } from 'mongodb'

export const validateAreaInvestigacion = [
  body('area')
    .isIn([
      'Cuarentena',
      'Morgue',
      'Radiologia',
      'Quirofano',
      'Microbiologia',
      'Botanica',
      'Investigacion general'
    ])
    .withMessage('El valor de "area" es inválido'),
  body('responsables.*').customSanitizer((value) => new ObjectId(value)),
  body('fecha_creacion').notEmpty()
    .withMessage('La fecha de la baja es obligatoria')
    .isISO8601()
    .withMessage('El formato de fecha debe ser ISO 8601')
    .toDate(),
  body('investigaciones.*.id_investigacion').customSanitizer((value) => new ObjectId(value)),
  body('investigaciones.*.responsables.*').customSanitizer((value) => new ObjectId(value)),
  body('investigaciones.*.id_animal.*').customSanitizer((value) => new ObjectId(value)),
  body('investigaciones.*.nombre').optional().isString(),
  body('investigaciones.*.fecha_inicio')
    .optional()
    .isISO8601()
    .withMessage('El formato de fecha debe ser ISO 8601')
    .toDate(),
  body('investigaciones.*.fecha_fin')
    .optional()
    .isISO8601()
    .withMessage('El formato de fecha debe ser ISO 8601')
    .toDate(),
  body('investigaciones.*.doc.*.fecha')
    .optional()
    .isISO8601()
    .withMessage('El formato de fecha debe ser ISO 8601')
    .toDate(),
  body('investigaciones.*.doc.*.responsables.*').customSanitizer((value) => new ObjectId(value)),
  body('investigaciones.*.doc.*.id_animal.*').customSanitizer((value) => new ObjectId(value)),
  body('investigaciones.*.doc.*.url').optional().isString(),
  body('investigaciones.*.doc.*.resumen').optional().isString(),
  body('descripcion').isString().withMessage('El valor de "descripcion" debe ser una cadena')
]
