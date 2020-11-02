import Maintenance from '@modules/maintenances/infra/typeorm/entities/Maintenance';

import ICreateMaintenancesDTO from '@modules/maintenances/dtos/ICreateMaintenancesDTO';
import IListMaintenancesDTO from '@modules/maintenances/dtos/IListMaintenancesDTO';
import IUpdateMaintenancesDTO from '@modules/maintenances/dtos/IUpdateMaintenancesDTO';

export default interface IMaintenancesRepository {
  create(data: ICreateMaintenancesDTO): Promise<Maintenance>;
  list(data: IListMaintenancesDTO): Promise<Maintenance[]>;
  update(data: IUpdateMaintenancesDTO): Promise<Maintenance>;
  generateGraphic(data: IListMaintenancesDTO): Promise<Maintenance[]>;
  generateGraphicTypes(data: IListMaintenancesDTO): Promise<Maintenance[]>;
  generateGraphicDepartament(
    data: IListMaintenancesDTO,
  ): Promise<Maintenance[]>;
  generateGraphicStatus(data: IListMaintenancesDTO): Promise<Maintenance[]>;
  generateGraphicTotals(data: IListMaintenancesDTO): Promise<Maintenance[]>;
}
