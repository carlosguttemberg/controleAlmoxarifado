import { getRepository, Repository } from 'typeorm';

import SubGroup from '@modules/subGroups/infra/typeorm/entities/SubGroup';
import ICreateSubGroupDTO from '@modules/subGroups/dtos/ICreateSubGroupDTO';
import ISubGroupsRepository from '@modules/subGroups/repositories/ISubGroupsRepository';

class GroupsRepository implements ISubGroupsRepository {
  private ormRepository: Repository<SubGroup>;

  constructor() {
    this.ormRepository = getRepository(SubGroup);
  }

  public async create(employeeData: ICreateSubGroupDTO): Promise<SubGroup> {
    const group = this.ormRepository.create(employeeData);

    await this.ormRepository.save(group);

    return group;
  }

  public async list({ name }: ICreateSubGroupDTO): Promise<SubGroup[]> {
    let subGroups = null;
    if (name) {
      subGroups = await this.ormRepository.find({ where: { name } });
    } else {
      subGroups = await this.ormRepository.find();
    }

    return subGroups;
  }
}

export default GroupsRepository;
