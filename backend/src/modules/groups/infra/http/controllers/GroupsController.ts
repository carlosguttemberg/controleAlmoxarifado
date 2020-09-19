import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateGroupService from '@modules/groups/services/CreateGroupService';

export default class EmployeesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createGroup = container.resolve(CreateGroupService);

    const group = await createGroup.execute({
      name,
    });

    return response.json(group);
  }
}
