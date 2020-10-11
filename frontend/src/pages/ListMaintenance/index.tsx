import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FiArrowLeft, FiPlus, FiGrid } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Table from '../../components/Table';
import Select from '../../components/Select';

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

const ListMaintenance: React.FC = () => {
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

  async function loadEquipaments() {
    const response = await api.get('/equipaments');
    setEquipaments(response.data);
  }

  async function loadEmployees() {
    const response = await api.get('/employees');
    setEmployees(response.data);
  }

  async function loadMaintenanceTypes() {
    const response = await api.get('/maintenanceTypes');
    setMaintenanceTypes(response.data);
  }

  useEffect(() => {
    loadEquipaments();
    loadEmployees();
    loadMaintenanceTypes();
  }, []);

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
          <Header>
            <Header>
              <Link to="/">
                <FiArrowLeft size={30} />
              </Link>
              <h1>Pesquisa de Manutenções</h1>
            </Header>
            <Link to="/maintenance">
              <h3>
                <FiPlus style={{ marginRight: '5px' }} />
                Novo
              </h3>
            </Link>
          </Header>

          <hr />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Select name="equipament_id" icon={FiGrid}>
              <option value="">Equipamentos</option>

              {equipaments.map(equipament => (
                <option value={equipament.id}>{equipament.name}</option>
              ))}
            </Select>

            <Select name="employee_id" icon={FiGrid}>
              <option value="">Funcionário</option>

              {employees.map(employee => (
                <option value={employee.id}>{employee.name}</option>
              ))}
            </Select>

            <Select name="maintenanceType_id" icon={FiGrid}>
              <option value="">Tipo de Manutenção</option>

              {maintenanceTypes.map(maintenanceType => (
                <option value={maintenanceType.id}>
                  {maintenanceType.name}
                </option>
              ))}
            </Select>

            <Button style={{ marginLeft: '20px' }} type="submit">
              Pesquisar
            </Button>
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
                  <tr>
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
