import { inject, injectable } from 'tsyringe';

import CheckListCalibration from '@modules/checkListCalibration/infra/typeorm/entities/CheckListCalibration';

import ICheckListCalibrationRepository from '@modules/checkListCalibration/repositories/ICheckListCalibrationRepository';

interface IRequest {
  name: string;
}

@injectable()
class ListCheckListCalibrationService {
  constructor(
    @inject('CheckListCalibrationRepository')
    private checkListCalibrationRepository: ICheckListCalibrationRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<CheckListCalibration[]> {
    const checkListCalibration = await this.checkListCalibrationRepository.list(
      {
        name,
      },
    );

    return checkListCalibration;
  }
}

export default ListCheckListCalibrationService;
