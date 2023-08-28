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
}
