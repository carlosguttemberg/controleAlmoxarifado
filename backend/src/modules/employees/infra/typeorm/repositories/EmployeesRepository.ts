import { getRepository, Repository } from 'typeorm';

import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import ICreateEmployeesDTO from '@modules/employees/dtos/ICreateEmployeesDTO';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';

interface IFilters {
  attribution?: string;
  email?: string;
  name?: string;
}

class EmployeesRepository implements IEmployeesRepository {
  private ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  public async create(employeeData: ICreateEmployeesDTO): Promise<Employee> {
    const user = this.ormRepository.create(employeeData);

    await this.ormRepository.save(user);

    return user;
  }

  public async list({
    attribution,
    email,
    name,
  }: ICreateEmployeesDTO): Promise<Employee[]> {
    const filters: IFilters[] = [];

    if (attribution) {
      filters.push({ attribution });
    }

    if (email) {
      filters.push({ email });
    }

    if (name) {
      filters.push({ name });
    }

    console.log(filters);
    const employees = await this.ormRepository.find({ where: filters });

    return employees;
  }
}

export default EmployeesRepository;
