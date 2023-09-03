import { Router } from 'express'
import { InvestigacionController } from '../../controllers/InvestigacionController.js'

export const routes = Router()

routes.get('/', InvestigacionController.getAllInvestigaciones)
