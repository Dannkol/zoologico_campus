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
    
];

export { fugaAnimal };
