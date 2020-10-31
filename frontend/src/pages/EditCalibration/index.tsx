import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import Table from '../../components/Table';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';
import returnStatus from '../../utils/returnStatus';
import Button from '../../components/Button';

import {
  Container,
  AnimationContainer,
  Header,
  Content,
  ContainerButtons,
} from './styles';

interface ListCalibrationFormData {
  equipament_id: string;
  employee_id: string;
  calibrationType_id: string;
  date: Date;
  equipament: ListEquipamentFormData;
  employee: ListEmployeeFormData;
  calibrationTypes: ListMaintenanceypeFormData;
  value: number;
  id: string;
  status: string;
}

interface ListEquipamentFormData {
  id: string;
  name: string;
}

interface ListEmployeeFormData {
  name: string;
  id: string;
}

interface ListMaintenanceypeFormData {
  name: string;
  id: string;
}

interface IState {
  state: {
    id: string;
  };
}

interface CheckListCalibration {
  id: string;
  status: string;
  checkListCalibration: {
    name: string;
  };
}

const EditCalibration: React.FC = () => {
  const location: IState = useLocation();
  const [status, setStatus] = useState('');
  const history = useHistory();
  const { addToast } = useToast();
  const [calibrations, setCalibrations] = useState<ListCalibrationFormData[]>(
    [],
  );
  const [checkListCalibrations, setCheckListCalibrations] = useState<
    CheckListCalibration[]
  >([]);

  if (typeof location.state === 'undefined') {
    history.push('/');
  }

  const handleLoadCalibrations = useCallback(async () => {
    const response = await api.get('/calibrations', {
      params: { id: location.state.id },
    });

    setStatus(response.data[0].status);

    setCalibrations(response.data);
  }, [location.state.id]);

  const handleLoadCheckList = useCallback(async () => {
    const response = await api.get('/calibrationCheckList', {
      params: { calibration_id: location.state.id },
    });

    setCheckListCalibrations(response.data);
  }, [location.state.id]);

  const handleUpdateRealizeMaintenance = useCallback(async () => {
    const response = await api.patch('/calibrations', {
      id: location.state.id,
      status: 'R',
    });

    if (response.status === 200) {
      handleLoadCalibrations();
      handleLoadCheckList();

      addToast({
        type: 'success',
        title: 'Status alterado!',
        description: 'Calibração atualizada!',
      });
    }
  }, [
    location.state.id,
    handleLoadCalibrations,
    handleLoadCheckList,
    addToast,
  ]);

  const handleUpdateCancelMaintenance = useCallback(async () => {
    const response = await api.patch('/calibrations', {
      id: location.state.id,
      status: 'C',
    });

    if (response.status === 200) {
      handleLoadCalibrations();
      handleLoadCheckList();

      addToast({
        type: 'success',
        title: 'Status alterado!',
        description: 'Calibração atualizada!',
      });
    }
  }, [
    location.state.id,
    handleLoadCalibrations,
    handleLoadCheckList,
    addToast,
  ]);

  const handleUpdateRealizeCheckList = useCallback(
    async idCheckList => {
      try {
        const response = await api.patch('/calibrationCheckList', {
          calibration_id: location.state.id,
          id: idCheckList,
          status: 'R',
        });

        if (!response || response.status !== 200) {
          addToast({
            type: 'error',
            title: 'Oops!',
            description: 'Um erro inesperado ocorreu!',
          });
        } else {
          handleLoadCheckList();

          addToast({
            type: 'success',
            title: 'Status alterado!',
            description: 'Calibração atualizada!',
          });
        }
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Oops!',
          description: 'Um erro inesperado ocorreu!',
        });
      }
    },
    [location.state.id, handleLoadCheckList, addToast],
  );

  const handleUpdateCancelCheckList = useCallback(
    async idCheckList => {
      try {
        const response = await api.patch('/calibrationCheckList', {
          calibration_id: location.state.id,
          id: idCheckList,
          status: 'C',
        });

        if (!response || response.status !== 200) {
          addToast({
            type: 'error',
            title: 'Oops!',
            description: 'Um erro inesperado ocorreu!',
          });
        } else {
          handleLoadCheckList();

          addToast({
            type: 'success',
            title: 'Status alterado!',
            description: 'Calibração atualizada!',
          });
        }
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Oops!',
          description: 'Um erro inesperado ocorreu!',
        });
      }
    },
    [location.state.id, handleLoadCheckList, addToast],
  );

  useEffect(() => {
    handleLoadCalibrations();
    handleLoadCheckList();
  }, [handleLoadCalibrations, handleLoadCheckList]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form>
            <Header>
              <Link to="/listCalibration">
                <FiArrowLeft size={30} />
              </Link>
              <h1>Editar Calibrações</h1>
              {status === 'P' && (
                <ContainerButtons>
                  <Button
                    style={{
                      float: 'right',
                      width: '50%',
                      marginRight: '10px',
                    }}
                    type="button"
                    id="btnConcluir"
                    onClick={handleUpdateRealizeMaintenance}
                  >
                    Concluir
                  </Button>
                  <Button
                    style={{
                      float: 'right',
                      width: '50%',
                      background: '#ff002f',
                    }}
                    type="button"
                    id="btnConcluir"
                    onClick={handleUpdateCancelMaintenance}
                  >
                    Cancelar
                  </Button>
                </ContainerButtons>
              )}
            </Header>
            <hr />
            {calibrations.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th align="left">Data</th>
                    <th align="left">Item</th>
                    <th align="left">Tipo</th>
                    <th align="left">Funcionário</th>
                    <th align="left">Custo</th>
                    <th align="left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {calibrations.map(calibration => (
                    <tr key={calibration.id}>
                      <td>{formatDate(calibration.date)}</td>
                      <td>{calibration.equipament.name}</td>
                      <td>{calibration.calibrationTypes.name}</td>
                      <td>{calibration.employee.name}</td>
                      <td>{formatValue(calibration.value)}</td>
                      <td>{returnStatus(calibration.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <hr />
            <br />
            {checkListCalibrations.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th align="left">Descrição</th>
                    <th align="left">Status</th>
                    <th align="left">Opções</th>
                  </tr>
                </thead>

                <tbody>
                  {checkListCalibrations.map(checkListCalibration => (
                    <tr key={checkListCalibration.id}>
                      <td>{checkListCalibration.checkListCalibration.name}</td>
                      <td>{returnStatus(checkListCalibration.status)}</td>
                      <td>
                        {status === 'P' && checkListCalibration.status === 'P' && (
                          <>
                            <Button
                              style={{ width: '40%', marginRight: '5px' }}
                              id="btnConcluirCheckList"
                              onClick={() =>
                                handleUpdateRealizeCheckList(
                                  checkListCalibration.id,
                                )
                              }
                            >
                              Concluir
                            </Button>
                            <Button
                              style={{ width: '40%', background: '#ff002f' }}
                              id="btnCancelarCheckList"
                              onClick={() =>
                                handleUpdateCancelCheckList(
                                  checkListCalibration.id,
                                )
                              }
                            >
                              Cancelar
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default EditCalibration;
