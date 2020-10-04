import { inject, injectable } from 'tsyringe';

import CheckListMaintenance from '@modules/checkListMaintenance/infra/typeorm/entities/CheckListMaintenance';

import ICheckListMaintenanceRepository from '@modules/checkListMaintenance/repositories/ICheckListMaintenanceRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateCheckListMaintenanceService {
  constructor(
    @inject('CheckListMaintenanceRepository')
    private checkListMaintenanceRepository: ICheckListMaintenanceRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<CheckListMaintenance> {
    const checkListMaintenance = await this.checkListMaintenanceRepository.create(
      {
        name,
      },
    );

    return checkListMaintenance;
  }
}

export default CreateCheckListMaintenanceService;
