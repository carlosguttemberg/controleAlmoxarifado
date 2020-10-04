import { inject, injectable } from 'tsyringe';

import CalibrationTypes from '@modules/calibrationTypes/infra/typeorm/entities/CalibrationTypes';

import ICalibrationTypesRepository from '@modules/calibrationTypes/repositories/ICalibrationTypesRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateCalibrationTypesService {
  constructor(
    @inject('CalibrationTypesRepository')
    private calibrationTypesRepository: ICalibrationTypesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<CalibrationTypes> {
    const calibrationTypes = await this.calibrationTypesRepository.create({
      name,
    });

    return calibrationTypes;
  }
}

export default CreateCalibrationTypesService;
