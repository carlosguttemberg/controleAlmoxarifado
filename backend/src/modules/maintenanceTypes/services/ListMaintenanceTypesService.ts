import MaintenanceTypes from '@modules/maintenanceTypes/infra/typeorm/entities/MaintenanceTypes';

import { inject, injectable } from 'tsyringe';

import IMaintenanceTypesRepository from '@modules/maintenanceTypes/repositories/IMaintenanceTypesRepository';

interface IRequest {
  name: string;
}

@injectable()
class ListMaintenanceTypesService {
  constructor(
    @inject('MaintenanceTypesRepository')
    private maintenanceTypesRepository: IMaintenanceTypesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<MaintenanceTypes[]> {
    const maintenanceTypes = await this.maintenanceTypesRepository.list({
      name,
    });

    return maintenanceTypes;
  }
}

export default ListMaintenanceTypesService;
