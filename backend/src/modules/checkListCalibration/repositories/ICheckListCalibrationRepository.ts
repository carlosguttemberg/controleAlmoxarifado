import CheckListCalibration from '@modules/checkListCalibration/infra/typeorm/entities/CheckListCalibration';

import ICreateCheckListCalibrationDTO from '@modules/checkListCalibration/dtos/ICreateCheckListCalibrationDTO';

export default interface ICheckListCalibrationRepository {
  create(data: ICreateCheckListCalibrationDTO): Promise<CheckListCalibration>;
  list(data: ICreateCheckListCalibrationDTO): Promise<CheckListCalibration[]>;
}
