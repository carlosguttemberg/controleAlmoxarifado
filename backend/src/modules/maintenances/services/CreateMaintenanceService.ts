import Maintenance from '@modules/maintenances/infra/typeorm/entities/Maintenance';

import { inject, injectable } from 'tsyringe';

import ICreateMaintenancesDTO from '@modules/maintenances/dtos/ICreateMaintenancesDTO';
import IMaintenancesRepository from '@modules/maintenances/repositories/IMaintenancesRepository';

import formatDateToAmerican from '@shared/Utils/formatDateToAmerican';

@injectable()
class CreateMaintenanceService {
  constructor(
    @inject('MaintenancesRepository')
    private maintenancesRepository: IMaintenancesRepository,
  ) {}

  public async execute({
    maintenanceType_id,
    employee_id,
    equipament_id,
    value,
    date,
  }: ICreateMaintenancesDTO): Promise<Maintenance> {
    const formatDate = formatDateToAmerican(date);

    const maintenance = await this.maintenancesRepository.create({
      maintenanceType_id,
      employee_id,
      equipament_id,
      value,
      date: formatDate,
    });

    return maintenance;
  }
}

export default CreateMaintenanceService;
