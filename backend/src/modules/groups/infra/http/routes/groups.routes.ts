import { Router } from 'express';

import GroupsController from '@modules/groups/infra/http/controllers/GroupsController';

const groupsRouter = Router();
const groupsController = new GroupsController();

groupsRouter.post('/', groupsController.create);

export default groupsRouter;
