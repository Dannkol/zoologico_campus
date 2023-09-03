import { Router } from 'express'

import { AnimalController } from '../../controllers/AnimalController.js';


const routes = Router();

routes.get('/', AnimalController.getAllPublicAnimal);

export {routes}