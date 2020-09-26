import Equipament from '@modules/equipaments/infra/typeorm/entities/Equipament';

import ICreateEquipamentDTO from '@modules/equipaments/dtos/ICreateEquipamentDTO';
import IListEquipamentDTO from '@modules/equipaments/dtos/IListEquipamentDTO';

export default interface IGroupsRepository {
  create(data: ICreateEquipamentDTO): Promise<Equipament>;
  list(data: IListEquipamentDTO): Promise<Equipament[]>;
}
