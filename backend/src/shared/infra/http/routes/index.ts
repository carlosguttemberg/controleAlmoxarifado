import { Router } from 'express';

import employeesRouter from '@modules/employees/infra/http/routes/employees.routes';
import groupsRouter from '@modules/groups/infra/http/routes/groups.routes';
import subGroupsRouter from '@modules/subGroups/infra/http/routes/subGroups.routes';
import departamentsRouter from '@modules/departaments/infra/http/routes/departaments.routes';

const routes = Router();

routes.use('/employees', employeesRouter);
routes.use('/groups', groupsRouter);
routes.use('/subGroups', subGroupsRouter);
routes.use('/departaments', departamentsRouter);

export default routes;
