import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCalibrationService from '@modules/calibrations/services/CreateCalibrationService';
import ListCalibrationService from '@modules/calibrations/services/ListCalibrationService';
import IListCalibrationDTO from '@modules/calibrations/dtos/IListCalibrationDTO';

interface IMyRequest extends Request {
  query: {
    calibrationType_id: string;
    employee_id: string;
    equipament_id: string;
    status: string;
    date: any;
  };
}

export default class CalibrationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      calibrationType_id,
      employee_id,
      equipament_id,
      value,
      date,
    } = request.body;

    const createCalibration = container.resolve(CreateCalibrationService);

    const calibration = await createCalibration.execute({
      calibrationType_id,
      employee_id,
      equipament_id,
      value,
      date,
    });

    return response.json(calibration);
  }

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const {
      calibrationType_id,
      employee_id,
      equipament_id,
      status,
      date,
    }: IListCalibrationDTO = request.query;

    const listCalibration = container.resolve(ListCalibrationService);

    const calibrations = await listCalibration.execute({
      calibrationType_id,
      employee_id,
      equipament_id,
      status,
      date,
    });

    return response.json(calibrations);
  }
}
