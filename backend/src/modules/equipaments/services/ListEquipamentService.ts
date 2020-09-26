import Equipament from '@modules/equipaments/infra/typeorm/entities/Equipament';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

// import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import IEquipamentsRepository from '@modules/equipaments/repositories/IEquipamentsRepository';

interface IRequest {
  name: string;
  code: string;
  group_id: string;
  subgroup_id: string;
  departament_id: string;
}

@injectable()
class ListEquipamentService {
  constructor(
    @inject('EquipamentsRepository')
    private equipamentsRepository: IEquipamentsRepository,
  ) {}

  public async execute({
    name,
    code,
    departament_id,
    group_id,
    subgroup_id,
  }: IRequest): Promise<Equipament[]> {
    const equipaments = await this.equipamentsRepository.list({
      name,
      code,
      departament_id,
      group_id,
      subgroup_id,
    });

    return equipaments;
  }
}

export default ListEquipamentService;
