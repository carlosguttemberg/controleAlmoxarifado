import MaintenanceCheckList from '@modules/maintenancesCheckList/infra/typeorm/entities/MaintenanceCheckList';

import { inject, injectable } from 'tsyringe';

import ICreateMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/ICreateMaintenanceCheckListDTO';
import IMaintenanceCheckListRepository from '@modules/maintenancesCheckList/repositories/IMaintenanceCheckListRepository';

@injectable()
class CreateMaintenanceCheckListService {
  constructor(
    @inject('MaintenanceCheckListRepository')
    private maintenanceCheckListRepository: IMaintenanceCheckListRepository,
  ) {}

  public async execute({
    checkListMaintenance_id,
    maintenance_id,
  }: ICreateMaintenanceCheckListDTO): Promise<MaintenanceCheckList> {
    const calibrationCheckList = await this.maintenanceCheckListRepository.create(
      {
        checkListMaintenance_id,
        maintenance_id,
      },
    );

    return calibrationCheckList;
  }
}

export default CreateMaintenanceCheckListService;
