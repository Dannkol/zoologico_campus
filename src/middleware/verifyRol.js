import jwt from 'jsonwebtoken'
import { mongoConn, getDB } from '../config/connection.js'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'

config('../../')

const verifyRole = (requiredRole) => async (req, res, next) => {
  const connection = await mongoConn();
  const nameDb = JSON.parse(process.env.DB);
  try {
    console.log(requiredRole);
    const db = getDB(nameDb.ATLAS_DATABASE);
    const collection = db.collection('usuario');
    const { id } = req.user;
    const _id = new ObjectId(id);
    const usuario = await collection.findOne({ _id });

    if ((usuario.rol !== requiredRole)) {
      res.status(400).json({ status: 400, message: 'no tiene permisos para acceder al recurso' });
    } else {
      let result = usuario.permisos.map(element => {
        let simbol = element.split('').shift()
        let number = element.split('').splice(1).join('')
        switch (simbol) {
          case '^':
            if ((parseFloat(req.get('accept-version')) >= parseFloat(number)) && (parseFloat(number) <= parseFloat(number.split('')[0]) + 1 + '.0')) {
              console.log("tiene permiso");
              return true
            }else{
              return false
            }
            break;
          case '~':
            if ((parseFloat(req.get('accept-version')) >= parseFloat(number)) && (parseFloat(number) <= parseFloat(number.split('')[0]) - 1 + '.0')) {
              console.log("tiene permiso");
              return true
            }else{
              return false
            }
            break;

          default:
            if (element === req.get('accept-version')) {
              console.log("tiene permiso");
              return true
            }else{
              return false
            }
            break;
        }
      });
      if (result.includes(true)) {
        next()
      }else{
        res.status(400).json({ status: 400, message: 'no tiene permisos para acceder al recurso' });
      }
      
    }



  } catch (error) {
    console.log('error middleware: ' + error.message);
  }
};

export const rol = {
  verifyAdmin: verifyRole(4),
  verifyEmpleado: verifyRole(2),
  verifyInvestigador: verifyRole(3),
  verifyVisitante: verifyRole(1)
}
