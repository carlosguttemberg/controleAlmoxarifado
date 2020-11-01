import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

import Group from '../pages/Group';
import ListGroup from '../pages/ListGroup';

import Employees from '../pages/Employees';
import ListEmployees from '../pages/ListEmployees';

import SubGroup from '../pages/SubGroup';
import ListSubGroup from '../pages/ListSubGroup';

import Departament from '../pages/Departament';
import ListDepartament from '../pages/ListDepartament';

import Equipament from '../pages/Equipament';
import ListEquipament from '../pages/ListEquipament';

import ListMaintenanceTypes from '../pages/ListMaintenanceTypes';
import MaintenanceTypes from '../pages/MaintenanceTypes';

import ListCalibrationTypes from '../pages/ListCalibrationTypes';
import CalibrationTypes from '../pages/CalibrationTypes';

import ListCheckListCalibration from '../pages/ListCheckListCalibration';
import CheckListCalibration from '../pages/CheckListCalibration';

import ListCheckListMaintenance from '../pages/ListCheckListMaintenance';
import CheckListMaintenance from '../pages/CheckListMaintenance';

import ListCalibration from '../pages/ListCalibration';
import Calibration from '../pages/Calibration';

import ListMaintenance from '../pages/ListMaintenance';
import Maintenance from '../pages/Maintenance';

import EditMaintenance from '../pages/EditMaintenance';
import EditCalibration from '../pages/EditCalibration';

import GraphicMaintenance from '../pages/GraphicMaintenance';
import GraphicCalibration from '../pages/GraphicCalibration';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />

    <Route path="/listEmployees" exact component={ListEmployees} />
    <Route path="/employees" exact component={Employees} />

    <Route path="/listGroup" exact component={ListGroup} />
    <Route path="/group" exact component={Group} />

    <Route path="/listDepartament" exact component={ListDepartament} />
    <Route path="/departament" exact component={Departament} />

    <Route path="/listSubGroup" exact component={ListSubGroup} />
    <Route path="/subGroup" exact component={SubGroup} />

    <Route path="/listEquipament" exact component={ListEquipament} />
    <Route path="/equipament" exact component={Equipament} />

    <Route
      path="/listMaintenanceTypes"
      exact
      component={ListMaintenanceTypes}
    />
    <Route path="/maintenanceTypes" exact component={MaintenanceTypes} />

    <Route
      path="/listCalibrationTypes"
      exact
      component={ListCalibrationTypes}
    />
    <Route path="/calibrationTypes" exact component={CalibrationTypes} />

    <Route
      path="/listCheckListCalibration"
      exact
      component={ListCheckListCalibration}
    />
    <Route
      path="/checkListCalibration"
      exact
      component={CheckListCalibration}
    />

    <Route
      path="/listCheckListMaintenance"
      exact
      component={ListCheckListMaintenance}
    />
    <Route
      path="/checkListMaintenance"
      exact
      component={CheckListMaintenance}
    />

    <Route path="/listCalibration" exact component={ListCalibration} />
    <Route path="/calibration" exact component={Calibration} />

    <Route path="/listMaintenance" exact component={ListMaintenance} />
    <Route path="/maintenance" exact component={Maintenance} />

    <Route path="/editMaintenance" exact component={EditMaintenance} />

    <Route path="/editCalibration" exact component={EditCalibration} />

    <Route path="/graphicMaintenance" exact component={GraphicMaintenance} />

    <Route path="/graphicCalibration" exact component={GraphicCalibration} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
