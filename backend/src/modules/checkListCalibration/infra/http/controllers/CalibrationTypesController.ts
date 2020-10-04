import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCheckListCalibrationService from '@modules/checkListCalibration/services/CreateCheckListCalibrationService';

import ListCheckListCalibrationService from '@modules/checkListCalibration/services/ListCheckListCalibrationService';

interface IParams {
  name: string;
}

interface IMyRequest extends Request {
  query: {
    name: string;
  };
}

export default class CalibrationTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCheckListCalibrationService = container.resolve(
      CreateCheckListCalibrationService,
    );

    const checkList = await createCheckListCalibrationService.execute({
      name,
    });

    return response.json(checkList);
  }

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const { name }: IParams = request.query;

    const listCheckListCalibration = container.resolve(
      ListCheckListCalibrationService,
    );

    const types = await listCheckListCalibration.execute({
      name,
    });

    return response.json(types);
  }
}
