import { Router } from 'express'

import { AnimalController } from '../../controllers/AnimalController.js';

import { createAniaml } from '../../middleware/middleware_Validate_Animal.js';

const routes = Router();

routes.get('/', AnimalController.getAllPublicAnimal);
routes.get('/admin', AnimalController.getAllAdminAnimal);
routes.post('/admin', createAniaml, AnimalController.createAnimal);


export {routes}