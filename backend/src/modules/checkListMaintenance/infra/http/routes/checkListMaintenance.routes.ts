import { Router } from 'express';

import CheckListMaintenanceController from '@modules/checkListMaintenance/infra/http/controllers/CheckListMaintenanceController';

const checkListMaintenanceRouter = Router();
const checkListMaintenanceController = new CheckListMaintenanceController();

checkListMaintenanceRouter.post('/', checkListMaintenanceController.create);
checkListMaintenanceRouter.get('/', checkListMaintenanceController.list);

export default checkListMaintenanceRouter;
