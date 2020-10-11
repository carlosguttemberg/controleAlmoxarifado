import { getRepository, Repository } from 'typeorm';

import Maintenance from '@modules/maintenances/infra/typeorm/entities/Maintenance';
import CheckListMaintenance from '@modules/checkListMaintenance/infra/typeorm/entities/CheckListMaintenance';
import MaintenanceCheckList from '@modules/maintenancesCheckList/infra/typeorm/entities/MaintenanceCheckList';
import ICreateMaintenancesDTO from '@modules/maintenances/dtos/ICreateMaintenancesDTO';

import IListMaintenancesDTO from '@modules/maintenances/dtos/IListMaintenancesDTO';
import IMaintenancesRepository from '@modules/maintenances/repositories/IMaintenancesRepository';

interface IFilters {
  maintenanceType_id?: string;
  employee_id?: string;
  equipament_id?: string;
  status?: string;
  date?: Date;
}

class MaintenancesRepository implements IMaintenancesRepository {
  private ormRepository: Repository<Maintenance>;

  constructor() {
    this.ormRepository = getRepository(Maintenance);
  }

  public async create(
    maintenanceData: ICreateMaintenancesDTO,
  ): Promise<Maintenance> {
    const checkListMaintenanceRepository = getRepository(CheckListMaintenance);
    const maintenanceCheckListRepository = getRepository(MaintenanceCheckList);

    const maintenanceCheckList: MaintenanceCheckList[] = [];

    const checkListMaintenances = await checkListMaintenanceRepository.find();

    const maintenance = this.ormRepository.create(maintenanceData);

    await this.ormRepository.save(maintenance);

    checkListMaintenances.forEach(checkListMaintenance => {
      maintenanceCheckList.push(
        maintenanceCheckListRepository.create({
          maintenance_id: maintenance.id,
          checkListMaintenance_id: checkListMaintenance.id,
        }),
      );
    });

    await maintenanceCheckListRepository.save(maintenanceCheckList);

    return maintenance;
  }

  public async list({
    maintenanceType_id,
    employee_id,
    equipament_id,
    status,
    date,
  }: IListMaintenancesDTO): Promise<Maintenance[]> {
    const filters: IFilters[] = [];

    if (maintenanceType_id) {
      filters.push({ maintenanceType_id });
    }

    if (employee_id) {
      filters.push({ employee_id });
    }

    if (equipament_id) {
      filters.push({ equipament_id });
    }

    if (status) {
      filters.push({ status });
    }

    if (date) {
      filters.push({ date });
    }

    const maintenances = await this.ormRepository.find({
      where: filters,
      relations: ['equipament', 'employee', 'maintenanceTypes'],
    });

    return maintenances;
  }
}

export default MaintenancesRepository;
