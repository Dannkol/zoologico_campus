import { body } from "express-validator";

// "tipo_adquisicion", "fecha_adquisicion", "detalles"

import { mongoConn, getDB } from "../config/connection.js";
import { ObjectId } from 'mongodb';

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

const fugaAnimal = [
    body("animal")
        .notEmpty()
        .withMessage("El tipo de aquisicion es obligatorio")
        .isString()
        .custom(async (value) => {

            const result = await findOne(value, "animales");
            if (!result) {
                throw new Error("Animal no encontrado");
            }

        })
        .customSanitizer(value => {
            try {
                return new ObjectId(value)
            } catch (error) {
                return 'NULL'
            }
        }),
    body("tipo")
        .notEmpty()
        .withMessage("El tipo de aquisicion es baja es obligatorio")
        .isNumeric()
        .withMessage("tipo debe ser un number del 1 al 2")
        .custom(value => {
            if (!(value >= 0 && value < 3)) {
                throw new Error("Tipo de aquisicion no valido");
            }
            return true;
        })
        .customSanitizer(value => parseInt(value)),
    body("fecha")
        .notEmpty()
        .withMessage("La fecha debe ser obligatorio")
        .isISO8601()
        .withMessage("Tipo de fecha no valida")
        .customSanitizer(value => new Date(value)),
    body("detalles.fuga.lugar")
        .notEmpty()
        .withMessage("El lugar de la fuga es obligatorio")
        .isString()
        .withMessage("El lugar debe ser un string")
        .custom(async (value) => {
            console.log(value);
            const result = await findOne(value, "habitat");
            if (!result) {
                throw new Error("Lugar no encontrado");
            }

        })
        .customSanitizer(value => {
            try {
                return new ObjectId(value)
            } catch (error) {
                return 'NULL'
            }
        }),
    body("detalles.fuga.estado")
        .notEmpty()
        .withMessage("El estado de la fuga es obligatorio")
        .isNumeric()
        .withMessage("el estado de la de la fuga debe ser un numero del 0 a 2")
        .custom(value => {
            if (!(value >= 0 && value < 3)) {
                throw new Error("Estado de la fuga no valido");
            }
            return true;
        }),
    body("detalles.fuga.acta.fecha")
        .notEmpty()
        .withMessage("la fecha del acta es obligatorio")
        .isISO8601()
        .withMessage("Tipo de fecha no valida")
        .customSanitizer(value => new Date(value)),
    body("detalles.fuga.acta.responsables")
        .notEmpty()
        .withMessage("Es obligatorio los responsables")
        .isArray()
        .withMessage("Los responsables deben ser un array")
        .custom(async value => {
            if (value) {
                const promises = [];
                for (let i = 0; i < value.length; i++) {
                    promises.push(
                        findOne(value[i], "usuarios")
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
        })
        .customSanitizer(value => {
            try {
                return value.map(responsable => new ObjectId(responsable))
            } catch (error) {
                return 'NULL'
            }
        }),
    body("detalles.fuga.acta.documentacion.doc_reporte_autoridades")
        .notEmpty()
        .withMessage("los documentos de utoridades son obligator")
        .isString()
        .withMessage("Los documentos de utoridades deben ser un string"),
    body("detalles.fuga.acta.documentacion.doc_legal_zoo")
        .notEmpty()
        .withMessage("los documentos legales del zoo son obligator")
        .isString()
        .withMessage("Los documentos legales del zoo ser un string"),
    body("detalles.fuga.acta.documentacion.informe_opinion_publica")
        .notEmpty()
        .withMessage("los documentos de informacion a la opinion publica son obligator")
        .isString()
        .withMessage("Los documentos de informacion a la opinion publica ser un string"),
    body("detalles.fuga.acta.observaciones")
        .optional()
        .isArray()
        .withMessage("observaciones es un array"),
]   

export { fugaAnimal };
