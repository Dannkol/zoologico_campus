import { Router } from 'express'

import { HabitatController } from '../../controllers/HabitatController.js'

export const routes = Router()

routes.get('/', HabitatController.getAllHabitats)
