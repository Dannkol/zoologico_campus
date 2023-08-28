import dotenv from 'dotenv'

import { mongoConn, getDB } from '../config/connection.js'

dotenv.config()

const db = JSON.parse(process.env.DB)
export class Personal {
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

  static async getPersonal () {
    await this.initialize(db.ATLAS_DATABASE, 'personal')
    try {
      const result = await this.collection.find({}, { projection: { _id: 1, nombre: 1, puesto: 1 } }).toArray()
      return result
    } catch (error) {
      console.error('error al traer el personal' + error.message)
      throw Error('error al traer el personal')
    } finally {
      await this.clints.close()
    }
  }
}
