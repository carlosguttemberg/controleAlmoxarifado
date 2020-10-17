import Calibration from '@modules/calibrations/infra/typeorm/entities/Calibration';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IUpdateCalibrationDTO from '@modules/calibrations/dtos/IUpdateCalibrationDTO';
import ICalibrationsRepository from '@modules/calibrations/repositories/ICalibrationsRepository';

@injectable()
class UpdateCalibrationService {
  constructor(
    @inject('CalibrationsRepository')
    private calibrationsRepository: ICalibrationsRepository,
  ) {}

  public async execute({
    id,
    status,
  }: IUpdateCalibrationDTO): Promise<Calibration> {
    const calibration = await this.calibrationsRepository.update({
      id,
      status,
    });

    return calibration;
  }
}

export default UpdateCalibrationService;
