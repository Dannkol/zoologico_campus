import { Router } from 'express'

import { VisitaController } from '../../controllers/VisitantesController.js'

const routes = Router()

routes.get('/eventos', VisitaController.getEventos)


export { routes }