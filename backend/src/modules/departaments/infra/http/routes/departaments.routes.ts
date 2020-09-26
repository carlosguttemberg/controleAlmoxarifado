import { Router } from 'express';

import DepartamentsController from '@modules/departaments/infra/http/controllers/DepartamentsController';

const departamentsRouter = Router();
const departamentsController = new DepartamentsController();

departamentsRouter.post('/', departamentsController.create);
departamentsRouter.get('/', departamentsController.list);

export default departamentsRouter;
