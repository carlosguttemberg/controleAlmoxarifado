import { Router } from 'express';

import MaintenanceTypesController from '@modules/maintenanceTypes/infra/http/controllers/MaintenanceTypesController';

const maintenanceTypesRouter = Router();
const maintenanceTypesController = new MaintenanceTypesController();

maintenanceTypesRouter.post('/', maintenanceTypesController.create);
maintenanceTypesRouter.get('/', maintenanceTypesController.list);

export default maintenanceTypesRouter;
