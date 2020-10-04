import { Router } from 'express';

import CalibrationTypesController from '@modules/checkListCalibration/infra/http/controllers/CalibrationTypesController';

const checkListCalibrationRouter = Router();
const checkListCalibrationController = new CalibrationTypesController();

checkListCalibrationRouter.post('/', checkListCalibrationController.create);
checkListCalibrationRouter.get('/', checkListCalibrationController.list);

export default checkListCalibrationRouter;
