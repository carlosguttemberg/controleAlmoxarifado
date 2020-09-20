import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateGroupService from '@modules/groups/services/CreateGroupService';
import ListGroupService from '@modules/groups/services/ListGroupService';

interface IParams {
  name: string;
}

interface IMyRequest extends Request {
  query: {
    name: string;
  };
}

export default class EmployeesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createGroup = container.resolve(CreateGroupService);

    const group = await createGroup.execute({
      name,
    });

    return response.json(group);
  }

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const { name }: IParams = request.query;

    const listGroup = container.resolve(ListGroupService);

    const group = await listGroup.execute({
      name,
    });

    return response.json(group);
  }
}
