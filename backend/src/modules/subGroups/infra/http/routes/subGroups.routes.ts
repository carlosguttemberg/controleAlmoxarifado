import { Router } from 'express';

import SubGroupsController from '@modules/subGroups/infra/http/controllers/SubGroupsController';

const subGroupsRouter = Router();
const subGroupsController = new SubGroupsController();

subGroupsRouter.post('/', subGroupsController.create);

export default subGroupsRouter;
