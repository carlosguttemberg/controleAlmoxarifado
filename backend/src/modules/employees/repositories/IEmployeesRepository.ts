import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeesDTO';
import IListEmployeeDTO from '@modules/employees/dtos/IListEmployeesDTO';

export default interface IEmployeesRepository {
  create(data: ICreateEmployeeDTO): Promise<Employee>;
  list(data: IListEmployeeDTO): Promise<Employee[]>;
}
