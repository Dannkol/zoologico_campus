import dotenv from "dotenv";

import { mongoConn, getDB } from "../config/connection.js";

import { ObjectId } from "mongodb";

import { MongoClient } from "mongodb";

dotenv.config();

const db = JSON.parse(process.env.DB);

export class Animal {
  static async initialize(Db, collection = null) {
    this.clints = await mongoConn();
    try {
      this.db = getDB(Db);
      this.collection = this.db.collection(collection);
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllPublic() {
    await this.initialize(db.ATLAS_DATABASE, "animales");
    try {
      const projection = {
        projection: {
          "_id": 0,
          id_animal: "$_id",
          descripcion: {
            nombre: "$detalles.animal.nombre",
            especie: "$detalles.animal.especie",
            femilia: "$detalles.animal.femilia",
            genero: "$detalles.animal.genero",
            edad: "$detalles.animal.edad",
          },
          morfologia: {
            altura: "$detalles.animal.dimensiones.altura.valor",
            peso: "$detalles.animal.dimensiones.peso.valor",
          },
          origen: "$detalles.animal.origen"
        },
      };
      const filter = { "detalles.animal.estado": 1 };
      const query = await this.collection
        .find(filter, projection)
        .toArray();
      return query;
    } catch (error) {
      console.error(error);
    } finally {
      await this.clints.close();
    }
  }

  static async getAllAdmin() {
    await this.initialize(db.ATLAS_DATABASE, "animales");
    try {
      const projection = {

        $project: {
          "_id": 0,
          id_animal: "$_id",
          descripcion: {
            nombre: "$detalles.animal.nombre",
            especie: "$detalles.animal.especie",
            femilia: "$detalles.animal.femilia",
            genero: "$detalles.animal.genero",
            edad: "$detalles.animal.edad",
          },
          morfologia: {
            altura: "$detalles.animal.dimensiones.altura",
            peso: "$detalles.animal.dimensiones.peso",
          },
          origen: "$detalles.animal.origen",
          historial_medico: 1,
          historial_animal: 1,
          habitad_info: 1
        },
      };
      const filter = { $match: { "detalles.animal.estado": 1 } };
      const lookup = {
        $lookup: {
          from: "habitat",
          localField: "detalles.id_habitad",
          foreignField: "_id",
          as: "habitad_info"
        }
      }
      const query = await this.collection
        .aggregate([filter, lookup, projection])
        .toArray();
      return query;
    } catch (error) {
      console.error(error);
    } finally {
      await this.clints.close();
    }
  }

  static async createAnimal(data) {
    await this.initialize(db.ATLAS_DATABASE, "animales");
    try {
      console.log('crearAnimal');
      const query = await this.collection.insertOne(data);
      console.log(query);
      return {
        message:`Se insertro exitosamente`,
        data : data
      }
    } catch (error) {
      console.error(error.errInfo.details.schemaRulesNotSatisfied[0]);
    } finally {
      await this.clints.close();
    }
  }

  static async bajaAnimal(data) {
    await this.initialize(db.ATLAS_DATABASE, "bajas");
    try {
      const query_baja = await this.collection.insertOne(data);
      const query_animal = await this.collection.updateOne({ id: data.animal_id }, { $set: { "detalles.animal.estado": 0 } })
      console.log(query_baja);
      console.log(query_animal);
      return {
        message : `Se creo la baja exitosamente`,
        data : data
      }
    } catch (error) {
      console.error(error.errInfo.details);
    } finally {
      await this.clints.close();
    }
  }

  static async bajaAnimalDefeuncion(data) {
    await this.initialize(db.ATLAS_DATABASE, "bajas");
    try {

      const query_baja = await this.collection.insertOne(data);
      const query_animal = await this.collection.updateOne({ id: data.animal_id }, { $set: { "detalles.animal.estado": 0 } })
      console.log(query_baja);
      console.log(query_animal);
      return {
        message : `Se creo la baja exitosamente`
      }
    } catch (error) {
      console.error(error.errInfo.details);
      return {
        message : "error"
      }
    } finally {
      await this.clints.close();
    }
  }

  static async bajaAnimalDeDonacion(data) {
    await this.initialize(db.ATLAS_DATABASE, "bajas");
    try {

      const query_baja = await this.collection.insertOne(data);
      const query_animal = await this.collection.updateOne({ id: data.animal_id }, { $set: { "detalles.animal.estado": 0 } })
      console.log(query_baja);
      console.log(query_animal);
      return {
        message : `Se creo la baja exitosamente`
      }
    } catch (error) {
      console.error(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].details[0].propertiesNotSatisfied[0].details[0].propertiesNotSatisfied[0].details[0].propertiesNotSatisfied[0].details[0].propertiesNotSatisfied[0].details[0]);
      return {
        message : "error"
      }
    } finally {
      await this.clints.close();
    }
  }
}
