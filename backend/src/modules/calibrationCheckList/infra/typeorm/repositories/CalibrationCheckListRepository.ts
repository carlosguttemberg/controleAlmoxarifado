import { getRepository, Repository } from 'typeorm';

import CalibrationCheckList from '@modules/calibrationCheckList/infra/typeorm/entities/CalibrationCheckList';

import ICreateCalibrationCheckListDTO from '@modules/calibrationCheckList/dtos/ICreateCalibrationCheckListDTO';

import IListCalibrationtCheckListDTO from '@modules/calibrationCheckList/dtos/IListCalibrationtCheckListDTO';
import ICalibrationCheckListRepository from '@modules/calibrationCheckList/repositories/ICalibrationCheckListRepository';
import IUpdateCalibrationCheckListDTO from '@modules/calibrationCheckList/dtos/IUpdateCalibrationCheckListDTO';
import AppError from '@shared/errors/AppError';

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

  public async update({
    calibration_id,
    id,
    status,
  }: IUpdateCalibrationCheckListDTO): Promise<CalibrationCheckList> {
    try {
      if (!calibration_id) throw new AppError('Informe uma Calibração');
      if (!id) throw new AppError('Informe uma opção');

      const checkList = await this.ormRepository.findOne(id);

      if (!checkList) throw new AppError('Opção não encontrada');

      checkList.status = status;

      const checkListUpdate = await this.ormRepository.save(checkList);

      return checkListUpdate;
    } catch (error) {
      return error.message;
    }
  }
}

export default CalibrationCheckListRepository;
