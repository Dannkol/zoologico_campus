import { validationResult } from 'express-validator'
import { Personal } from '../models/Personal.js'
import { ObjectId } from 'mongodb'

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
      if (!errors.isEmpty()) return res.status(400).json(errors)
      const data = req.body
      if (data.areas_investigacion && Array.isArray(data.areas_investigacion)) {
        data.areas_investigacion = data.areas_investigacion.map(id => new ObjectId(id))
      }

      if (data.habitats_a_cargo && Array.isArray(data.habitats_a_cargo)) {
        data.habitats_a_cargo = data.habitats_a_cargo.map(id => new ObjectId(id))
      }

      const result = await Personal.createPersonal({ personal: data })
      res.status(200).json({ id: result, message: 'proceso de contratacion registrado correctamente' })
    } catch (error) {
      console.log('error en el controlador: ' + error.message)
      res.status(500).json({ error: 'Error al crear la habitat' })
    }
  }

  static async bajaPersonal (req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json(errors)
      const data = req.body
      data.personal_id = new ObjectId(data.personal_id)
      const result = await Personal.bajaPersonal({ info: data })
      res.status(200).json({ id: result, message: 'proceso de baja del empleado fue hecho correctamente' })
    } catch (error) {
      console.log('error en el controlador: ' + error.message)
      res.status(500).json({ error: 'Error al dar de baja al empleado' })
    }
  }
}
