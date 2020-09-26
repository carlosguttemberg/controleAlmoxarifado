import { Router } from 'express';

import EquipamentsController from '@modules/equipaments/infra/http/controllers/EquipamentsController';

const equipamentsRouter = Router();
const equipamentsController = new EquipamentsController();

equipamentsRouter.post('/', equipamentsController.create);
equipamentsRouter.get('/', equipamentsController.list);

export default equipamentsRouter;
