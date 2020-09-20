import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateSubGroupService from '@modules/subGroups/services/CreateSubGroupService';

import ListSubGroupService from '@modules/subGroups/services/ListSubGroupService';

interface IParams {
  name: string;
}

interface IMyRequest extends Request {
  query: {
    name: string;
  };
}

export default class SubGroupsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createSubGroup = container.resolve(CreateSubGroupService);

    const subGroup = await createSubGroup.execute({
      name,
    });

    return response.json(subGroup);
  }

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const { name }: IParams = request.query;

    const listSubGroup = container.resolve(ListSubGroupService);

    const subGroups = await listSubGroup.execute({
      name,
    });

    return response.json(subGroups);
  }
}
