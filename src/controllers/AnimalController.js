import { Animal } from "../models/Animal.js";

import { body, validationResult } from "express-validator";

import { ObjectId } from "mongodb";


function convertIdsAndDates(obj) {
    if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            if (key.split('_')[0] === 'id') {
                obj[key] = new ObjectId(obj[key]);
            } else if (key === 'fecha' && typeof obj[key] === 'string') {
                obj[key] = new Date(obj[key]);
            } else if (typeof obj[key] === 'object') {
                convertIdsAndDates(obj[key]);
            }
        }
    }
}

export class AnimalController extends Animal {
  static async getAllPublicAnimal(req, res) {
    try {
      const result = await Animal.getAllPublic();
      res.status(200).json({
        message: "Animales al publico",
        data: result,
      });
    } catch (error) {}
  }

  static async getAllAdminAnimal(req, res) {
    try {
      const result = await Animal.getAllAdmin();
      res.status(200).json({
        message: "Animales para administration,m,m",
        data: result,
      });
    } catch (error) {}
  }

  //   {
  //     tipo_adquisicion: "Compra",
  //     fecha_adquisicion: ISODate("2023-08-20"),
  //     detalles: {
  //       descripcion: "Adquisición de un león",
  //       animal: {
  //         nombre: "Simba",
  //         especie: "León",
  //         familia: "Felidae",
  //         genero: "Panthera",
  //         edad: 3,
  //         dimensiones: {
  //           altura: { fecha: ISODate("2023-08-20"), valor: 120 },
  //           peso: { fecha: ISODate("2023-08-20"), valor: 180 },
  //         },
  //         historial_medico: [
  //           {
  //             id_responsable: empleado2,
  //             fecha: new Date(),
  //             observacion: "Examen médico inicial",
  //           },
  //         ],
  //         historial_animal: [
  //           {
  //             id_responsable: empleado1,
  //             fecha: new Date(),
  //             observacion: "Registro de llegada al zoológico",
  //           },
  //         ],
  //         origen: "Cautiverio",
  //         estado: 1,
  //       },
  //       id_habitad: idHabitaLeon,
  //     },
  //   }

  static async createAnimal(req, res) {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        const data = {
          tipo_adquisicion: req.body.tipo_adquisicion,
          fecha_adquisicion: req.body.fecha_adquisicion,
          detalles: {
            descripcion: req.body.descripcion ? req.body.descripcion : "",
            animal: {
              nombre: req.body.detalles.animal.nombre,
              especie: req.body.detalles.animal.especie
                ? req.body.detalles.animal.especie
                : "",
              familia: req.body.detalles.animal.familia
                ? req.body.detalles.animal.familia
                : "",
              genero: req.body.detalles.animal.genero
                ? req.body.detalles.animal.genero
                : "",
              edad: req.body.detalles.animal.edad,
              dimensiones: {
                altura: {
                  fecha: req.body.detalles.animal.dimensiones.altura.fecha
                    ? new Date(
                        req.body.detalles.animal.dimensiones.altura.fecha
                      )
                    : "",
                  valor: req.body.detalles.animal.dimensiones.altura.valor
                    ? req.body.detalles.animal.dimensiones.altura.valor
                    : ""
                },
                peso: {
                  fecha: req.body.detalles.animal.dimensiones.peso.fecha
                    ? new Date(req.body.detalles.animal.dimensiones.peso.fecha)
                    : "",
                  valor: req.body.detalles.animal.dimensiones.peso.valor
                    ? req.body.detalles.animal.dimensiones.peso.valor
                    : ""
                }
              },
              historial_medico: req.body.detalles.animal.historial_medico
              ? req.body.detalles.animal.historial_medico
              : [],
              historial_animal: req.body.detalles.animal.historial_animal
              ? req.body.detalles.animal.historial_animal
              : [],
              origen: req.body.detalles.animal.origen
              ? req.body.detalles.animal.origen
              : "",
              estado: req.body.detalles.animal.estado
              ? req.body.detalles.animal.estado
              : ""
            },
            id_habitad: req.body.detalles.id_habitad
          },
        };
        convertIdsAndDates(data);
        console.log(data.detalles.animal.historial_animal);
        const result = await Animal.createAnimal(data)
        return res.json(result);
      }
      res.send({ errors: result.array()[0].msg });
    } catch (error) {
      console.error(error);
    }
  }
}
