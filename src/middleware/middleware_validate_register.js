import { body } from 'express-validator'
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
  } finally {
    await client.close();
  }
};


export const validateInfo = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .matches(/^[a-zA-Z ]+$/, 'g')
    .withMessage('El nombre solo puede contener letras y espacios'),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isString()
    .withMessage('La contraseña debe ser una cadena de texto'),

  body('rol')
    .isNumeric()
    .withMessage('El rol es obligatorio'),
  body('permisos')
    .isArray()
    .optional(),
    body("personal")
      .optional()
      .custom(async (value) => {

        const result = await findOne(value, "personal");
        if (!result) {
            throw new Error("personal no encontrado");
        }

    })
    .customSanitizer(value => {
        try {
            return new ObjectId(value)
        } catch (error) {
            return 'NULL'
        }
    }),


]
