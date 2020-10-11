import { Router } from 'express';

import MaintenancesController from '@modules/maintenances/infra/http/controllers/MaintenancesController';

const maintenanceRouter = Router();
const maintenancesController = new MaintenancesController();

maintenanceRouter.post('/', maintenancesController.create);
maintenanceRouter.get('/', maintenancesController.list);

export default maintenanceRouter;
