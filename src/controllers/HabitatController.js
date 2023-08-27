import { Habitat } from '../models/Habitat.js'

export class HabitatController {
  static async getAllHabitats (req, res) {
    try {
      const result = await Habitat.getHabitats()
      res.status(200).json({ message: 'habitats', data: result })
    } catch (error) {
      console.log('error en el controlador: ' + error.message)
      res.status(500).json({ error: 'Error al traer los datos' })
    }
  }

  static async createHabitat (req, res) {
    try {
      const data = req.body
      const result = await Habitat.createHabitat({ habitat: data })
      res.status(200).json({ id: result, message: 'se registro correctamente' })
    } catch (error) {
      console.log('error en el controlador: ' + error.message)
      res.status(500).json({ error: 'Error al crear la habitat' })
    }
  }
}
