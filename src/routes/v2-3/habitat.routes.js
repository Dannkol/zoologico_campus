import { Router } from 'express'
import { createHabitat } from '../../middleware/middleware_validate_habitat.js'
import { HabitatController } from '../../controllers/HabitatController.js'
import passport from '../../middleware/passport-http-bearer.js'
import { rol } from '../../middleware/verifyRol.js'

export const routes = Router()

routes.get('/', [passport.authenticate('bearer', { session: false }), rol.verifyEmpleado], HabitatController.getAllHabitatsadmin)
routes.post('/createHabitat', createHabitat, HabitatController.createHabitat)
