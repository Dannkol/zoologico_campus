import { validationResult } from 'express-validator'
import { Personal } from '../models/Personal.js'

export class PersonalController {
  static async getAllPersonal (req, res) {
    try {
      const result = await Personal.getPersonal()
      res.status(200).json({ message: 'personal', data: result })
    } catch (error) {
      console.log('error en el controlador: ' + error.message)
      res.status(500).json({ error: 'Error al traer los datos' })
    }
  }

  static async contratarPersonal (req, res) {
    try {
      const errors = validationResult(req)
      console.log(errors.errors)
      if (!errors.isEmpty()) return res.status(400).json(errors)
      const data = req.body
      const result = await Personal.createPersonal({ personal: data })
      res.status(200).json({ id: result, message: 'proceso de contratacion registrado correctamente' })
    } catch (error) {
      console.log('error en el controlador: ' + error.message)
      res.status(500).json({ error: 'Error al crear la habitat' })
    }
  }
}
