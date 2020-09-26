import Equipament from '@modules/equipaments/infra/typeorm/entities/Equipament';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IEquipamentsRepository from '@modules/equipaments/repositories/IEquipamentsRepository';

interface IRequest {
  name: string;
  code: string;
  group_id: string;
  subgroup_id: string;
  departament_id: string;
  value: number;
}

@injectable()
class CreateEquipamentService {
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
    value,
  }: IRequest): Promise<Equipament> {
    const equipament = await this.equipamentsRepository.create({
      code,
      departament_id,
      group_id,
      name,
      subgroup_id,
      value,
    });

    return equipament;
  }
}

export default CreateEquipamentService;
