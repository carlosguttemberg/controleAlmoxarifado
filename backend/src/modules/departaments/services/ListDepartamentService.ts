import Departament from '@modules/departaments/infra/typeorm/entities/Departament';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IDepartamentsRepository from '@modules/departaments/repositories/IDepartamentsRepository';

interface IRequest {
  name: string;
}

@injectable()
class ListDepartamentService {
  constructor(
    @inject('DepartamentsRepository')
    private departamentsRepository: IDepartamentsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Departament[]> {
    const departaments = await this.departamentsRepository.list({
      name,
    });

    return departaments;
  }
}

export default ListDepartamentService;
