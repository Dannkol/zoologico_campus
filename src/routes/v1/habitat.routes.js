import { Router } from 'express'
import { createHabitat } from '../../middleware/middleware_validate_habitat.js'
import { HabitatController } from '../../controllers/HabitatController.js'

export const routes = Router()

routes.get('/', HabitatController.getAllHabitats)
routes.post('/createHabitat', createHabitat, HabitatController.createHabitat)
