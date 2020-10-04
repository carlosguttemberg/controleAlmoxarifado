import { Router } from 'express';

import CalibrationTypesController from '@modules/checkListCalibration/infra/http/controllers/CheckListCalibrationTypesController';

const checkListCalibrationRouter = Router();
const checkListCalibrationController = new CalibrationTypesController();

checkListCalibrationRouter.post('/', checkListCalibrationController.create);
checkListCalibrationRouter.get('/', checkListCalibrationController.list);

export default checkListCalibrationRouter;
