import MaintenanceTypes from '@modules/maintenanceTypes/infra/typeorm/entities/MaintenanceTypes';

import ICreateMaintenanceTypesDTO from '@modules/maintenanceTypes/dtos/ICreateMaintenanceTypesDTO';

export default interface IMaintenanceTypesRepository {
  create(data: ICreateMaintenanceTypesDTO): Promise<MaintenanceTypes>;
  list(data: ICreateMaintenanceTypesDTO): Promise<MaintenanceTypes[]>;
}
