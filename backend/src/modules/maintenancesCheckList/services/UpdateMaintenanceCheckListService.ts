import MaintenanceCheckList from '@modules/maintenancesCheckList/infra/typeorm/entities/MaintenanceCheckList';

import { inject, injectable } from 'tsyringe';

import IUpdateMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/IUpdateMaintenanceCheckListDTO';
import IMaintenanceCheckListRepository from '@modules/maintenancesCheckList/repositories/IMaintenanceCheckListRepository';

@injectable()
class UpdateMaintenanceCheckListService {
  constructor(
    @inject('MaintenanceCheckListRepository')
    private maintenanceCheckListRepository: IMaintenanceCheckListRepository,
  ) {}

  public async execute({
    id,
    maintenance_id,
    status,
  }: IUpdateMaintenanceCheckListDTO): Promise<MaintenanceCheckList> {
    const calibrationCheckList = await this.maintenanceCheckListRepository.update(
      {
        id,
        maintenance_id,
        status,
      },
    );

    return calibrationCheckList;
  }
}

export default UpdateMaintenanceCheckListService;
