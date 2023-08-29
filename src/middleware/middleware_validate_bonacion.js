import { body } from "express-validator";

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

const donacionAnimal = [
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
        .withMessage("El tipo de baja es obligatorio")
        .isNumeric()
        .withMessage("tipo debe ser un number del 1 al 2")
        .custom(value => {
            if (!(value == 2)) {
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
    body("detalles.donacion.carta")
        .notEmpty()
        .withMessage("La carta es obligatorio")
        .isString()
        .withMessage("El lugar debe ser un string"),
    body("detalles.donacion.estado")
        .notEmpty()
        .withMessage("El estado de la fuga es obligatorio")
        .isNumeric()
        .withMessage("el estado de la de la fuga debe ser un numero del 0 a 2")
        .custom(value => {
            if (!(value >= 0 && value < 3)) {
                throw new Error("Estado no valido");
            }
            return true;
        })
        .customSanitizer(value => parseInt(value)),
    body("detalles.donacion.acta.fecha")
        .notEmpty()
        .withMessage("la fecha del acta es obligatorio")
        .isISO8601()
        .withMessage("Tipo de fecha no valida")
        .customSanitizer(value => new Date(value)),
    body("detalles.donacion.acta.origen")
        .notEmpty()
        .withMessage("Es obligatorio el origen")
        .isString()
        .withMessage("Los origen deben ser un array"),
    body("detalles.donacion.acta.destino")
        .notEmpty()
        .withMessage("el destino es obligator")
        .isString()
        .withMessage("destino debe ser un string"),
    body("detalles.donacion.acta.observaciones")
        .optional()
        .isString()
        .withMessage("observaciones es un string"),
    body("detalles.donacion.acta.documentacion.act_del_estado")
        .notEmpty()
        .withMessage("los documentos acta del estado son obligator")
        .isString()
        .withMessage("Los documentos acta del estado ser un string"),
    body("detalles.donacion.acta.documentacion.doc_legal_origen")
        .notEmpty()
        .withMessage("los documentos de informacion legal del origen son obligator")
        .isString()
        .withMessage("Los documentos de informacion legal del origen debe ser un string"),
    body("detalles.donacion.acta.documentacion.doc_legal_destino")
        .notEmpty()
        .withMessage("los documentos de informacion legal del destino son obligator")
        .isString()
        .withMessage("Los documentos de informacion legal del destino debe ser un string"),
    body("detalles.donacion.acta.documentacion.docs_responsables")
        .notEmpty()
        .withMessage("los documentos de informacion legal del responsables son obligator")
        .isArray()
        .withMessage("Los documentos de informacion legal del responsables debe ser un string"),
    body("detalles.donacion.fecha_translado")
        .notEmpty()
        .withMessage("la fecha de translado es obligatoria")
        .isISO8601()
        .withMessage("fecha_translado no es un formato valido")
        .customSanitizer(value => new Date(value)),
    body("detalles.donacion.observaciones")
        .optional()
        .isArray()
        .withMessage("observaciones es un array"),
]

export { donacionAnimal };
