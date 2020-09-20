import Group from '@modules/groups/infra/typeorm/entities/Group';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';

interface IRequest {
  name: string;
}

@injectable()
class ListGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Group[]> {
    const groups = await this.groupsRepository.list({
      name,
    });

    return groups;
  }
}

export default ListGroupService;
