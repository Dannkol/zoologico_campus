import { validationResult } from 'express-validator'
import { ObjectId } from 'mongodb'
import { Auth } from '../models/Auth.js'
import { encrypt } from '../helpers/handlebcrypt.js'

export class AuthController {
  static async manejadorRegistro (req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json(errors)
      const data = req.body
      const passwordHash = await encrypt(data.password)
      data.password = passwordHash
      const result = await Auth.manejadorRegistro({ usuario: data })
      res.status(201).json({ id: result, message: 'registrado correctamente' })
    } catch (error) {
      console.log('error en el controlador: ' + error.message)
      res.status(500).json({ error: error.message })
    }
  }

  static async inicioSesion (req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json(errors)
      const data = req.body
      const result = await Auth.manejadorInicioSesion({ usuario: data })
      if (typeof result === 'string') {
        res.status(400).json({ status: '400', message: result })
      }
      res.status(200).json({ status: '200', message: 'ha iniciado sesion correctamente', data: result })
    } catch (error) {
      console.log('erorrr controler' + error.message)
    }
  }
}
