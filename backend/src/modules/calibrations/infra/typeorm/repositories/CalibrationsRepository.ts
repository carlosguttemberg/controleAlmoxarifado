import { getRepository, Repository, Between } from 'typeorm';

import Calibration from '@modules/calibrations/infra/typeorm/entities/Calibration';
import CheckListCalibration from '@modules/checkListCalibration/infra/typeorm/entities/CheckListCalibration';
import CalibrationCheckList from '@modules/calibrationCheckList/infra/typeorm/entities/CalibrationCheckList';
import ICreateCalibrationDTO from '@modules/calibrations/dtos/ICreateCalibrationDTO';

import IListCalibrationDTO from '@modules/calibrations/dtos/IListCalibrationDTO';
import IUpdateCalibrationDTO from '@modules/calibrations/dtos/IUpdateCalibrationDTO';
import ICalibrationsRepository from '@modules/calibrations/repositories/ICalibrationsRepository';
import AppError from '@shared/errors/AppError';

interface IFilters {
  calibrationType_id?: string;
  employee_id?: string;
  equipament_id?: string;
  status?: string;
  date?: Date;
  id?: string;
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
    id,
    final_date,
  }: IListCalibrationDTO): Promise<Calibration[]> {
    const filters: IFilters[] = [];
    if (date && final_date) {
      filters.push({
        date: Between(date, final_date),
      });
    }

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

    if (id) {
      filters.push({ id });
    }

    const calibrations = await this.ormRepository.find({
      where: filters,
      relations: ['equipament', 'employee', 'calibrationTypes'],
    });

    return calibrations;
  }

  public async update({
    id,
    status,
  }: IUpdateCalibrationDTO): Promise<Calibration> {
    try {
      if (!status) throw new AppError('Informe um Status');
      if (!id) throw new AppError('Informe uma calibração');

      const calibration = await this.ormRepository.findOne(id);

      if (!calibration) throw new AppError('Calibração não encontrada');

      calibration.status = status;

      const updateCalibration = await this.ormRepository.save(calibration);

      return updateCalibration;
    } catch (error) {
      return error.message;
    }
  }

  public async generateGraphic({
    calibrationType_id,
    employee_id,
    equipament_id,
    status,
    date,
    id,
    final_date,
  }: IListCalibrationDTO): Promise<Calibration[]> {
    const calibrations = await this.ormRepository
      .createQueryBuilder('calibrations')
      .innerJoin('calibrations.equipament', 'equipaments')
      .innerJoin('equipaments.subgroup', 'subgroups')
      .select('subgroups.name', 'name')
      .addSelect('SUM(calibrations.value)', 'value')
      .addSelect('COUNT(*)', 'qtde')
      .groupBy('subgroups.name')
      .getRawMany();
    return calibrations;
  }

  public async generateGraphicTypes({
    calibrationType_id,
    employee_id,
    equipament_id,
    status,
    date,
    id,
    final_date,
  }: IListCalibrationDTO): Promise<Calibration[]> {
    const calibrations = await this.ormRepository
      .createQueryBuilder('calibrations')
      .innerJoin('calibrations.calibrationTypes', 'calibrationTypes')
      .select('calibrationTypes.name', 'name')
      .addSelect('SUM(calibrations.value)', 'value')
      .addSelect('COUNT(*)', 'qtde')
      .groupBy('calibrationTypes.name')
      .getRawMany();
    return calibrations;
  }
}

export default CalibrationsRepository;
