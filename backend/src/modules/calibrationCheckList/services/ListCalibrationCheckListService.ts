import CalibrationCheckList from '@modules/calibrationCheckList/infra/typeorm/entities/CalibrationCheckList';

import { inject, injectable } from 'tsyringe';

import IListCalibrationtCheckListDTO from '@modules/calibrationCheckList/dtos/IListCalibrationtCheckListDTO';
import ICalibrationCheckListRepository from '@modules/calibrationCheckList/repositories/ICalibrationCheckListRepository';

@injectable()
class ListCalibrationCheckListService {
  constructor(
    @inject('CalibrationCheckListRepository')
    private calibrationCheckListRepository: ICalibrationCheckListRepository,
  ) {}

  public async execute({
    calibration_id,
    checkListCalibration_id,
    status,
  }: IListCalibrationtCheckListDTO): Promise<CalibrationCheckList[]> {
    const calibrationCheckList = await this.calibrationCheckListRepository.list(
      {
        calibration_id,
        checkListCalibration_id,
        status,
      },
    );

    return calibrationCheckList;
  }
}

export default ListCalibrationCheckListService;
