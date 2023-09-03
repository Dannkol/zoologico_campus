import { body } from "express-validator";

// "tipo_adquisicion", "fecha_adquisicion", "detalles"

import { mongoConn, getDB } from "../config/connection.js";
import { ObjectId } from "mongodb";

const findEmployees = async (id) => {
  const client = await mongoConn();
  try {

    const db = getDB("db_zoo_campus");
    const collection = db.collection("personal");
    const responsable = await collection.findOne({
      _id: new ObjectId(id),
    });
    return responsable;
  } catch (error) {
    console.error('persona' ,error);
    return null;
  } finally {
    await client.close();
  }
};

const findHabitat = async (id) => {
  const client = await mongoConn();
  try {
    const db = getDB("db_zoo_campus");
    const collection = db.collection("habitat");
    const habitat = await collection.findOne({
      _id: new ObjectId(id),
    });
    console.log(habitat);
    return habitat;
  } catch (error) {
    console.error('habitas' ,error);
    return null;
  } finally {
    await client.close();
  }
};

const createAniaml = [
  body("tipo_adquisicion")
    .notEmpty()
    .withMessage("El tipo de aquisicion es obligatorio")
    .custom((value) => {
      console.log(value);
      if (!["regular", "decomiso", "compra", "donacion"].includes(value)) {
        throw new Error("Tipo de adquisicion no permitida");
      }else {
        return true;
      }
    }),
  body("fecha_adquisicion")
    .notEmpty()
    .withMessage("La fecha de aquisicion es obligatoria")
    .isISO8601()
    .withMessage("El formato de fecha tiene que ser año, mes y dia")
    .customSanitizer((value) => new Date(value)),
  body("detalles").notEmpty().withMessage("Detalles es obligatorio"),
  body("detalles.animal.nombre")
    .notEmpty()
    .withMessage("nombre del animal es obligatorio"),
  body("detalles.animal.dimensiones")
    .notEmpty()
    .withMessage("dimensiones del animal es obligatorio"),
  body("detalles.animal.edad")
    .notEmpty()
    .withMessage("edad del animal es obligatorio"),
  body("detalles.animal.estado")
    .notEmpty()
    .withMessage("estado del animal es obligatorio"),
  body("detalles.animal.historial_medico").custom(async (value) => {
    if (value) {
      const promises = [];
      for (const element of value) {
        let key = Object.keys(element);
        if (key.length === 3) {
          console.log(element.id_responsable);
          promises.push(findEmployees(element.id_responsable));
          Object.values(element).forEach((values) => {
            if (values === "") {
              throw new Error("El campo no puede estar vacío");
            }
          });
        } else {
          throw new Error("Hace falta un campo");
        }
      }

      const results = await Promise.all(promises);

      // Verificar si todas las consultas a la base de datos fueron exitosas
      results.forEach((responsable) => {
        if (!responsable) {
          throw new Error("ID de responsable no válido");
        }
      });
    }
    return true;
  }),
  body("detalles.animal.estado")
    .notEmpty()
    .withMessage("estado del animal es obligatorio"),
  body("detalles.animal.historial_animal").custom(async (value) => {
    if (value) {
      const promises = [];
      for (const element of value) {
        let key = Object.keys(element);
        if (key.length === 3) {
          console.log(element.id_responsable);
          promises.push(findEmployees(element.id_responsable));
          Object.values(element).forEach((values) => {
            if (values === "") {
              throw new Error("El campo no puede estar vacío");
            }
          });
        } else {
          throw new Error("Hace falta un campo");
        }
      }

      const results = await Promise.all(promises);

      // Verificar si todas las consultas a la base de datos fueron exitosas
      results.forEach((responsable) => {
        if (!responsable) {
          throw new Error("ID de responsable no válido");
        }
      });
    }
    return true;
  }),
  body("detalles.id_habitad")
    .notEmpty()
    .custom(async (value) => {
      const habitat = await findHabitat(value);
      if (!habitat) {
        throw new Error("habitat no encontrado");
      }
    }),
];

export { createAniaml };
