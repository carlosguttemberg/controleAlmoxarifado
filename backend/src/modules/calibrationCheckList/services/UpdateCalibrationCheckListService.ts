import CalibrationCheckList from '@modules/calibrationCheckList/infra/typeorm/entities/CalibrationCheckList';

import { inject, injectable } from 'tsyringe';

import IUpdateCalibrationCheckListDTO from '@modules/calibrationCheckList/dtos/IUpdateCalibrationCheckListDTO';
import ICalibrationCheckListRepository from '@modules/calibrationCheckList/repositories/ICalibrationCheckListRepository';

@injectable()
class UpdateCalibrationCheckListService {
  constructor(
    @inject('CalibrationCheckListRepository')
    private calibrationCheckListRepository: ICalibrationCheckListRepository,
  ) {}

  public async execute({
    calibration_id,
    id,
    status,
  }: IUpdateCalibrationCheckListDTO): Promise<CalibrationCheckList> {
    const calibrationCheckList = await this.calibrationCheckListRepository.update(
      {
        calibration_id,
        id,
        status,
      },
    );

    return calibrationCheckList;
  }
}

export default UpdateCalibrationCheckListService;
