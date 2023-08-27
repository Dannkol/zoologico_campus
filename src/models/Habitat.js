import dotenv from 'dotenv'

import { mongoConn, getDB } from '../config/connection.js'

dotenv.config()

const db = JSON.parse(process.env.DB)

export class Habitat {
  static async initialize (Db, collection = null) {
    // inicia el cliente
    this.clints = await mongoConn()
    try {
      // almacena la base de datos en db
      this.db = getDB(Db)
      // alamcena la coleccion en this.collection
      this.collection = this.db.collection(collection)
    } catch (error) {
      console.error(error)
    }
  }

  static async getHabitats () {
    // llama la funcion y pasa como parametro la base de datos y el nombre de la collecion
    await this.initialize(db.ATLAS_DATABASE, 'habitat')
    try {
      const result = await this.collection.find({}, { projection: { _id: 1, nombre: 1 } }).toArray()
      return result
    } catch (error) {
      console.error('error al traer las habitast' + error.message)
      throw Error('error al traer las habitast')
    } finally {
      await this.clints.close()
    }
  }

  static async createHabitat ({ habitat }) {
    await this.initialize(db.ATLAS_DATABASE, 'habitat')
    try {
      const { insertedId } = await this.collection.insertOne(habitat)
      return insertedId
    } catch (error) {
      // console.error(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].details[0].propertiesNotSatisfied[0].details[0].propertiesNotSatisfied[0].details[0].details[0].propertiesNotSatisfied[0].details)
      throw Error('error al crear el habitat' + error.message)
    }
  }
}
