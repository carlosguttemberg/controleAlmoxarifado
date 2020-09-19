import { Router } from 'express';

import employeesRouter from '@modules/employees/infra/http/routes/employees.routes';
import groupsRouter from '@modules/groups/infra/http/routes/groups.routes';
import subGroupsRouter from '@modules/subGroups/infra/http/routes/subGroups.routes';

const routes = Router();

routes.use('/employees', employeesRouter);
routes.use('/groups', groupsRouter);
routes.use('/subGroups', subGroupsRouter);

export default routes;
