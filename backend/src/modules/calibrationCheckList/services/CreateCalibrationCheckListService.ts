import CalibrationCheckList from '@modules/calibrationCheckList/infra/typeorm/entities/CalibrationCheckList';

import { inject, injectable } from 'tsyringe';

import ICreateCalibrationCheckListDTO from '@modules/calibrationCheckList/dtos/ICreateCalibrationCheckListDTO';
import ICalibrationCheckListRepository from '@modules/calibrationCheckList/repositories/ICalibrationCheckListRepository';

@injectable()
class CreateCalibrationCheckListService {
  constructor(
    @inject('CalibrationCheckListRepository')
    private calibrationCheckListRepository: ICalibrationCheckListRepository,
  ) {}

  public async execute({
    calibration_id,
    checkListCalibration_id,
  }: ICreateCalibrationCheckListDTO): Promise<CalibrationCheckList> {
    const calibrationCheckList = await this.calibrationCheckListRepository.create(
      {
        calibration_id,
        checkListCalibration_id,
      },
    );

    return calibrationCheckList;
  }
}

export default CreateCalibrationCheckListService;
