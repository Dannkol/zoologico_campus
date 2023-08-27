import { body } from 'express-validator'

export const createHabitat = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto'),

  body('tipo_habitat')
    .notEmpty()
    .withMessage('El tipo de hábitat es obligatorio')
    .isString()
    .withMessage('El tipo de hábitat debe ser una cadena de texto'),

  body('descripcion_ambiente')
    .notEmpty()
    .withMessage('La descripción del ambiente es obligatoria')
    .isString()
    .withMessage('La descripción del ambiente debe ser una cadena de texto'),

  body('dimensiones.area')
    .notEmpty()
    .withMessage('El área de dimensiones es obligatorio')
    .isNumeric()
    .withMessage('El área debe ser un número'),

  body('dimensiones.volumen')
    .notEmpty()
    .withMessage('El volumen de dimensiones es obligatorio')
    .isNumeric()
    .withMessage('El volumen debe ser un número'),

  body('alimentacion.tipo')
    .notEmpty()
    .withMessage('El tipo de alimentación es obligatorio')
    .isString()
    .withMessage('El tipo de alimentación debe ser una cadena de texto'),

  body('alimentacion.descripcion')
    .notEmpty()
    .withMessage('La descripción de la alimentación es obligatoria')
    .isString()
    .withMessage('La descripción de la alimentación debe ser una cadena de texto'),
  body('enriquecimiento')
    .notEmpty()
    .withMessage('El enriquecimiento es obligatorio')
    .isString()
    .withMessage('El enriquecimiento debe ser una cadena de texto'),

  body('caracteristicas_ambientales.temperatura_promedio')
    .notEmpty()
    .withMessage('La temperatura promedio es obligatoria')
    .isNumeric()
    .withMessage('La temperatura promedio debe ser un número'),

  body('caracteristicas_ambientales.humedad_relativa')
    .notEmpty()
    .withMessage('La humedad relativa es obligatoria')
    .isNumeric()
    .withMessage('La humedad relativa debe ser un número'),

  body('caracteristicas_ambientales.tipo_sustrato')
    .notEmpty()
    .withMessage('El tipo de sustrato es obligatorio')
    .isString()
    .withMessage('El tipo de sustrato debe ser una cadena de texto'),

  body('caracteristicas_ambientales.vegetacion')
    .notEmpty()
    .withMessage('La vegetación es obligatoria')
    .isString()
    .withMessage('La vegetación debe ser una cadena de texto'),

  body('refugio_descanso')
    .notEmpty()
    .withMessage('El refugio de descanso es obligatorio')
    .isString()
    .withMessage('El refugio de descanso debe ser una cadena de texto'),

  body('instalaciones_equipos.elementos')
    .notEmpty()
    .withMessage('Los elementos de instalaciones son obligatorios')
    .isArray()
    .withMessage('Los elementos de instalaciones deben ser un arreglo'),

  body('instalaciones_equipos.equipos')
    .notEmpty()
    .withMessage('Los equipos de instalaciones son obligatorios')
    .isString()
    .withMessage('Los equipos de instalaciones deben ser una cadena de texto'),

  body('seguridad_barreras')
    .notEmpty()
    .withMessage('La seguridad y las barreras son obligatorias')
    .isString()
    .withMessage('La seguridad y las barreras deben ser una cadena de texto'),

  body('notas_observaciones')
    .notEmpty()
    .withMessage('Las notas y observaciones son obligatorias')
    .isString()
    .withMessage('Las notas y observaciones deben ser una cadena de texto')
]
