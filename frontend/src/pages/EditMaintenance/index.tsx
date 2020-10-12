import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Table from '../../components/Table';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';
import returnStatus from '../../utils/returnStatus';

import { Container, AnimationContainer, Header, Content } from './styles';

interface ListMaintenanceFormData {
  equipament_id: string;
  employee_id: string;
  maintenanceType_id: string;
  date: Date;
  equipament: ListEquipamentFormData;
  employee: ListEmployeeFormData;
  maintenanceTypes: ListMaintenanceypeFormData;
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

interface CheckListMaintenance {
  id: string;
  status: string;
  checkListMaintenance: {
    name: string;
  };
}

const ListMaintenance: React.FC = () => {
  const location: IState = useLocation();
  const [status, setStatus] = useState('');
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [maintenances, setMaintenances] = useState<ListMaintenanceFormData[]>(
    [],
  );
  const [checkListMaintenances, setCheckListMaintenances] = useState<
    CheckListMaintenance[]
  >([]);

  if (typeof location.state === 'undefined') {
    history.push('/');
  }

  async function loadMaintenances() {
    const response = await api.get('/maintenances', {
      params: { id: location.state.id },
    });

    setStatus(response.data[0].status);

    console.log(response.data[0].status);

    setMaintenances(response.data);
  }

  async function loadCheckList() {
    const response = await api.get('/maintenanceCheckList', {
      params: { maintenance_id: location.state.id },
    });

    setCheckListMaintenances(response.data);
  }

  useEffect(() => {
    loadMaintenances();
    loadCheckList();
  });

  const handleSubmit = useCallback(
    async ({
      maintenanceType_id,
      date,
      employee_id,
      equipament_id,
    }: ListMaintenanceFormData) => {
      try {
        const response = await api.get('/maintenances', {
          params: { maintenanceType_id, date, employee_id, equipament_id },
        });

        setMaintenances(response.data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na pesquisa',
          description: 'Ocorreu um erro ao fazer a pesquisa, tente novamente',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Header>
              <Header>
                <Link to="/listMaintenance">
                  <FiArrowLeft size={30} />
                </Link>
                <h1>Editar de Manutenções</h1>
              </Header>

              {status === 'P' && (
                <Link to="/maintenance">
                  <h3>
                    <FiCheck style={{ marginRight: '5px' }} />
                    Concluir
                  </h3>
                </Link>
              )}
            </Header>
            <hr />
            {maintenances.length > 0 && (
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
                  {maintenances.map(maintenance => (
                    <tr key={maintenance.id}>
                      <td>{formatDate(maintenance.date)}</td>
                      <td>{maintenance.equipament.name}</td>
                      <td>{maintenance.maintenanceTypes.name}</td>
                      <td>{maintenance.employee.name}</td>
                      <td>{formatValue(maintenance.value)}</td>
                      <td>{returnStatus(maintenance.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <hr />
            <br />
            {checkListMaintenances.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th align="left">Descrição</th>
                    <th align="left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {checkListMaintenances.map(checkListMaintenance => (
                    <tr key={checkListMaintenance.id}>
                      <td>{checkListMaintenance.checkListMaintenance.name}</td>
                      <td>{returnStatus(checkListMaintenance.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ListMaintenance;
