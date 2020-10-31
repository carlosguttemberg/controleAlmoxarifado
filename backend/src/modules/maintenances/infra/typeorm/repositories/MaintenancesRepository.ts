import { getRepository, Repository, Between } from 'typeorm';

import Maintenance from '@modules/maintenances/infra/typeorm/entities/Maintenance';
import CheckListMaintenance from '@modules/checkListMaintenance/infra/typeorm/entities/CheckListMaintenance';
import MaintenanceCheckList from '@modules/maintenancesCheckList/infra/typeorm/entities/MaintenanceCheckList';
import ICreateMaintenancesDTO from '@modules/maintenances/dtos/ICreateMaintenancesDTO';

import IListMaintenancesDTO from '@modules/maintenances/dtos/IListMaintenancesDTO';
import IUpdateMaintenancesDTO from '@modules/maintenances/dtos/IUpdateMaintenancesDTO';
import IMaintenancesRepository from '@modules/maintenances/repositories/IMaintenancesRepository';
import AppError from '@shared/errors/AppError';

interface IFilters {
  maintenanceType_id?: string;
  employee_id?: string;
  equipament_id?: string;
  status?: string;
  date?: Date;
  id?: string;
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
    id,
    final_date,
  }: IListMaintenancesDTO): Promise<Maintenance[]> {
    const filters: IFilters[] = [];

    if (date && final_date) {
      filters.push({ date: Between(date, final_date) });
    }

    if (id) {
      filters.push({ id });
    }

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

    const maintenances = await this.ormRepository.find({
      where: filters,
      relations: ['equipament', 'employee', 'maintenanceTypes'],
    });

    return maintenances;
  }

  public async update({
    id,
    status,
  }: IUpdateMaintenancesDTO): Promise<Maintenance> {
    try {
      if (!status) throw new AppError('Informe um Status');
      if (!id) throw new AppError('Informe uma manutenção');

      const maintenance = await this.ormRepository.findOne(id);

      if (!maintenance) throw new AppError('Manutenção não encontrada');

      maintenance.status = status;

      const updateMaintenance = await this.ormRepository.save(maintenance);

      return updateMaintenance;
    } catch (error) {
      return error.message;
    }
  }

  public async generateGraphic({
    maintenanceType_id,
    employee_id,
    equipament_id,
    status,
    date,
    id,
    final_date,
  }: IListMaintenancesDTO): Promise<Maintenance[]> {
    const maintenances = await this.ormRepository
      .createQueryBuilder('maintenances')
      .innerJoin('maintenances.equipament', 'equipaments')
      .innerJoin('equipaments.subgroup', 'subgroups')
      .select('subgroups.name', 'name')
      .addSelect('SUM(maintenances.value)', 'value')
      .addSelect('COUNT(*)', 'qtde')
      .groupBy('subgroups.name')
      .getRawMany();
    return maintenances;
  }

  public async generateGraphicTypes({
    maintenanceType_id,
    employee_id,
    equipament_id,
    status,
    date,
    id,
    final_date,
  }: IListMaintenancesDTO): Promise<Maintenance[]> {
    const maintenances = await this.ormRepository
      .createQueryBuilder('maintenances')
      .innerJoin('maintenances.maintenanceTypes', 'maintenanceTypes')
      .select('maintenanceTypes.name', 'name')
      .addSelect('SUM(maintenances.value)', 'value')
      .addSelect('COUNT(*)', 'qtde')
      .groupBy('maintenanceTypes.name')
      .getRawMany();
    return maintenances;
  }
}

export default MaintenancesRepository;
