import { getRepository, Repository } from 'typeorm';

import Group from '@modules/groups/infra/typeorm/entities/Group';
import ICreateGroupDTO from '@modules/groups/dtos/ICreateGroupDTO';
import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';

class GroupsRepository implements IGroupsRepository {
  private ormRepository: Repository<Group>;

  constructor() {
    this.ormRepository = getRepository(Group);
  }

  public async create(groupData: ICreateGroupDTO): Promise<Group> {
    const group = this.ormRepository.create(groupData);

    await this.ormRepository.save(group);

    return group;
  }

  public async list({ name }: ICreateGroupDTO): Promise<Group[]> {
    let groups = null;
    if (name) {
      groups = await this.ormRepository.find({ where: { name } });
    } else {
      groups = await this.ormRepository.find();
    }

    return groups;
  }
}

export default GroupsRepository;
