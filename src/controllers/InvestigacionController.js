import { validationResult } from 'express-validator'
import { Investigacion } from '../models/Investigacion.js'

export class InvestigacionController {
  static async getAllInvestigaciones (req, res) {
    try {
      const investigaciones = await Investigacion.getInvestigaciones()
      res.status(200).json({ status: 200, data: investigaciones })
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message })
    }
  }

  static async createInvestigacion (req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json(errors)
      const inv = req.body
      const result = await Investigacion.createInvestigacion({ object: inv })
      res.status(201).json({ message: 'se ha guardado correctamente', id: result })
    } catch (error) {
      console.log('erorr en el controaldo' + error.message)
      res.status(500).json({ status: 500, error: error.message })
    }
  }
}
