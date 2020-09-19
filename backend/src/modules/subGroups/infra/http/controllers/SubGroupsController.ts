import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateSubGroupService from '@modules/subGroups/services/CreateSubGroupService';

export default class EmployeesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createSubGroup = container.resolve(CreateSubGroupService);

    const subGroup = await createSubGroup.execute({
      name,
    });

    return response.json(subGroup);
  }
}
