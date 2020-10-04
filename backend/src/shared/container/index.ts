import { container } from 'tsyringe';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import EmployeesRepository from '@modules/employees/infra/typeorm/repositories/EmployeesRepository';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import GroupsRepository from '@modules/groups/infra/typeorm/repositories/GroupsRepository';

import ISubGroupsRepository from '@modules/subGroups/repositories/ISubGroupsRepository';
import SubGroupsRepository from '@modules/subGroups/infra/typeorm/repositories/SubGroupsRepository';

import IDepartamentsRepository from '@modules/departaments/repositories/IDepartamentsRepository';
import DepartamentsRepository from '@modules/departaments/infra/typeorm/repositories/DepartamentsRepository';

import IEquipamentsRepository from '@modules/equipaments/repositories/IEquipamentsRepository';
import EquipamentsRepository from '@modules/equipaments/infra/typeorm/repositories/EquipamentsRepository';

import IMaintenanceTypesRepository from '@modules/maintenanceTypes/repositories/IMaintenanceTypesRepository';
import MaintenanceTypesRepository from '@modules/maintenanceTypes/infra/typeorm/repositories/MaintenanceTypesRepository';

import ICalibrationTypesRepository from '@modules/calibrationTypes/repositories/ICalibrationTypesRepository';
import CalibrationTypesRepository from '@modules/calibrationTypes/infra/typeorm/repositories/CalibrationTypesRepository';

import ICheckListCalibrationRepository from '@modules/checkListCalibration/repositories/ICheckListCalibrationRepository';
import CheckListCalibrationRepository from '@modules/checkListCalibration/infra/typeorm/repositories/CheckListCalibrationRepository';

container.registerSingleton<IEmployeesRepository>(
  'EmployeesRepository',
  EmployeesRepository,
);

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
);

container.registerSingleton<ISubGroupsRepository>(
  'SubGroupsRepository',
  SubGroupsRepository,
);

container.registerSingleton<IDepartamentsRepository>(
  'DepartamentsRepository',
  DepartamentsRepository,
);

container.registerSingleton<IEquipamentsRepository>(
  'EquipamentsRepository',
  EquipamentsRepository,
);

container.registerSingleton<IMaintenanceTypesRepository>(
  'MaintenanceTypesRepository',
  MaintenanceTypesRepository,
);

container.registerSingleton<ICalibrationTypesRepository>(
  'CalibrationTypesRepository',
  CalibrationTypesRepository,
);

container.registerSingleton<ICheckListCalibrationRepository>(
  'CheckListCalibrationRepository',
  CheckListCalibrationRepository,
);
