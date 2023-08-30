import jwt from 'jsonwebtoken'
import { mongoConn, getDB } from '../config/connection.js'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'

config('../../')

const verifyRole = (requiredRole) => async (req, res, next) => {
  try {
    const connection = await mongoConn();
    const nameDb = JSON.parse(process.env.DB);
    const db = getDB(nameDb.ATLAS_DATABASE);
    const collection = db.collection('usuario');
    const { id } = req.user;
    const _id = new ObjectId(id);
    const usuario = await collection.findOne({ _id });

    if (usuario.rol === requiredRole) {
      console.log("tiene permiso");
      next();
    } else {
      res.status(400).json({ status: 400, message: 'no tiene permisos para acceder al recurso' });
    }
  } catch (error) {
    console.log('error middleware: ' + error.message);
  }
};

export const rol={
  verifyAdmin: verifyRole(4),
  verifyEmpleado:verifyRole(2),
  verifyInvestigador:verifyRole(3),
  verifyVisitante:verifyRole(1)
}
