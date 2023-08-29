import { body } from 'express-validator'

export const validarPersonal = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto'),

  body('puesto')
    .notEmpty()
    .withMessage('El puesto es obligatorio')
    .isInt()
    .withMessage('el puesto debe ser un entero el cual representa un cargo'),

  body('doc_id')
    .notEmpty()
    .withMessage('El documento de identidad es obligatorio')
    .isString()
    .withMessage('El documento de identidad debe ser una cadena de texto'),

  body('experiencia.years')
    .notEmpty()
    .withMessage('Los años de experiencia son obligatorios')
    .isInt()
    .withMessage('Los años de experiencia deben ser un número entero'),

  body('experiencia.descripcion')
    .notEmpty()
    .withMessage('La descripción de la experiencia es obligatoria')
    .isString()
    .withMessage('La descripción de la experiencia debe ser una cadena de texto'),

  body('habilidades')
    .isArray()
    .withMessage('Las habilidades deben ser un arreglo')
    .optional()
    .custom(values => values.every(value => typeof value === 'string'))
    .withMessage('Cada habilidad debe ser una cadena de texto'),

  body('arl')
    .isArray()
    .withMessage('La información de afiliación a ARL debe ser un arreglo')
    .notEmpty()
    .withMessage('La información de afiliación a ARL es obligatoria')
    .custom(values => {
      return values.every(arlInfo => {
        const requiredFields = [
          'eps',
          'pensiones',
          'caja_de_compensacion_familiar',
          'contrato',
          'doc_id'
        ]
        return requiredFields.every(field => field in arlInfo)
      })
    })
    .withMessage('Cada objeto de información de ARL debe contener los campos requeridos'),

  body('contrato')
    .notEmpty()
    .withMessage('La información del contrato es obligatoria')
    .isObject()
    .withMessage('La información del contrato debe ser un objeto')
    .custom(contractInfo => {
      const requiredFields = ['fecha', 'url', 'sueldo']
      return requiredFields.every(field => field in contractInfo)
    })
    .withMessage('La información del contrato debe contener los campos requeridos'),

  body('contrato.fecha')
    .notEmpty()
    .withMessage('La fecha de firma del contrato es obligatoria')
    .isISO8601()
    .withMessage('El formato de fecha debe ser ISO 8601')
    .toDate(),

  body('contrato.url')
    .notEmpty()
    .withMessage('El URL del documento del contrato es obligatorio')
    .isString()
    .withMessage('El URL del documento del contrato debe ser una cadena de texto'),

  body('contrato.sueldo')
    .notEmpty()
    .withMessage('El sueldo del trabajador es obligatorio')
    .isNumeric()
    .withMessage('El sueldo del trabajador debe ser un número'),

  body('observaciones')
    .isArray()
    .optional()
    .withMessage('Las observaciones deben ser un arreglo')
    .custom(values => {
      return values.every(observation => {
        const requiredFields = ['id_responsable', 'fecha', 'observacion', 'tipo']
        return requiredFields.every(field => field in observation)
      })
    })
    .withMessage('Cada objeto de observación debe contener los campos requeridos'),

  body('observaciones.*.id_responsable')
    .notEmpty()
    .withMessage('El ID del responsable de la observación es obligatorio')
    .isString()
    .withMessage('El ID del responsable de la observación debe ser una cadena de texto'),

  body('observaciones.*.fecha')
    .notEmpty()
    .withMessage('La fecha de la observación es obligatoria')
    .isISO8601()
    .withMessage('El formato de fecha debe ser ISO 8601')
    .toDate(),

  body('observaciones.*.observacion')
    .notEmpty()
    .withMessage('La observación es obligatoria')
    .isString()
    .withMessage('La observación debe ser una cadena de texto'),

  body('observaciones.*.tipo')
    .notEmpty()
    .withMessage('El tipo de observación es obligatorio')
    .isInt()
    .withMessage('El tipo de observación debe ser un número entero'),
  body('areas_investigacion')
    .isArray()
    .optional()
    .custom(values => values.every(value => typeof value === 'string'))
    .withMessage('Cada id debe ser una cadena de texto'),
  body('habitats_a_cargo')
    .isArray()
    .optional()
    .custom(values => values.every(value => typeof value === 'string'))
    .withMessage('Cada id debe ser una cadena de texto'),
  body('estado')
    .notEmpty()
    .withMessage('El estado de contratacion de obligatorio')
    .isNumeric()
    .withMessage('El estado de contratacion de numerico')
]
