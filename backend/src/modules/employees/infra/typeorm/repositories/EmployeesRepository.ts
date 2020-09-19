import { getRepository, Repository } from 'typeorm';

import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import ICreateEmployeesDTO from '@modules/employees/dtos/ICreateEmployeesDTO';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';

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
}

export default EmployeesRepository;
