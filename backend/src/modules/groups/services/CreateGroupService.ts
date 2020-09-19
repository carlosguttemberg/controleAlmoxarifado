import Group from '@modules/groups/infra/typeorm/entities/Group';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository'; // '@modules/employees/repositories/IEmployeesRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Group> {
    const group = await this.groupsRepository.create({
      name,
    });

    return group;
  }
}

export default CreateGroupService;
