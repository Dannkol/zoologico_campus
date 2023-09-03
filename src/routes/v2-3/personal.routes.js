import { Router } from 'express'
import { PersonalController } from '../../controllers/PersonalController.js'
import { validarPersonal } from '../../middleware/middleware_validate_personal.js'
import { validarBajaPersonal } from '../../middleware/middlware_baja_personal.js'

import passport from '../../middleware/passport-http-bearer.js'
import { rol } from '../../middleware/verifyRol.js'

export const routes = Router()

routes.get('/', [passport.authenticate('bearer', { session: false }), rol.verifyAdmin], PersonalController.getAllPersonal)
routes.post('/contratarPersonal', [passport.authenticate('bearer', { session: false }), rol.verifyAdmin], validarPersonal, PersonalController.contratarPersonal)
routes.post('/darBajaPersonal', [passport.authenticate('bearer', { session: false }), rol.verifyAdmin], validarBajaPersonal, PersonalController.bajaPersonal)
