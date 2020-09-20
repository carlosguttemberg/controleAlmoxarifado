import SubGroup from '@modules/subGroups/infra/typeorm/entities/SubGroup';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import ISubGroupsRepository from '@modules/subGroups/repositories/ISubGroupsRepository';

interface IRequest {
  name: string;
}

@injectable()
class ListSubGroupService {
  constructor(
    @inject('SubGroupsRepository')
    private subGroupsRepository: ISubGroupsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<SubGroup[]> {
    const subGroups = await this.subGroupsRepository.list({
      name,
    });

    return subGroups;
  }
}

export default ListSubGroupService;
