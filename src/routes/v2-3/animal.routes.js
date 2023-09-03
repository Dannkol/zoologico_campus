import { Router } from 'express'

// MIDDLEWARE
import passport from '../../middleware/passport-http-bearer.js'
import { rol } from '../../middleware/verifyRol.js';

import { AnimalController } from '../../controllers/AnimalController.js';
import { createAniaml } from '../../middleware/middleware_Validate_Animal.js';
import { fugaAnimal } from '../../middleware/middleware_validate_fuga.js';
import { bajaAnimal } from '../../middleware/middleware_validate_baja.js';
import { donacionAnimal } from '../../middleware/middleware_validate_bonacion.js';


const routes = Router();

routes.get('/', [passport.authenticate('bearer', { session: false }), rol.verifyEmpleado], AnimalController.getAllAdminAnimal);
routes.post('/', [passport.authenticate('bearer', { session: false }), rol.verifyEmpleado], createAniaml, AnimalController.createAnimal);

routes.post('/admin/baja/fuga', [passport.authenticate('bearer', { session: false }), rol.verifyEmpleado], fugaAnimal, AnimalController.PostBajaAnimalFuga);
routes.post('/admin/baja/defuncion', [passport.authenticate('bearer', { session: false }), rol.verifyEmpleado], bajaAnimal, AnimalController.PostBajaAnimalDefuncion);
routes.post('/admin/baja/donacion', [passport.authenticate('bearer', { session: false }), rol.verifyEmpleado], donacionAnimal, AnimalController.PostBajaAnimalDonacion);


export { routes }