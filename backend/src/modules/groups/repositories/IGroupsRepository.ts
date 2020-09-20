import Group from '@modules/groups/infra/typeorm/entities/Group';

import ICreateGroupDTO from '@modules/groups/dtos/ICreateGroupDTO';

export default interface IGroupsRepository {
  create(data: ICreateGroupDTO): Promise<Group>;
  list(data: ICreateGroupDTO): Promise<Group[]>;
}
