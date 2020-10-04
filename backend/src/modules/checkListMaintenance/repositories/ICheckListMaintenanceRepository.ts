import CheckListMaintenance from '@modules/checkListMaintenance/infra/typeorm/entities/CheckListMaintenance';

import ICreateCheckListMaintenanceDTO from '@modules/checkListMaintenance/dtos/ICreateCheckListMaintenanceDTO';

export default interface ICheckListMaintenanceRepository {
  create(data: ICreateCheckListMaintenanceDTO): Promise<CheckListMaintenance>;
  list(data: ICreateCheckListMaintenanceDTO): Promise<CheckListMaintenance[]>;
}
