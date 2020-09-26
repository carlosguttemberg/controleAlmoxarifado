import Equipament from '@modules/equipaments/infra/typeorm/entities/Equipament';

import ICreateEquipamentDTO from '@modules/equipaments/dtos/ICreateEquipamentDTO';

export default interface IGroupsRepository {
  create(data: ICreateEquipamentDTO): Promise<Equipament>;
  list(data: ICreateEquipamentDTO): Promise<Equipament[]>;
}
