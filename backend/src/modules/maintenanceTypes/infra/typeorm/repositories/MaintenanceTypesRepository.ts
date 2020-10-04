import { getRepository, Repository } from 'typeorm';

import MaintenanceTypes from '@modules/maintenanceTypes/infra/typeorm/entities/MaintenanceTypes';
import ICreateMaintenanceTypesDTO from '@modules/maintenanceTypes/dtos/ICreateMaintenanceTypesDTO';
// import ISubGroupsRepository from '@modules/subGroups/repositories/ISubGroupsRepository';
import IMaintenanceTypesRepository from '@modules/maintenanceTypes/repositories/IMaintenanceTypesRepository';

class MaintenanceTypesRepository implements IMaintenanceTypesRepository {
  private ormRepository: Repository<MaintenanceTypes>;

  constructor() {
    this.ormRepository = getRepository(MaintenanceTypes);
  }

  public async create(
    typesData: ICreateMaintenanceTypesDTO,
  ): Promise<MaintenanceTypes> {
    const maintenanceTypes = this.ormRepository.create(typesData);

    await this.ormRepository.save(maintenanceTypes);

    return maintenanceTypes;
  }

  public async list({
    name,
  }: ICreateMaintenanceTypesDTO): Promise<MaintenanceTypes[]> {
    let subGroups = null;
    if (name) {
      subGroups = await this.ormRepository.find({ where: { name } });
    } else {
      subGroups = await this.ormRepository.find();
    }

    return subGroups;
  }
}

export default MaintenanceTypesRepository;
