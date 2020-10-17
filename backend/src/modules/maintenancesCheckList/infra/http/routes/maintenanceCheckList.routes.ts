import { Router } from 'express';

import MaintenanceCheckListController from '@modules/maintenancesCheckList/infra/http/controllers/MaintenanceCheckListController';

const checkListRouter = Router();
const maintenanceCheckListController = new MaintenanceCheckListController();

checkListRouter.post('/', maintenanceCheckListController.create);
checkListRouter.get('/', maintenanceCheckListController.list);
checkListRouter.patch('/', maintenanceCheckListController.update);

export default checkListRouter;
