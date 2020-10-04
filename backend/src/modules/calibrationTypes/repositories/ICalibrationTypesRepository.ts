import CalibrationTypes from '@modules/calibrationTypes/infra/typeorm/entities/CalibrationTypes';

import ICreateCalibrationTypesDTO from '@modules/calibrationTypes/dtos/ICreateCalibrationTypesDTO';

export default interface ICalibrationTypesRepository {
  create(data: ICreateCalibrationTypesDTO): Promise<CalibrationTypes>;
  list(data: ICreateCalibrationTypesDTO): Promise<CalibrationTypes[]>;
}
