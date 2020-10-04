import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCheckListMaintenanceService from '@modules/checkListMaintenance/services/CreateCheckListMaintenanceService';

import ListCheckListMaintenanceService from '@modules/checkListMaintenance/services/ListCheckListMaintenanceService';

interface IParams {
  name: string;
}

interface IMyRequest extends Request {
  query: {
    name: string;
  };
}

export default class CheckListMaintenanceController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCheckListMaintenanceService = container.resolve(
      CreateCheckListMaintenanceService,
    );

    const checkList = await createCheckListMaintenanceService.execute({
      name,
    });

    return response.json(checkList);
  }

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const { name }: IParams = request.query;

    const listCheckListMaintenance = container.resolve(
      ListCheckListMaintenanceService,
    );

    const types = await listCheckListMaintenance.execute({
      name,
    });

    return response.json(types);
  }
}
