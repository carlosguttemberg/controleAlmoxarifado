import { getRepository, Repository } from 'typeorm';

import CalibrationTypes from '@modules/calibrationTypes/infra/typeorm/entities/CalibrationTypes';

import ICreateCalibrationTypesDTO from '@modules/calibrationTypes/dtos/ICreateCalibrationTypesDTO';

import ICalibrationTypesRepository from '@modules/calibrationTypes/repositories/ICalibrationTypesRepository';

class CalibrationTypesRepository implements ICalibrationTypesRepository {
  private ormRepository: Repository<CalibrationTypes>;

  constructor() {
    this.ormRepository = getRepository(CalibrationTypes);
  }

  public async create(
    typesData: ICreateCalibrationTypesDTO,
  ): Promise<CalibrationTypes> {
    const calibrationTypes = this.ormRepository.create(typesData);

    await this.ormRepository.save(calibrationTypes);

    return calibrationTypes;
  }

  public async list({
    name,
  }: ICreateCalibrationTypesDTO): Promise<CalibrationTypes[]> {
    let subGroups = null;
    if (name) {
      subGroups = await this.ormRepository.find({ where: { name } });
    } else {
      subGroups = await this.ormRepository.find();
    }

    return subGroups;
  }
}

export default CalibrationTypesRepository;
