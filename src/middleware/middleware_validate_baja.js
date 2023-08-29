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


const bajaAnimal = [
    body("animal")
        .notEmpty()
        .withMessage("El id del animal obligatorio")
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
    body('detalles.defuncion.analisis')
        .optional()
        .isArray()
        .withMessage('Analisis debe ser un array')
        .custom(async value => {
            if (value) {
                const promises = [];
                for (let i = 0; i < value.length; i++) {
                    promises.push(
                        findOne(value[i], "areas_investigacion")
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
        body('detalles.defuncion.fecha_inhumacion')
        .notEmpty()
        .withMessage('La fecha de inhumación es obligatoria')
        .isISO8601()
        .custom((value, { req }) => {
            const fechaBaja = new Date(req.body.fecha_baja);
            const fechaInhumacion = new Date(value);
            const seisMeses = new Date(fechaBaja);
            seisMeses.setMonth(fechaBaja.getMonth() + 6);
      
            if (fechaInhumacion > seisMeses) {
              throw new Error('La fecha de inhumación no debe ser más de 6 meses después de la fecha de baja');
            }
            return true;
          })
        .customSanitizer(value => new Date(value)),
    
]

export { bajaAnimal }