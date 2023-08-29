import { Router } from 'express'
import { PersonalController } from '../../controllers/PersonalController.js'
import { validarPersonal } from '../../middleware/middleware_validate_personal.js'
import { validarBajaPersonal } from '../../middleware/middlware_baja_personal.js'

export const routes = Router()

routes.get('/', PersonalController.getAllPersonal)
routes.post('/contratarPersonal', validarPersonal, PersonalController.contratarPersonal)
routes.post('/darBajaPersonal', validarBajaPersonal, PersonalController.bajaPersonal)
