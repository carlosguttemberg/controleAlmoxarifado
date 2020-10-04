import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateMaintenanceTypesService from '@modules/maintenanceTypes/services/CreateMaintenanceTypesService';

import ListMaintenanceTypesService from '@modules/maintenanceTypes/services/ListMaintenanceTypesService';

interface IParams {
  name: string;
}

interface IMyRequest extends Request {
  query: {
    name: string;
  };
}

export default class MaintenanceTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createMaintenanceTypesService = container.resolve(
      CreateMaintenanceTypesService,
    );

    const types = await createMaintenanceTypesService.execute({
      name,
    });

    return response.json(types);
  }

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const { name }: IParams = request.query;

    const listMaintenanceTypes = container.resolve(ListMaintenanceTypesService);

    const types = await listMaintenanceTypes.execute({
      name,
    });

    return response.json(types);
  }
}
