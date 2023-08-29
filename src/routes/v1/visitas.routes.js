import { Router } from 'express'

import { VisitaController } from '../../controllers/VisitantesController.js'

import { validarVisita } from '../../middleware/middleware_validate_visita.js'

const routes = Router()

routes.get('/eventos', VisitaController.getEventos)
routes.post('/',validarVisita , VisitaController.visitaInvestigacion)



export { routes }