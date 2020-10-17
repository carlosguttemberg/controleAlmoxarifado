import MaintenanceCheckList from '@modules/maintenancesCheckList/infra/typeorm/entities/MaintenanceCheckList';

import ICreateMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/ICreateMaintenanceCheckListDTO';
import IListMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/IListMaintenanceCheckListDTO';
import IUpdateMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/IUpdateMaintenanceCheckListDTO';

export default interface IMaintenanceCheckListRepository {
  create(data: ICreateMaintenanceCheckListDTO): Promise<MaintenanceCheckList>;
  list(data: IListMaintenanceCheckListDTO): Promise<MaintenanceCheckList[]>;
  update(data: IUpdateMaintenanceCheckListDTO): Promise<MaintenanceCheckList>;
}
