import { container } from 'tsyringe';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import EmployeesRepository from '@modules/employees/infra/typeorm/repositories/EmployeesRepository';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import GroupsRepository from '@modules/groups/infra/typeorm/repositories/GroupsRepository';

import ISubGroupsRepository from '@modules/subGroups/repositories/ISubGroupsRepository';
import SubGroupsRepository from '@modules/subGroups/infra/typeorm/repositories/SubGroupsRepository';

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
