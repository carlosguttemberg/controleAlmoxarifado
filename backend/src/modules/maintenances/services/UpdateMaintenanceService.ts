import Maintenance from '@modules/maintenances/infra/typeorm/entities/Maintenance';

import { inject, injectable } from 'tsyringe';

import IUpdateMaintenancesDTO from '@modules/maintenances/dtos/IUpdateMaintenancesDTO';
import IMaintenancesRepository from '@modules/maintenances/repositories/IMaintenancesRepository';

@injectable()
class CreateMaintenanceService {
  constructor(
    @inject('MaintenancesRepository')
    private maintenancesRepository: IMaintenancesRepository,
  ) {}

  public async execute({
    id,
    status,
  }: IUpdateMaintenancesDTO): Promise<Maintenance> {
    const maintenance = await this.maintenancesRepository.update({
      id,
      status,
    });

    return maintenance;
  }
}

export default CreateMaintenanceService;
