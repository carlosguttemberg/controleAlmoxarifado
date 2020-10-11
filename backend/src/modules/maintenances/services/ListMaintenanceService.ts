import Maintenance from '@modules/maintenances/infra/typeorm/entities/Maintenance';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IListMaintenancesDTO from '@modules/maintenances/dtos/IListMaintenancesDTO';
import IMaintenancesRepository from '@modules/maintenances/repositories/IMaintenancesRepository';

@injectable()
class ListMaintenanceService {
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
  }: IListMaintenancesDTO): Promise<Maintenance[]> {
    const maintenance = await this.maintenancesRepository.list({
      maintenanceType_id,
      employee_id,
      equipament_id,
      status,
      date,
    });

    return maintenance;
  }
}

export default ListMaintenanceService;
