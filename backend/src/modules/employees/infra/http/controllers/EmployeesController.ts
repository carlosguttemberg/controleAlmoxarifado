import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';
import ListEmployeeService from '@modules/employees/services/ListEmployeeService';

interface IMyRequest extends Request {
  query: {
    name: string;
    email: string;
    attribution: string;
  };
}

interface IParams {
  name: string;
  email: string;
  attribution: string;
}

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

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const { name, email, attribution }: IParams = request.query;

    const listEmployee = container.resolve(ListEmployeeService);

    const employees = await listEmployee.execute({
      name,
      attribution,
      email,
    });

    return response.json(employees);
  }
}
