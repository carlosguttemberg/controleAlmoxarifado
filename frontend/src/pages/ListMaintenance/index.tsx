import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiGrid, FiPieChart } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Table from '../../components/Table';
import Select from '../../components/Select';
import Input from '../../components/Input';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';
import returnStatus from '../../utils/returnStatus';

import {
  Container,
  AnimationContainer,
  Header,
  Content,
  ContainerGrid,
} from './styles';

interface ListMaintenanceFormData {
  equipament_id: string;
  employee_id: string;
  maintenanceType_id: string;
  date: Date;
  final_date: Date;
  equipament: ListEquipamentFormData;
  employee: ListEmployeeFormData;
  maintenanceTypes: ListMaintenanceypeFormData;
  value: number;
  status: string;
  id: string;
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

const ListMaintenance: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [maintenances, setMaintenances] = useState<ListMaintenanceFormData[]>(
    [],
  );
  const [equipaments, setEquipaments] = useState<ListEquipamentFormData[]>([]);
  const [employees, setEmployees] = useState<ListEmployeeFormData[]>([]);
  const [maintenanceTypes, setMaintenanceTypes] = useState<
    ListMaintenanceypeFormData[]
  >([]);

  const handleLoadEquipaments = useCallback(async () => {
    const response = await api.get('/equipaments');
    setEquipaments(response.data);
  }, []);

  const handleLoadEmployees = useCallback(async () => {
    const response = await api.get('/employees');
    setEmployees(response.data);
  }, []);

  const handleLoadMaintenanceTypes = useCallback(async () => {
    const response = await api.get('/maintenanceTypes');
    setMaintenanceTypes(response.data);
  }, []);

  useEffect(() => {
    handleLoadEquipaments();
    handleLoadEmployees();
    handleLoadMaintenanceTypes();
  }, [handleLoadEquipaments, handleLoadEmployees, handleLoadMaintenanceTypes]);

  const handleSubmit = useCallback(
    async ({
      maintenanceType_id,
      date,
      employee_id,
      equipament_id,
      status,
      final_date,
    }: ListMaintenanceFormData) => {
      try {
        const response = await api.get('/maintenances', {
          params: {
            maintenanceType_id,
            date,
            employee_id,
            equipament_id,
            status,
            final_date,
          },
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

  const handleEditMaintenance = useCallback(
    (id: string, e: React.FormEvent) => {
      e.preventDefault();

      try {
        history.push({ pathname: '/editMaintenance', state: { id } });
      } catch (err) {
        alert('Something is wrong.');
      }
    },
    [history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Header>
            <Header>
              <Link to="/">
                <FiArrowLeft size={30} />
              </Link>
              <h1>Pesquisa de Manutenções</h1>
            </Header>
            <div
              style={{
                display: 'flex',
                width: '200px',
                justifyContent: 'space-between',
              }}
            >
              <Link to="/maintenance">
                <h3>
                  <FiPlus style={{ marginRight: '5px' }} />
                  Novo
                </h3>
              </Link>

              <Link to="/graphicMaintenance">
                <h3>
                  <FiPieChart style={{ marginRight: '5px' }} />
                  Gráfico
                </h3>
              </Link>
            </div>
          </Header>

          <hr />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <ContainerGrid>
                <div>
                  <label htmlFor="date">Data Inicial</label>
                  <Input name="date" type="date" />
                </div>

                <div>
                  <label htmlFor="final_date">Data Final</label>
                  <Input name="final_date" id="final_date" type="date" />
                </div>

                <div>
                  <label htmlFor="equipament_id">Equipamento</label>
                  <Select name="equipament_id" id="equipament_id" icon={FiGrid}>
                    <option value="">Selecione</option>

                    {equipaments.map(equipament => (
                      <option value={equipament.id}>{equipament.name}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label htmlFor="employee_id">Funcionário</label>
                  <Select name="employee_id" icon={FiGrid}>
                    <option value="">Selecione</option>

                    {employees.map(employee => (
                      <option value={employee.id}>{employee.name}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label htmlFor="employee_id">Tipo</label>
                  <Select name="maintenanceType_id" icon={FiGrid}>
                    <option value="">Selecione</option>

                    {maintenanceTypes.map(maintenanceType => (
                      <option value={maintenanceType.id}>
                        {maintenanceType.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </ContainerGrid>

              <ContainerGrid>
                <div>
                  <label htmlFor="status">Status</label>
                  <Select name="status" id="status" icon={FiGrid}>
                    <option value="">Selecione</option>
                    <option value="P">Pendente</option>
                    <option value="R">Realizado</option>
                    <option value="R">Cancelado</option>
                  </Select>
                </div>

                <div style={{ display: 'block' }}>
                  <label>&nbsp;</label>
                  <Button style={{ marginLeft: '20px' }} type="submit">
                    Pesquisar
                  </Button>
                </div>
              </ContainerGrid>
            </div>
          </Form>

          <hr />
          <br />

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
                  <tr
                    key={maintenance.id}
                    onClick={e => handleEditMaintenance(maintenance.id, e)}
                  >
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
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ListMaintenance;
