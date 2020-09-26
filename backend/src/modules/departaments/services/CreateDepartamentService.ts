import Departament from '@modules/departaments/infra/typeorm/entities/Departament';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IDepartamentsRepository from '@modules/departaments/repositories/IDepartamentsRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateDepartamentService {
  constructor(
    @inject('DepartamentsRepository')
    private departamentsRepository: IDepartamentsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Departament> {
    const departament = await this.departamentsRepository.create({
      name,
    });

    return departament;
  }
}

export default CreateDepartamentService;
