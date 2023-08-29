import { body } from 'express-validator'
import { mongoConn, getDB } from '../config/connection.js'
import { ObjectId } from 'mongodb'

const checkIfExits = async (ids, collectionName) => {
  const client = await mongoConn()
  try {
    const db = getDB('db_zoo_campus')
    const collection = db.collection(collectionName)

    // Se crea un nuevo array con las respuesta de cada findOne
    const idExistenceChecks = ids.map(async (id) => {
      const existingId = await collection.findOne({ _id: new ObjectId(id) })
      // Si el existingId no es null, significa que el ID existe en la colección, es decir es true de lo contrario false
      return existingId !== null
    })

    // usamos Promise.all para esperar que se completen todas las verificaciones
    const results = await Promise.all(idExistenceChecks)

    // despues de esperar verificamos que todos los id sean true si no false
    return results.every(result => result === true)
  } catch (error) {
    console.error(error)
    return false
  } finally {
    await client.close()
  }
}

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
    .custom(async (value) => {
      const valid = await checkIfExits(value, 'areas_investigacion')
      if (!valid) {
        throw Error('Algunos IDs en areas_investigacion no son válidos')
      }
    }),
  body('habitats_a_cargo')
    .isArray()
    .optional()
    .custom(async (value) => {
      const valid = await checkIfExits(value, 'habitat')

      if (!valid) {
        throw Error('Algunos IDs en habitats_a_cargo no son válidos')
      }
    }),
  body('estado')
    .notEmpty()
    .withMessage('El estado de contratacion de obligatorio')
    .isNumeric()
    .withMessage('El estado de contratacion de numerico')
]
