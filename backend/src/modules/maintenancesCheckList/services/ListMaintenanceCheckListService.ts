import MaintenanceCheckList from '@modules/maintenancesCheckList/infra/typeorm/entities/MaintenanceCheckList';

import { inject, injectable } from 'tsyringe';

import IListMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/IListMaintenanceCheckListDTO';
import IMaintenanceCheckListRepository from '@modules/maintenancesCheckList/repositories/IMaintenanceCheckListRepository';

@injectable()
class ListMaintenanceCheckListService {
  constructor(
    @inject('MaintenanceCheckListRepository')
    private maintenanceCheckListRepository: IMaintenanceCheckListRepository,
  ) {}

  public async execute({
    checkListMaintenance_id,
    maintenance_id,
    status,
  }: IListMaintenanceCheckListDTO): Promise<MaintenanceCheckList[]> {
    const maintenanceCheckList = await this.maintenanceCheckListRepository.list(
      {
        checkListMaintenance_id,
        maintenance_id,
        status,
      },
    );

    return maintenanceCheckList;
  }
}

export default ListMaintenanceCheckListService;
