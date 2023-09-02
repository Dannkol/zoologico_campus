import { mongoConn, getDB } from '../config/connection.js'
import dotenv from 'dotenv'

dotenv.config()

const db = JSON.parse(process.env.DB)

export class Investigacion {
  static async initialize (database, collection = null) {
    this.client = await mongoConn()
    try {
      this.db = getDB(database)
      this.collection = this.db.collection(collection)
    } catch (error) {
      console.log(error.message)
    }
  }

  static async getInvestigaciones () {
    await this.initialize(db.ATLAS_DATABASE, 'areas_investigacion')
    try {
      const result = await this.collection.find({}).toArray()
      return result
    } catch (error) {
      console.error('error al traer las investigaciones' + error.message)
      throw Error('error al traer las investigaciones')
    }
  }

  static async createInvestigacion ({ object }) {
    await this.initialize(db.ATLAS_DATABASE, 'areas_investigacion')
    try {
      const { insertedId } = await this.collection.insertOne(object)

      return insertedId
    } catch (error) {
      console.error(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].details[0].details[0].propertiesNotSatisfied)
      throw Error('error al crear el area de investigacion')
    }
  }
}
