import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateMaintenanceService from '@modules/maintenances/services/CreateMaintenanceService';
import ListMaintenanceService from '@modules/maintenances/services/ListMaintenanceService';
import IListMaintenancesDTO from '@modules/maintenances/dtos/IListMaintenancesDTO';

interface IMyRequest extends Request {
  query: {
    maintenanceType_id: string;
    employee_id: string;
    equipament_id: string;
    status: string;
    date: any;
  };
}

export default class MaintenancesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      maintenanceType_id,
      employee_id,
      equipament_id,
      value,
      date,
    } = request.body;

    const CreateMaintenance = container.resolve(CreateMaintenanceService);

    const maintenance = await CreateMaintenance.execute({
      maintenanceType_id,
      employee_id,
      equipament_id,
      value,
      date,
    });

    return response.json(maintenance);
  }

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const {
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
    }: IListMaintenancesDTO = request.query;

    const listMaintenance = container.resolve(ListMaintenanceService);

    const maintenances = await listMaintenance.execute({
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
    });

    return response.json(maintenances);
  }
}
