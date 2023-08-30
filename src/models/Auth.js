import { mongoConn, getDB } from '../config/connection.js'
import { generateAccessToken } from '../helpers/jwt.js'
import { config } from 'dotenv'
import { compare } from '../helpers/handlebcrypt.js'

config()

const db = JSON.parse(process.env.DB)

export class Auth {
  static async initialize (Db, collection = null) {
    try {
      this.clints = await mongoConn()
      this.db = getDB(Db)
      this.collection = this.db.collection(collection)
    } catch (error) {
      console.error(error)
    }
  }

  static async manejadorRegistro ({ usuario }) {
    try {
      await this.initialize(db.ATLAS_DATABASE, 'usuario')
      const { insertedId } = await this.collection.insertOne(usuario)
      return insertedId
    } catch (error) {
      throw Error('error al crear el usuario')
    }
  }

  static async manejadorInicioSesion ({ usuario }) {
    try {
      await this.initialize(db.ATLAS_DATABASE, 'usuario')
      const { nombre, password } = usuario
      const result = await this.collection.findOne({ nombre })
      if (!result) return 'Usuario no encontrado'
      const checkPassword = await compare(password, result.password)

      if (!checkPassword) {
        return 'password Incorrect'
      }

      const token = generateAccessToken({ id: result._id })
      return { token }
    } catch (error) {
      console.log('error al crear el usuario' + error.message)
      throw Error('error al crear el usuario')
    }
  }
}
