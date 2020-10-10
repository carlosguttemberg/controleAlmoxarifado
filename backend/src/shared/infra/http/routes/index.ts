import { Router } from 'express';

import employeesRouter from '@modules/employees/infra/http/routes/employees.routes';
import groupsRouter from '@modules/groups/infra/http/routes/groups.routes';
import subGroupsRouter from '@modules/subGroups/infra/http/routes/subGroups.routes';
import departamentsRouter from '@modules/departaments/infra/http/routes/departaments.routes';
import equipamentsRouter from '@modules/equipaments/infra/http/routes/equipaments.routes';
import maintenanceTypesRouter from '@modules/maintenanceTypes/infra/http/routes/maintenanceTypes.routes';
import calibrationTypesRouter from '@modules/calibrationTypes/infra/http/routes/calibrationTypes.routes';
import checkListCalibrationRouter from '@modules/checkListCalibration/infra/http/routes/checkListCalibration.routes';
import checkListMaintenanceRouter from '@modules/checkListMaintenance/infra/http/routes/checkListMaintenance.routes';
import calibrationsRouter from '@modules/calibrations/infra/http/routes/calibrations.routes';

const routes = Router();

routes.use('/employees', employeesRouter);
routes.use('/groups', groupsRouter);
routes.use('/subGroups', subGroupsRouter);
routes.use('/departaments', departamentsRouter);
routes.use('/equipaments', equipamentsRouter);
routes.use('/maintenanceTypes', maintenanceTypesRouter);
routes.use('/calibrationTypes', calibrationTypesRouter);
routes.use('/checkListCalibration', checkListCalibrationRouter);
routes.use('/checkListMaintenance', checkListMaintenanceRouter);
routes.use('/calibrations', calibrationsRouter);

export default routes;
