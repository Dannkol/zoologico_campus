import { Router } from 'express'

import { AnimalController } from '../../controllers/AnimalController.js';

import { createAniaml } from '../../middleware/middleware_Validate_Animal.js';

import { fugaAnimal } from '../../middleware/middleware_validate_fuga.js';

import { bajaAnimal } from '../../middleware/middleware_validate_baja.js';

const routes = Router();

routes.get('/', AnimalController.getAllPublicAnimal);
routes.get('/admin', AnimalController.getAllAdminAnimal);
routes.post('/admin', createAniaml, AnimalController.createAnimal);

routes.post('/admin/baja/fuga', fugaAnimal , AnimalController.PostBajaAnimalFuga);

routes.post('/admin/baja/defuncion', bajaAnimal ,AnimalController.PostBajaAnimalDefuncion);


export {routes}