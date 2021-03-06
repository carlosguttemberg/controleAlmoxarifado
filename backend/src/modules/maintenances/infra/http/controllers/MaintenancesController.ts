import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateMaintenanceService from '@modules/maintenances/services/CreateMaintenanceService';
import UpdateMaintenanceService from '@modules/maintenances/services/UpdateMaintenanceService';
import ListMaintenanceService from '@modules/maintenances/services/ListMaintenanceService';
import GraphicMaintenanceService from '@modules/maintenances/services/GraphicMaintenanceService';
import GraphicTypesMaintenanceService from '@modules/maintenances/services/GraphicTypesMaintenanceService';
import IListMaintenancesDTO from '@modules/maintenances/dtos/IListMaintenancesDTO';
import IUpdateMaintenancesDTO from '@modules/maintenances/dtos/IUpdateMaintenancesDTO';
import GraphicMaintenanceDepartamentService from '@modules/maintenances/services/GraphicMaintenanceDepartamentService';
import GraphicMaintenanceStatusService from '@modules/maintenances/services/GraphicMaintenanceStatusService';
import GraphicMaintenanceTotalsService from '@modules/maintenances/services/GraphicMaintenanceTotalsService';

interface IMyRequest extends Request {
  query: {
    maintenanceType_id: string;
    employee_id: string;
    equipament_id: string;
    status: string;
    date: any;
    final_date: any;
    id: string;
  };
}

interface IRequestUpdate extends Request {
  query: {
    status: string;
    id: string;
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
      id,
      final_date,
    }: IListMaintenancesDTO = request.query;

    const listMaintenance = container.resolve(ListMaintenanceService);

    const maintenances = await listMaintenance.execute({
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    });

    return response.json(maintenances);
  }

  public async update(
    request: IRequestUpdate,
    response: Response,
  ): Promise<Response> {
    try {
      const { status, id }: IUpdateMaintenancesDTO = request.body;

      const updateMaintenance = container.resolve(UpdateMaintenanceService);

      const maintenance = await updateMaintenance.execute({
        status,
        id,
      });

      return response.json(maintenance);
    } catch (error) {
      return response.json(error);
    }
  }

  public async generateGraphic(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const {
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    }: IListMaintenancesDTO = request.query;

    const graphicMaintenanceService = container.resolve(
      GraphicMaintenanceService,
    );

    const maintenances = await graphicMaintenanceService.execute({
      maintenanceType_id,
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
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    }: IListMaintenancesDTO = request.query;

    const graphicTypesMaintenanceService = container.resolve(
      GraphicTypesMaintenanceService,
    );

    const maintenances = await graphicTypesMaintenanceService.execute({
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    });

    return response.json(maintenances);
  }

  public async generateGraphicDepartament(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const {
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    }: IListMaintenancesDTO = request.query;

    const graphicMaintenanceService = container.resolve(
      GraphicMaintenanceDepartamentService,
    );

    const maintenances = await graphicMaintenanceService.execute({
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    });

    return response.json(maintenances);
  }

  public async generateGraphicStatus(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const {
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    }: IListMaintenancesDTO = request.query;

    const graphicMaintenanceService = container.resolve(
      GraphicMaintenanceStatusService,
    );

    const maintenances = await graphicMaintenanceService.execute({
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    });

    return response.json(maintenances);
  }

  public async generateGraphicTotals(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const {
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    }: IListMaintenancesDTO = request.query;

    const graphicMaintenanceService = container.resolve(
      GraphicMaintenanceTotalsService,
    );

    const maintenances = await graphicMaintenanceService.execute({
      maintenanceType_id,
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
