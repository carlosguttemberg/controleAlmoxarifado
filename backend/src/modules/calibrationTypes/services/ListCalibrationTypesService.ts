import { inject, injectable } from 'tsyringe';

import CalibrationTypes from '@modules/calibrationTypes/infra/typeorm/entities/CalibrationTypes';

import ICalibrationTypesRepository from '@modules/calibrationTypes/repositories/ICalibrationTypesRepository';

interface IRequest {
  name: string;
}

@injectable()
class ListCalibrationTypesService {
  constructor(
    @inject('CalibrationTypesRepository')
    private calibrationTypesRepository: ICalibrationTypesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<CalibrationTypes[]> {
    const calibrationTypes = await this.calibrationTypesRepository.list({
      name,
    });

    return calibrationTypes;
  }
}

export default ListCalibrationTypesService;
