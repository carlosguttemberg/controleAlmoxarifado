import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCalibrationService from '@modules/calibrations/services/CreateCalibrationService';
import ListCalibrationService from '@modules/calibrations/services/ListCalibrationService';
import IListCalibrationDTO from '@modules/calibrations/dtos/IListCalibrationDTO';
import UpdateCalibrationService from '@modules/calibrations/services/UpdateCalibrationService';
import GraphicCalibrationService from '@modules/calibrations/services/GraphicCalibrationService';
import GraphicTypesCalibrationService from '@modules/calibrations/services/GraphicTypesCalibrationService';

interface IMyRequest extends Request {
  query: {
    calibrationType_id: string;
    employee_id: string;
    equipament_id: string;
    status: string;
    date: any;
    final_date: any;
    id: string;
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
      id,
      final_date,
    }: IListCalibrationDTO = request.query;

    const listCalibration = container.resolve(ListCalibrationService);

    const calibrations = await listCalibration.execute({
      calibrationType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    });

    return response.json(calibrations);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, status } = request.body;

    const updateCalibration = container.resolve(UpdateCalibrationService);

    const calibration = await updateCalibration.execute({
      id,
      status,
    });

    return response.json(calibration);
  }

  public async generateGraphic(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const {
      calibrationType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    }: IListCalibrationDTO = request.query;

    const graphicMaintenanceService = container.resolve(
      GraphicCalibrationService,
    );

    const maintenances = await graphicMaintenanceService.execute({
      calibrationType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    });

    return response.json(maintenances);
  }

  public async generateGraphicTypes(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const {
      calibrationType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    }: IListCalibrationDTO = request.query;

    const graphicTypesMaintenanceService = container.resolve(
      GraphicTypesCalibrationService,
    );

    const maintenances = await graphicTypesMaintenanceService.execute({
      calibrationType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    });

    return response.json(maintenances);
  }
}
