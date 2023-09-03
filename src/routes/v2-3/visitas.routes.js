import { Router } from 'express'

// MIDDLEWARE
import passport from '../../middleware/passport-http-bearer.js'
import { rol } from '../../middleware/verifyRol.js'

import { VisitaController } from '../../controllers/VisitantesController.js'
import { validarVisita } from '../../middleware/middleware_validate_visita.js'

const routes = Router()

routes.get('/eventos', [passport.authenticate('bearer', { session: false }), rol.verifyInvestigador] , VisitaController.getEventos)
routes.post('/',validarVisita , [passport.authenticate('bearer', { session: false }), rol.verifyAdmin] , VisitaController.visitaInvestigacion)



export { routes }