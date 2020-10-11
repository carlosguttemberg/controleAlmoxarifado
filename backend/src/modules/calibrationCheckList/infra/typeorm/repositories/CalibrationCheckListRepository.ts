import { getRepository, Repository } from 'typeorm';

import CalibrationCheckList from '@modules/calibrationCheckList/infra/typeorm/entities/CalibrationCheckList';

import ICreateCalibrationCheckListDTO from '@modules/calibrationCheckList/dtos/ICreateCalibrationCheckListDTO';

import IListCalibrationtCheckListDTO from '@modules/calibrationCheckList/dtos/IListCalibrationtCheckListDTO';
import ICalibrationCheckListRepository from '@modules/calibrationCheckList/repositories/ICalibrationCheckListRepository';

interface IFilters {
  checkListCalibration_id?: string;
  calibration_id?: string;
  status?: string;
}

class CalibrationCheckListRepository
  implements ICalibrationCheckListRepository {
  private ormRepository: Repository<CalibrationCheckList>;

  constructor() {
    this.ormRepository = getRepository(CalibrationCheckList);
  }

  public async create(
    calibrationData: ICreateCalibrationCheckListDTO,
  ): Promise<CalibrationCheckList> {
    const checkList = this.ormRepository.create(calibrationData);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async list({
    calibration_id,
    checkListCalibration_id,
    status,
  }: IListCalibrationtCheckListDTO): Promise<CalibrationCheckList[]> {
    const filters: IFilters[] = [];

    if (calibration_id) {
      filters.push({ calibration_id });
    }

    if (checkListCalibration_id) {
      filters.push({ checkListCalibration_id });
    }

    if (status) {
      filters.push({ status });
    }

    const checkList = await this.ormRepository.find({
      where: filters,
      relations: ['calibration', 'checkListCalibration'],
    });

    return checkList;
  }
}

export default CalibrationCheckListRepository;
