import { getRepository, Repository } from 'typeorm';

import Calibration from '@modules/calibrations/infra/typeorm/entities/Calibration';
import CheckListCalibration from '@modules/checkListCalibration/infra/typeorm/entities/CheckListCalibration';
import CalibrationCheckList from '@modules/calibrationCheckList/infra/typeorm/entities/CalibrationCheckList';
import ICreateCalibrationDTO from '@modules/calibrations/dtos/ICreateCalibrationDTO';

import IListCalibrationDTO from '@modules/calibrations/dtos/IListCalibrationDTO';
import ICalibrationsRepository from '@modules/calibrations/repositories/ICalibrationsRepository';

interface IFilters {
  calibrationType_id?: string;
  employee_id?: string;
  equipament_id?: string;
  status?: string;
  date?: Date;
}

class CalibrationsRepository implements ICalibrationsRepository {
  private ormRepository: Repository<Calibration>;

  constructor() {
    this.ormRepository = getRepository(Calibration);
  }

  public async create(
    calibrationData: ICreateCalibrationDTO,
  ): Promise<Calibration> {
    const checkListCalibrationRepository = getRepository(CheckListCalibration);
    const calibrationCheckListRepository = getRepository(CalibrationCheckList);
    const calibration = this.ormRepository.create(calibrationData);
    const calibrationCheckList: CalibrationCheckList[] = [];

    const checkListCalibrations = await checkListCalibrationRepository.find();

    await this.ormRepository.save(calibration);

    checkListCalibrations.forEach(checkListCalibration => {
      calibrationCheckList.push(
        calibrationCheckListRepository.create({
          calibration_id: calibration.id,
          checkListCalibration_id: checkListCalibration.id,
        }),
      );
    });

    await calibrationCheckListRepository.save(calibrationCheckList);

    return calibration;
  }

  public async list({
    calibrationType_id,
    employee_id,
    equipament_id,
    status,
    date,
  }: IListCalibrationDTO): Promise<Calibration[]> {
    const filters: IFilters[] = [];

    if (calibrationType_id) {
      filters.push({ calibrationType_id });
    }

    if (employee_id) {
      filters.push({ employee_id });
    }

    if (equipament_id) {
      filters.push({ equipament_id });
    }

    if (status) {
      filters.push({ status });
    }

    if (date) {
      filters.push({ date });
    }

    const calibrations = await this.ormRepository.find({
      where: filters,
      relations: ['equipament', 'employee', 'calibrationTypes'],
    });

    return calibrations;
  }
}

export default CalibrationsRepository;
