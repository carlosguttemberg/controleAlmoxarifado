import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCalibrationCheckListService from '@modules/calibrationCheckList/services/CreateCalibrationCheckListService';
import ListCalibrationCheckListService from '@modules/calibrationCheckList/services/ListCalibrationCheckListService';
import IListCalibrationtCheckListDTO from '@modules/calibrationCheckList/dtos/IListCalibrationtCheckListDTO';

interface IMyRequest extends Request {
  query: {
    calibration_id: string;
    checkListCalibration_id: string;
    status: string;
  };
}

export default class CalibrationCheckListController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { calibration_id, checkListCalibration_id } = request.body;

    const createCalibration = container.resolve(
      CreateCalibrationCheckListService,
    );

    const calibration = await createCalibration.execute({
      calibration_id,
      checkListCalibration_id,
    });

    return response.json(calibration);
  }

  public async list(
    request: IMyRequest,
    response: Response,
  ): Promise<Response> {
    const {
      calibration_id,
      checkListCalibration_id,
      status,
    }: IListCalibrationtCheckListDTO = request.query;

    const listCheckList = container.resolve(ListCalibrationCheckListService);

    const checkList = await listCheckList.execute({
      calibration_id,
      checkListCalibration_id,
      status,
    });

    return response.json(checkList);
  }
}
