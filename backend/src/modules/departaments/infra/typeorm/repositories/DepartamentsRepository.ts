import { getRepository, Repository } from 'typeorm';

import Departament from '@modules/departaments/infra/typeorm/entities/Departament';
import ICreateDepartamentDTO from '@modules/departaments/dtos/ICreateDepartamentDTO';
import IDepartamentsDTO from '@modules/departaments/repositories/IDepartamentsRepository';

class DepartamentsRepository implements IDepartamentsDTO {
  private ormRepository: Repository<Departament>;

  constructor() {
    this.ormRepository = getRepository(Departament);
  }

  public async create(groupData: ICreateDepartamentDTO): Promise<Departament> {
    const departament = this.ormRepository.create(groupData);

    await this.ormRepository.save(departament);

    return departament;
  }

  public async list({ name }: ICreateDepartamentDTO): Promise<Departament[]> {
    let departaments = null;
    if (name) {
      departaments = await this.ormRepository.find({ where: { name } });
    } else {
      departaments = await this.ormRepository.find();
    }

    return departaments;
  }
}

export default DepartamentsRepository;
