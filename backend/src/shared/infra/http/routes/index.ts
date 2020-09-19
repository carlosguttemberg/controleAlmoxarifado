import { Router } from 'express';

import employeesRouter from '@modules/employees/infra/http/routes/employees.routes';
import groupsRouter from '@modules/groups/infra/http/routes/groups.routes';

const routes = Router();

routes.use('/employees', employeesRouter);
routes.use('/groups', groupsRouter);

export default routes;
