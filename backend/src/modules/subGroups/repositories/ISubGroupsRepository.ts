import SubGroup from '@modules/subGroups/infra/typeorm/entities/SubGroup';

import ICreateSubGroupDTO from '@modules/subGroups/dtos/ICreateSubGroupDTO';

export default interface ISubGroupsRepository {
  create(data: ICreateSubGroupDTO): Promise<SubGroup>;
}
