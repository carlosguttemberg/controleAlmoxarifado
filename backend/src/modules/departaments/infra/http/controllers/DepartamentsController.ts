import { Request, Response } from 'express';

import { container } from 'tsyringe';

// import CreateGroupService from '@modules/groups/services/CreateGroupService';
import CreateDepartamentService from '@modules/departaments/services/CreateDepartamentService';
import ListDepartamentService from '@modules/departaments/services/ListDepartamentService';

interface IParams {
  name: string;
}

interface IMyRequest extends Request {
  query: {
    name: string;
  };
}

export default class DepartamentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createDepartament = container.resolve(CreateDepartamentService);

    const departament = await createDepartament.execute({
      name,
    });

    return response.json(departament);
  }

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const { name }: IParams = request.query;

    const listDepartament = container.resolve(ListDepartamentService);

    const departaments = await listDepartament.execute({
      name,
    });

    return response.json(departaments);
  }
}
