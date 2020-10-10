import Calibration from '@modules/calibrations/infra/typeorm/entities/Calibration';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IListCalibrationDTO from '@modules/calibrations/dtos/IListCalibrationDTO';
import ICalibrationsRepository from '@modules/calibrations/repositories/ICalibrationsRepository';

@injectable()
class ListCalibrationService {
  constructor(
    @inject('CalibrationsRepository')
    private calibrationsRepository: ICalibrationsRepository,
  ) {}

  public async execute({
    calibrationType_id,
    employee_id,
    equipament_id,
    status,
  }: IListCalibrationDTO): Promise<Calibration[]> {
    const calibration = await this.calibrationsRepository.list({
      calibrationType_id,
      employee_id,
      equipament_id,
      status,
    });

    return calibration;
  }
}

export default ListCalibrationService;
