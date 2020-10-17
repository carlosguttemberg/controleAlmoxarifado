import { Router } from 'express';

import CalibrationsController from '@modules/calibrations/infra/http/controllers/CalibrationsController';

const calibrationRouter = Router();
const calibrationsController = new CalibrationsController();

calibrationRouter.post('/', calibrationsController.create);
calibrationRouter.get('/', calibrationsController.list);
calibrationRouter.patch('/', calibrationsController.update);

export default calibrationRouter;
