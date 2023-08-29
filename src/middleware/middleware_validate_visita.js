import { body } from 'express-validator'
import { ObjectId } from 'mongodb';

import { mongoConn , getDB } from '../config/connection.js';

/**
 * 
 * 
 {
    "tipo": 0,
    "nombre_evento": "Visita escolar",
    "detalle": {
      "institucion": "Escuela Primaria ABC",
      "responsables": [
        "64d1b044068a2499b7107068",
        "64d1b044068a2499b7107068"
      ],
      "fecha_inicio": "2023-08-01T00:00:00Z",
      "fecha_fin": "2023-08-02T00:00:00Z",
      "areas": [
        "64d1b044068a2499b7107068",
        "64d1b044068a2499b7107068"
      ],
      "observaciones": [
        {
          "responsable": "64d1b044068a2499b7107068",
          "observacion": "Los estudiantes mostraron mucho interés en los animales",
          "fecha": "2023-08-01T10:00:00Z"
        }
      ],
      "documentos": {
        "acta": {
          "fecha": "2023-08-01T00:00:00Z",
          "url": "https://ejemplo.com/acta",
          "doc_legal_institucion": "https://ejemplo.com/doc_legal"
        },
        "doc_visitantes": [
          {
            "nombre": "Estudiante 1",
            "edad": 12,
            "doc_id": "https://ejemplo.com/doc_estudiante1",
            "boleta": {
              "tipo": "escolar",
              "precio_boleta": 10
            },
            "padres": {
              "doc_padres": [
                "https://ejemplo.com/doc_padre1"
              ],
              "permiso": "https://ejemplo.com/permiso_estudiante1"
            },
            "permisos": [
              "https://ejemplo.com/permiso_estudiante1"
            ]
          }
        ]
      }
    },
    "investigaciones": [
      {
        "area": "64d1b044068a2499b7107068",
        "id_investigacion": [
          "64d1b044068a2499b7107068"
        ],
        "descripcion": "Investigación sobre hábitos alimenticios"
      }
    ],
    "plan": {
      "nombre": "Plan escolar",
      "actividades": [
        "Charla sobre animales",
        "Recorrido por el zoológico"
      ]
    },
    "precio_total": 100,
    "description": "Visita guiada para estudiantes de primaria"
  }
  
 * 
 */

const findOne = async (id, coll) => {
    const client = await mongoConn();
    try {
        const db = getDB("db_zoo_campus");
        const collection = db.collection(coll);
        const habitat = await collection.findOne({
            _id: new ObjectId(id),
        });
        return habitat;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const validarVisita = [
    body('nombre_evento').notEmpty().isString(),
    body('detalle.institucion').optional().notEmpty().isString(),
    body('detalle.responsables').notEmpty().isArray()
        .custom(async value => {
            if (value) {
                const promises = [];
                for (let i = 0; i < value.length; i++) {
                    promises.push(
                        findOne(value[i], "personal")
                    );
                }
                const results = await Promise.all(promises);
                // Verificar si todas las consultas a la base de datos fueron exitosas
                results.forEach((responsable) => {
                    if (!responsable) {
                        throw new Error("ID de responsable no válido");
                    }
                });
            }
        }),
    body('detalle.responsables.*').notEmpty().customSanitizer(value => new ObjectId(value)),
    body('detalle.fecha_inicio').optional().notEmpty().isISO8601().customSanitizer(value => new Date(value)),
    body('detalle.fecha_fin').optional().notEmpty().isISO8601().customSanitizer(value => new Date(value)),
    body('detalle.areas').optional().notEmpty().isArray()
    .custom(async value => {
        if (value) {
            const promises = [];
            for (let i = 0; i < value.length; i++) {
                promises.push(
                    findOne(value[i], "habitat")
                );
            }
            const results = await Promise.all(promises);
            // Verificar si todas las consultas a la base de datos fueron exitosas
            results.forEach((responsable) => {
                if (!responsable) {
                    throw new Error("ID de responsable no válido");
                }
            });
        }
    }),
    body('detalle.areas.*').optional().notEmpty().isString().customSanitizer(value => new ObjectId(value)),
    body('detalle.observaciones').optional().notEmpty().isArray(),
    body('detalle.observaciones.*.responsable').optional().notEmpty().isString()        
    .custom(async value => {
        if (value) {
            const promises = [];

            promises.push(
                findOne(value, "personal")
            );

            const results = await Promise.all(promises);
            // Verificar si todas las consultas a la base de datos fueron exitosas
            results.forEach((responsable) => {
                if (!responsable) {
                    throw new Error("ID de responsable no válido");
                }
            });
        }
    })
    .customSanitizer(value => new ObjectId(value)),
    body('detalle.observaciones.*.fecha').optional().notEmpty().isISO8601().customSanitizer(value => new Date(value)),
    body('detalle.documentos.acta.fecha').notEmpty().isISO8601().customSanitizer(value => new Date(value)),
    body('detalle.documentos.acta.url').notEmpty().isString(),
    body('detalle.documentos.acta.doc_legal_institucion').notEmpty().isString(),
    body('detalle.documentos.doc_visitantes').optional().isArray(),
    body('detalle.documentos.doc_visitantes.*.nombre').optional().isString(),
    body('detalle.documentos.doc_visitantes.*.edad').optional().isNumeric(),
    body('detalle.documentos.doc_visitantes.*.doc_id').optional().isString(),
    body('detalle.documentos.doc_visitantes.*.boleta.tipo').optional().isString(),
    body('detalle.documentos.doc_visitantes.*.boleta.precio_boleta').optional().isNumeric().customSanitizer(value => parseInt(value)),
    body('detalle.documentos.doc_visitantes.*.padres.doc_padres').optional().isArray(),
    body('detalle.documentos.doc_visitantes.*.padres.doc_padres.*').optional().isString(),
    body('detalle.documentos.doc_visitantes.*.padres.permiso').optional().isString(),
    body('detalle.documentos.doc_visitantes.*.permisos').optional().isArray(),
    body('detalle.documentos.doc_visitantes.*.permisos.*').optional().isString(),
    body('investigaciones').optional().isArray(),
    body('investigaciones.*.area').optional().isString()    
    .custom(async value => {
        if (value) {
            const promises = [];

            promises.push(
                findOne(value, "areas_investigacion")
            );

            const results = await Promise.all(promises);
            // Verificar si todas las consultas a la base de datos fueron exitosas
            results.forEach((responsable) => {
                if (!responsable) {
                    throw new Error("ID de area no válido");
                }
            });
        }
    })
    .customSanitizer(value => new ObjectId(value)),
    body('investigaciones.*.id_investigacion').optional().isArray(),
    body('investigaciones.*.id_investigacion.*').optional().isString()
    .custom(value => {
        try {
            return new ObjectId(value);
        } catch (error) {
            throw new Error("ID de investigacion no válido");
            
        }
    })
    .customSanitizer(value => new ObjectId(value)),
    body('investigaciones.*.descripcion').optional().isString(),
    body('plam').optional().isArray(),
    body('plan.nombre').optional().isString(),
    body('plan.actividades').optional().isArray(),
    body('plan.actividades.*').optional().isString(),
    body('precio_total').notEmpty().isNumeric().customSanitizer(value => parseInt(value)),
    body('description').notEmpty().isString()
]

export { validarVisita }