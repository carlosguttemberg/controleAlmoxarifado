import { getRepository, Repository } from 'typeorm';

import CheckListMaintenance from '@modules/checkListMaintenance/infra/typeorm/entities/CheckListMaintenance';

import ICreateCheckListMaintenanceDTO from '@modules/checkListMaintenance/dtos/ICreateCheckListMaintenanceDTO';

import ICheckListMaintenanceRepository from '@modules/checkListMaintenance/repositories/ICheckListMaintenanceRepository';

class CheckListMaintenanceRepository
  implements ICheckListMaintenanceRepository {
  private ormRepository: Repository<CheckListMaintenance>;

  constructor() {
    this.ormRepository = getRepository(CheckListMaintenance);
  }

  public async create(
    checkListData: ICreateCheckListMaintenanceDTO,
  ): Promise<CheckListMaintenance> {
    const checkListMaintenance = this.ormRepository.create(checkListData);

    await this.ormRepository.save(checkListMaintenance);

    return checkListMaintenance;
  }

  public async list({
    name,
  }: ICreateCheckListMaintenanceDTO): Promise<CheckListMaintenance[]> {
    let checkListMaintenance = null;
    if (name) {
      checkListMaintenance = await this.ormRepository.find({ where: { name } });
    } else {
      checkListMaintenance = await this.ormRepository.find();
    }

    return checkListMaintenance;
  }
}

export default CheckListMaintenanceRepository;
