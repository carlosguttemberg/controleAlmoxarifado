import { Router } from 'express';

import employeesRouter from '@modules/employees/infra/http/routes/employees.routes';

const routes = Router();

routes.use('/employees', employeesRouter);

export default routes;
