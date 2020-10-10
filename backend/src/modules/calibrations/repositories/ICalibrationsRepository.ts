import Calibration from '@modules/calibrations/infra/typeorm/entities/Calibration';

import ICreateCalibrationDTO from '@modules/calibrations/dtos/ICreateCalibrationDTO';
import IListCalibrationDTO from '@modules/calibrations/dtos/IListCalibrationDTO';

export default interface ICalibrationsRepository {
  create(data: ICreateCalibrationDTO): Promise<Calibration>;
  list(data: IListCalibrationDTO): Promise<Calibration[]>;
}
