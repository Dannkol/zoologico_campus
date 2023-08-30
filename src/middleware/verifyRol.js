import jwt from 'jsonwebtoken'
import { mongoConn, getDB } from '../config/connection.js'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'

config('../../')

export const isAdmin = async (req, res, next) => {
  try {
    const connection = await mongoConn()
    const nameDb = JSON.parse(process.env.DB)
    const db = getDB(nameDb.ATLAS_DATABASE)
    const collection = db.collection('usuario')
    const { id } = req.user
    const _id = new ObjectId(id)
    const usuario = await collection.findOne({ _id })
    console.log(usuario)
  } catch (error) {
    console.log('errror middlearwe' + error.message)
  }
}
