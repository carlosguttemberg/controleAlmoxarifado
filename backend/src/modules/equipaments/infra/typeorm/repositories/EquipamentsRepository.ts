import { getRepository, Repository } from 'typeorm';

import Equipament from '@modules/equipaments/infra/typeorm/entities/Equipament';
import ICreateEquipamentDTO from '@modules/equipaments/dtos/ICreateEquipamentDTO';
import IListEquipamentDTO from '@modules/equipaments/dtos/IListEquipamentDTO';
import IEquipamentsRepository from '@modules/equipaments/repositories/IEquipamentsRepository';

interface IFilters {
  name?: string;
  code?: string;
  departament_id?: string;
  group_id?: string;
  subgroup_id?: string;
}

class EquipamentsRepository implements IEquipamentsRepository {
  private ormRepository: Repository<Equipament>;

  constructor() {
    this.ormRepository = getRepository(Equipament);
  }

  public async create(
    equipamentData: ICreateEquipamentDTO,
  ): Promise<Equipament> {
    const equipament = this.ormRepository.create(equipamentData);

    await this.ormRepository.save(equipament);

    return equipament;
  }

  public async list({
    name,
    code,
    departament_id,
    group_id,
    subgroup_id,
  }: IListEquipamentDTO): Promise<Equipament[]> {
    const filters: IFilters[] = [];

    if (name) {
      filters.push({ name });
    }

    if (code) {
      filters.push({ code });
    }

    if (departament_id) {
      filters.push({ departament_id });
    }

    if (group_id) {
      filters.push({ group_id });
    }

    if (subgroup_id) {
      filters.push({ subgroup_id });
    }

    const equipaments = await this.ormRepository.find({
      where: filters,
      relations: ['group', 'subgroup', 'departament'],
    });

    return equipaments;
  }
}

export default EquipamentsRepository;
