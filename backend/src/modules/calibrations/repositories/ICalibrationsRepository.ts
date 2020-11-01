import Calibration from '@modules/calibrations/infra/typeorm/entities/Calibration';

import ICreateCalibrationDTO from '@modules/calibrations/dtos/ICreateCalibrationDTO';
import IListCalibrationDTO from '@modules/calibrations/dtos/IListCalibrationDTO';
import IUpdateCalibrationDTO from '@modules/calibrations/dtos/IUpdateCalibrationDTO';

export default interface ICalibrationsRepository {
  create(data: ICreateCalibrationDTO): Promise<Calibration>;
  list(data: IListCalibrationDTO): Promise<Calibration[]>;
  update(data: IUpdateCalibrationDTO): Promise<Calibration>;
  generateGraphic(data: IListCalibrationDTO): Promise<Calibration[]>;
  generateGraphicTypes(data: IListCalibrationDTO): Promise<Calibration[]>;
}
