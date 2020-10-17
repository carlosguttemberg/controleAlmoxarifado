import { Router } from 'express';

import CalibrationCheckListController from '@modules/calibrationCheckList/infra/http/controllers/CalibrationCheckListController';

const checkListRouter = Router();
const calibrationCheckListController = new CalibrationCheckListController();

checkListRouter.post('/', calibrationCheckListController.create);
checkListRouter.get('/', calibrationCheckListController.list);
checkListRouter.patch('/', calibrationCheckListController.update);

export default checkListRouter;
