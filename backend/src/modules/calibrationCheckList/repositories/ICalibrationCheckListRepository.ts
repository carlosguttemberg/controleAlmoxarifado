import CalibrationCheckList from '@modules/calibrationCheckList/infra/typeorm/entities/CalibrationCheckList';

import ICreateCalibrationCheckListDTO from '@modules/calibrationCheckList/dtos/ICreateCalibrationCheckListDTO';
import IListCalibrationtCheckListDTO from '@modules/calibrationCheckList/dtos/IListCalibrationtCheckListDTO';
import IUpdateCalibrationCheckListDTO from '@modules/calibrationCheckList/dtos/IUpdateCalibrationCheckListDTO';

export default interface ICalibrationCheckListRepository {
  create(data: ICreateCalibrationCheckListDTO): Promise<CalibrationCheckList>;
  list(data: IListCalibrationtCheckListDTO): Promise<CalibrationCheckList[]>;
  update(data: IUpdateCalibrationCheckListDTO): Promise<CalibrationCheckList>;
}
