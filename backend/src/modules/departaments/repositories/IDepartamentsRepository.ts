import Group from '@modules/groups/infra/typeorm/entities/Group';

import ICreateDepartamentDTO from '@modules/departaments/dtos/ICreateDepartamentDTO';

export default interface IGroupsRepository {
  create(data: ICreateDepartamentDTO): Promise<Group>;
  list(data: ICreateDepartamentDTO): Promise<Group[]>;
}
