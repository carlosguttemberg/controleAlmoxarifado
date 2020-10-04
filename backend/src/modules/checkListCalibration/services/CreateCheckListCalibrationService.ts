import { inject, injectable } from 'tsyringe';

import CheckListCalibration from '@modules/checkListCalibration/infra/typeorm/entities/CheckListCalibration';

import ICheckListCalibrationRepository from '@modules/checkListCalibration/repositories/ICheckListCalibrationRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateCheckListCalibrationService {
  constructor(
    @inject('CheckListCalibrationRepository')
    private checkListCalibrationRepository: ICheckListCalibrationRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<CheckListCalibration> {
    const checkListCalibration = await this.checkListCalibrationRepository.create(
      {
        name,
      },
    );

    return checkListCalibration;
  }
}

export default CreateCheckListCalibrationService;
