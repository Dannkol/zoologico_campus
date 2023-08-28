import { Router } from 'express'
import { PersonalController } from '../../controllers/PersonalController.js'

export const routes = Router()

routes.get('/', PersonalController.getAllPersonal)
