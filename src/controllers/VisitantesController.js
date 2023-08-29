import { Visitas } from "../models/visitas.js";

import { validationResult } from "express-validator";

import { ObjectId } from "mongodb";

/**
 * 
 * {
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


export class VisitaController extends Visitas {
    static async getEventos(req , res) {
      try {
        const eventos = await Visitas.getEventos();
        res.status(200).json(eventos);
      } catch (error) {
        res.status(500).json({
          message: error.message
        });
      }
    }
}