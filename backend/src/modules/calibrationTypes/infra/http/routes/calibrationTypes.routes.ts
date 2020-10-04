import { Router } from 'express';

// import MaintenanceTypesController from '@modules/maintenanceTypes/infra/http/controllers/MaintenanceTypesController';
import CalibrationTypesController from '@modules/calibrationTypes/infra/http/controllers/CalibrationTypesController';

const calibrationTypesRouter = Router();
const calibrationTypesController = new CalibrationTypesController();

calibrationTypesRouter.post('/', calibrationTypesController.create);
calibrationTypesRouter.get('/', calibrationTypesController.list);

export default calibrationTypesRouter;
