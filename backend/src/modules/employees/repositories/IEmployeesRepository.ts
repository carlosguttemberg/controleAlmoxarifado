import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeesDTO';

export default interface IEmployeesRepository {
  create(data: ICreateEmployeeDTO): Promise<Employee>;
}
