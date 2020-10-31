import Maintenance from '@modules/maintenances/infra/typeorm/entities/Maintenance';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IListMaintenancesDTO from '@modules/maintenances/dtos/IListMaintenancesDTO';
import IMaintenancesRepository from '@modules/maintenances/repositories/IMaintenancesRepository';

@injectable()
class GraphicCategoriesMaintenanceService {
  constructor(
    @inject('MaintenancesRepository')
    private maintenancesRepository: IMaintenancesRepository,
  ) {}

  public async execute({
    maintenanceType_id,
    employee_id,
    equipament_id,
    status,
    date,
    id,
    final_date,
  }: IListMaintenancesDTO): Promise<Maintenance[]> {
    const maintenance = await this.maintenancesRepository.generateGraphicTypes({
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
      id,
      final_date,
    });

    return maintenance;
  }
}

export default GraphicCategoriesMaintenanceService;
