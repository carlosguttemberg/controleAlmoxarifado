import Employee from '@modules/employees/infra/typeorm/entities/Employee';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';

interface IRequest {
  name: string;
  email: string;
  telphone: string;
  attribution: string;
}

@injectable()
class CreateEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute({
    email,
    attribution,
    name,
    telphone,
  }: IRequest): Promise<Employee> {
    const employee = await this.employeesRepository.create({
      email,
      attribution,
      name,
      telphone,
    });

    return employee;
  }
}

export default CreateEmployeeService;
