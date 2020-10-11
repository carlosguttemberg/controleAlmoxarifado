import Maintenance from '@modules/maintenances/infra/typeorm/entities/Maintenance';

import ICreateMaintenancesDTO from '@modules/maintenances/dtos/ICreateMaintenancesDTO';
import IListMaintenancesDTO from '@modules/maintenances/dtos/IListMaintenancesDTO';

export default interface IMaintenancesRepository {
  create(data: ICreateMaintenancesDTO): Promise<Maintenance>;
  list(data: IListMaintenancesDTO): Promise<Maintenance[]>;
}
