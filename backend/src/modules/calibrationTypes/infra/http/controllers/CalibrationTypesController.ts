import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCalibrationTypesService from '@modules/calibrationTypes/services/CreateCalibrationTypesService';

import ListCalibrationTypesService from '@modules/calibrationTypes/services/ListCalibrationTypesService';

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

    const createCalibrationTypesService = container.resolve(
      CreateCalibrationTypesService,
    );

    const types = await createCalibrationTypesService.execute({
      name,
    });

    return response.json(types);
  }

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const { name }: IParams = request.query;

    const listCalibrationTypes = container.resolve(ListCalibrationTypesService);

    const types = await listCalibrationTypes.execute({
      name,
    });

    return response.json(types);
  }
}
