import { Animal } from "../models/Animal.js";

import { validationResult } from "express-validator";

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
    } catch (error) { }
  }

  static async getAllAdminAnimal(req, res) {
    try {
      const result = await Animal.getAllAdmin();
      res.status(200).json({
        message: "Animales para administration,m,m",
        data: result,
      });
    } catch (error) { }
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
              genero: req.body.detalles.animal.gerrorenero
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
        const result = await Animal.createAnimal(data)
        return res.json(result);
      }
      res.send({ errors: result.array()[0].msg });
    } catch (error) {
      console.error(error);
    } finally {
      res.end();
    }
  }

  /*   
    {
      id_animal : animal,
      tipo_baja: "Fuga",
      fecha_baja: ISODate("2023-08-10"),
      detalles: {
        fuga: {
          lugar: ObjectId("6122427c8b7d571850c3b2c3"),
          estado: 2,
          acta: {
            fecha: ISODate("2023-08-10"),
            responsables: [empleado3],
            documentacion: {
              doc_reporte_autoridades: "url_reporte_autoridades",
              doc_legal_zoo: "url_doc_legal",
              informe_opinion_publica: "url_informe_opinion",
            },
            observaciones: [],
          },
        },
      },
    }
  */
  static async PostBajaAnimalFuga(req, res) {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        const data = {
          id_animal: req.body.animal,
          tipo_baja: req.body.tipo,
          fecha_baja: req.body.fecha,
          detalles: {
            fuga: {
              lugar: req.body.detalles.fuga.lugar,
              estado: req.body.detalles.fuga.estado,
              acta: {
                fecha: req.body.detalles.fuga.acta.fecha,
                responsables: req.body.detalles.fuga.acta.responsables,
                documentacion: {
                  doc_reporte_autoridades: req.body.detalles.fuga.acta.documentacion.doc_reporte_autoridades,
                  doc_legal_zoo: req.body.detalles.fuga.acta.documentacion.doc_legal_zoo,
                  informe_opinion_publica: req.body.detalles.fuga.acta.documentacion.doc_reporte_autoridades,
                },
                observaciones: req.body.detalles.fuga.acta.observaciones
                .filter(data => data.fecha) 
                .map((data) => {
                  try {
                    return { fecha: new Date(data.fecha), detalle: data.detalle }
                  } catch (error) {
                    return { fecha: new Date(), detalle: data.detalle }
                  }
                })
              }
            },
          },
        };
        console.log(data.detalles.fuga.acta);
        const result = await Animal.bajaAnimal(data);
        return res.json(result);
      }
      res.send({ errors: result.array() });
    } catch (error) {
      console.error(error);
    } finally {
      res.end();
    }
  }

/*   
  {
    "animal_id": ObjectId("..."), 
    "tipo_baja": "defuncion", 
    "fecha_baja": ISODate("2023-08-18"),
    "detalles":  {
        "defuncion" : {
            "analisis" : [
                ObjectId("64d1b044068a2499b7107060"),
                ObjectId("66d1b0444335a299b7107060")
            ], 
            "fecha_inhumacion" : ISODate("2003-10-10T00:00:00")
        }
    }  
  } 
*/


  static async PostBajaAnimalDefuncion(req, res) {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {

        const data = {
          "id_animal": req.body.animal,
          "tipo_baja": req.body.tipo,
          "fecha_baja": req.body.fecha,
          "detalles": {
            "defuncion": {
              "analisis": req.body.detalles.defuncion.analisis,
              "fecha_inhumacion": req.body.detalles.defuncion.fecha_inhumacion
            }
          }
        }
        console.log(req.body.detalles);
        const query = await Animal.bajaAnimalDefeuncion(data)
        console.log(query);
        return res.status(200).json(query)
      }
      res.send({ errors: result.array()});
    } catch (error) {
      console.error(error);
    } finally {
      res.end()
    }
  }

/* 
  {
    id_animal: animal,
    tipo_baja: 1,
    fecha_baja: ISODate("2023-08-10"),
    detalles: {
      donacion: {
        carta: "url_carta",
        estado: 2,
        acta: {
          fecha: ISODate("2023-08-10"),
          origen: "universidad nacional",
          destino: "zoologico de new york",
          observaciones: "fasfsas",
          documentacion: {
            act_del_estado: "URL del documento del estado",
            doc_legal_origen: "URL del documento que permite la salida",
            doc_legal_destino: "URL del documento que permite la entrada",
            docs_responsables: ["URL del documento del estado"],
          },
        },
        fecha_translado: ISODate("2023-08-10"),
        estado: 1,
        observaciones: [
          {
            fecha: ISODate("2023-08-12"),
            detalle: "dsdsad",
          }
        ]
      },
    },
  } 
  */

  static async PostBajaAnimalDonacion(req , res){
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        const data = {
          id_animal: req.body.animal,
          tipo_baja: req.body.tipo,
          fecha_baja: req.body.fecha,
          detalles: {
            donacion: {
              carta: req.body.detalles.donacion.carta,
              acta: {
                fecha: req.body.detalles.donacion.acta.fecha,
                origen: req.body.detalles.donacion.acta.origen,
                destino: req.body.detalles.donacion.acta.destino,
                observaciones: req.body.detalles.donacion.acta.observaciones,
                documentacion: {
                  act_del_estado: req.body.detalles.donacion.acta.documentacion.act_del_estado,
                  doc_legal_origen: req.body.detalles.donacion.acta.documentacion.doc_legal_origen,
                  doc_legal_destino: req.body.detalles.donacion.acta.documentacion.doc_legal_destino,
                  docs_responsables: req.body.detalles.donacion.acta.documentacion.docs_responsables,
                },
              },
              fecha_translado: req.body.detalles.donacion.fecha_translado,
              estado: req.body.detalles.donacion.estado,
              observaciones: req.body.detalles.donacion.observaciones.filter(data => data.fecha) 
              .map((data) => {
                try {
                  return { fecha: new Date(data.fecha), detalle: data.detalle }
                } catch (error) {
                  return { fecha: new Date(), detalle: data.detalle }
                }
              })
            },
          },
        }

        console.log(data.detalles.donacion.acta);
        console.log(data.detalles.donacion);

        const query = await Animal.bajaAnimalDeDonacion(data)

        return res.status(200).json(query)
      }
      res.send({ errors: result.array()});
    } catch (error) {
      console.error(error);
    } finally {
      res.end()
    }
  }
}

