import MaintenanceCheckList from '@modules/maintenancesCheckList/infra/typeorm/entities/MaintenanceCheckList';

import ICreateMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/ICreateMaintenanceCheckListDTO';
import IListMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/IListMaintenanceCheckListDTO';

export default interface IMaintenanceCheckListRepository {
  create(data: ICreateMaintenanceCheckListDTO): Promise<MaintenanceCheckList>;
  list(data: IListMaintenanceCheckListDTO): Promise<MaintenanceCheckList[]>;
}
