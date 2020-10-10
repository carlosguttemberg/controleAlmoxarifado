import Calibration from '@modules/calibrations/infra/typeorm/entities/Calibration';
// import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import ICreateCalibrationDTO from '@modules/calibrations/dtos/ICreateCalibrationDTO';
import ICalibrationsRepository from '@modules/calibrations/repositories/ICalibrationsRepository';

import formatDateToAmerican from '@shared/Utils/formatDateToAmerican';

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
    const formatDate = formatDateToAmerican(date);

    const calibration = await this.calibrationsRepository.create({
      calibrationType_id,
      employee_id,
      equipament_id,
      value,
      date: formatDate,
    });

    return calibration;
  }
}

export default CreateCalibrationService;
