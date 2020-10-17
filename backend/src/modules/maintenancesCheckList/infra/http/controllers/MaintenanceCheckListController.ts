import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateMaintenanceCheckListService from '@modules/maintenancesCheckList/services/CreateMaintenanceCheckListService';
import ListMaintenanceCheckListService from '@modules/maintenancesCheckList/services/ListMaintenanceCheckListService';
import IListMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/IListMaintenanceCheckListDTO';
import IUpdateMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/IUpdateMaintenanceCheckListDTO';
import UpdateMaintenanceCheckListService from '@modules/maintenancesCheckList/services/UpdateMaintenanceCheckListService';

interface IMyRequest extends Request {
  query: {
    maintenance_id: string;
    checkListMaintenance_id: string;
    status: string;
  };
}

export default class MaintenanceCheckListController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { maintenance_id, checkListMaintenance_id } = request.body;

    const createMaintenanceCheckList = container.resolve(
      CreateMaintenanceCheckListService,
    );

    const checkList = await createMaintenanceCheckList.execute({
      maintenance_id,
      checkListMaintenance_id,
    });

    return response.json(checkList);
  }

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const {
      checkListMaintenance_id,
      maintenance_id,
      status,
    }: IListMaintenanceCheckListDTO = request.query;

    const listCheckList = container.resolve(ListMaintenanceCheckListService);

    const checkList = await listCheckList.execute({
      checkListMaintenance_id,
      maintenance_id,
      status,
    });

    return response.json(checkList);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
      maintenance_id,
      status,
    }: IUpdateMaintenanceCheckListDTO = request.body;

    const updateMaintenanceCheckList = container.resolve(
      UpdateMaintenanceCheckListService,
    );

    const checkList = await updateMaintenanceCheckList.execute({
      maintenance_id,
      id,
      status,
    });

    return response.json(checkList);
  }
}
