import { getRepository, Repository } from 'typeorm';

import CheckListCalibration from '@modules/checkListCalibration/infra/typeorm/entities/CheckListCalibration';

import ICreateCheckListCalibrationDTO from '@modules/checkListCalibration/dtos/ICreateCheckListCalibrationDTO';

import ICheckListCalibrationRepository from '@modules/checkListCalibration/repositories/ICheckListCalibrationRepository';

class CheckListCalibrationRepository
  implements ICheckListCalibrationRepository {
  private ormRepository: Repository<CheckListCalibration>;

  constructor() {
    this.ormRepository = getRepository(CheckListCalibration);
  }

  public async create(
    checkListData: ICreateCheckListCalibrationDTO,
  ): Promise<CheckListCalibration> {
    const checkListCalibration = this.ormRepository.create(checkListData);

    await this.ormRepository.save(checkListCalibration);

    return checkListCalibration;
  }

  public async list({
    name,
  }: ICreateCheckListCalibrationDTO): Promise<CheckListCalibration[]> {
    let checkListCalibration = null;
    if (name) {
      checkListCalibration = await this.ormRepository.find({ where: { name } });
    } else {
      checkListCalibration = await this.ormRepository.find();
    }

    return checkListCalibration;
  }
}

export default CheckListCalibrationRepository;
