import { Router } from 'express';

import MaintenancesController from '@modules/maintenances/infra/http/controllers/MaintenancesController';

const maintenanceRouter = Router();
const maintenancesController = new MaintenancesController();

maintenanceRouter.post('/', maintenancesController.create);
maintenanceRouter.get('/', maintenancesController.list);
maintenanceRouter.patch('/', maintenancesController.update);
maintenanceRouter.get('/graphic', maintenancesController.generateGraphic);
maintenanceRouter.get(
  '/graphicTypes',
  maintenancesController.generateGraphicTypes,
);
maintenanceRouter.get(
  '/graphicDepartament',
  maintenancesController.generateGraphicDepartament,
);
maintenanceRouter.get(
  '/graphicStatus',
  maintenancesController.generateGraphicStatus,
);
maintenanceRouter.get(
  '/graphicTotals',
  maintenancesController.generateGraphicTotals,
);

export default maintenanceRouter;
