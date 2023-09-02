import { Router } from 'express'
import { InvestigacionController } from '../../controllers/InvestigacionController.js'
import { validateAreaInvestigacion } from '../../middleware/middleware_validate_investigacion.js'

export const routes = Router()

routes.get('/', InvestigacionController.getAllInvestigaciones)
routes.post('/createInvestigacion', validateAreaInvestigacion, InvestigacionController.createInvestigacion)
