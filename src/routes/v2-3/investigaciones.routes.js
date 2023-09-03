import { Router } from 'express'
import { InvestigacionController } from '../../controllers/InvestigacionController.js'
import { validateAreaInvestigacion } from '../../middleware/middleware_validate_investigacion.js'
import passport from '../../middleware/passport-http-bearer.js'
import { rol } from '../../middleware/verifyRol.js'

export const routes = Router()

routes.get('/', [passport.authenticate('bearer', { session: false }), rol.verifyInvestigador] ,InvestigacionController.getAllInvestigaciones)
routes.post('/createInvestigacion', [passport.authenticate('bearer', { session: false }), rol.verifyInvestigador] ,rol.verifyInvestigador , validateAreaInvestigacion, InvestigacionController.createInvestigacion)
