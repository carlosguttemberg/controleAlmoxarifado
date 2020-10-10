import Calibration from '@modules/calibrations/infra/typeorm/entities/Calibration';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import ICreateCalibrationDTO from '@modules/calibrations/dtos/ICreateCalibrationDTO';
import ICalibrationsRepository from '@modules/calibrations/repositories/ICalibrationsRepository';

@injectable()
class CreateCalibrationService {
  constructor(
    @inject('CalibrationsRepository')
    private calibrationsRepository: ICalibrationsRepository,
  ) {}

  public async execute({
    calibrationType_id,
    employee_id,
    equipament_id,
    value,
    date,
  }: ICreateCalibrationDTO): Promise<Calibration> {
    const calibration = await this.calibrationsRepository.create({
      calibrationType_id,
      employee_id,
      equipament_id,
      value,
      date,
    });

    return calibration;
  }
}

export default CreateCalibrationService;
