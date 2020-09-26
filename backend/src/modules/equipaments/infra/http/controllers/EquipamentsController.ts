import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateEquipamentService from '@modules/equipaments/services/CreateEquipamentService';
import ListEquipamentService from '@modules/equipaments/services/ListEquipamentService';

interface IParams {
  name: string;
  code: string;
  departament_id: string;
  group_id: string;
  subgroup_id: string;
}

interface IMyRequest extends Request {
  query: {
    name: string;
    code: string;
    departament_id: string;
    group_id: string;
    subgroup_id: string;
  };
}

export default class GroupsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, code, group_id, subgroup_id, departament_id } = request.body;

    const createEquipament = container.resolve(CreateEquipamentService);

    const group = await createEquipament.execute({
      name,
      code,
      departament_id,
      group_id,
      subgroup_id,
    });

    return response.json(group);
  }

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const {
      name,
      code,
      departament_id,
      group_id,
      subgroup_id,
    }: IParams = request.query;

    const listEquipament = container.resolve(ListEquipamentService);

    const equipaments = await listEquipament.execute({
      name,
      code,
      departament_id,
      group_id,
      subgroup_id,
    });

    return response.json(equipaments);
  }
}
