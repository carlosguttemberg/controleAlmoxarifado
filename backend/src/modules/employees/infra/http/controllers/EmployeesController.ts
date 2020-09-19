import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';

export default class EmployeesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, attribution, telphone } = request.body;

    const createEmployee = container.resolve(CreateEmployeeService);

    const employee = await createEmployee.execute({
      name,
      email,
      attribution,
      telphone,
    });

    return response.json(employee);
  }
}
