import { getRepository, Repository } from 'typeorm';

import MaintenanceCheckList from '@modules/maintenancesCheckList/infra/typeorm/entities/MaintenanceCheckList';

import ICreateMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/ICreateMaintenanceCheckListDTO';

import IListMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/IListMaintenanceCheckListDTO';
import IMaintenanceCheckListRepository from '@modules/maintenancesCheckList/repositories/IMaintenanceCheckListRepository';
import IUpdateMaintenanceCheckListDTO from '@modules/maintenancesCheckList/dtos/IUpdateMaintenanceCheckListDTO';
import AppError from '@shared/errors/AppError';

interface IFilters {
  checkListMaintenance_id?: string;
  maintenance_id?: string;
  status?: string;
}

class MaintenanceCheckListRepository
  implements IMaintenanceCheckListRepository {
  private ormRepository: Repository<MaintenanceCheckList>;

  constructor() {
    this.ormRepository = getRepository(MaintenanceCheckList);
  }

  public async create(
    maintenanceData: ICreateMaintenanceCheckListDTO,
  ): Promise<MaintenanceCheckList> {
    const checkList = this.ormRepository.create(maintenanceData);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async list({
    checkListMaintenance_id,
    maintenance_id,
    status,
  }: IListMaintenanceCheckListDTO): Promise<MaintenanceCheckList[]> {
    const filters: IFilters[] = [];

    if (checkListMaintenance_id) {
      filters.push({ checkListMaintenance_id });
    }

    if (maintenance_id) {
      filters.push({ maintenance_id });
    }

    if (status) {
      filters.push({ status });
    }

    const checkList = await this.ormRepository.find({
      where: filters,
      relations: ['maintenance', 'checkListMaintenance'],
    });

    return checkList;
  }

  public async update({
    id,
    maintenance_id,
    status,
  }: IUpdateMaintenanceCheckListDTO): Promise<MaintenanceCheckList> {
    try {
      if (!status) throw new AppError('Informe um Status');
      if (!maintenance_id) throw new AppError('Informe uma manutenção');
      if (!id) throw new AppError('Informe uma opção');

      const checkList = await this.ormRepository.findOne(id);

      if (!checkList) throw new AppError('CheckList não encontrado');

      checkList.status = status;

      const updateCheckList = await this.ormRepository.save(checkList);

      return updateCheckList;
    } catch (error) {
      return error.message;
    }
  }
}

export default MaintenanceCheckListRepository;
