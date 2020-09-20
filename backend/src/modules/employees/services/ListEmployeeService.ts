import Employee from '@modules/employees/infra/typeorm/entities/Employee';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';

interface IRequest {
  name: string;
  email: string;
  attribution: string;
}

@injectable()
class ListEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute({
    email,
    attribution,
    name,
  }: IRequest): Promise<Employee[]> {
    const employee = await this.employeesRepository.list({
      email,
      attribution,
      name,
    });

    return employee;
  }
}

export default ListEmployeeService;
