import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FiArrowLeft, FiPlus, FiGrid } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

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

interface ListCalibrationFormData {
  equipament_id: string;
  employee_id: string;
  calibrationType_id: string;
  date: Date;
  equipament: ListEquipamentFormData;
  employee: ListEmployeeFormData;
  calibrationTypes: ListCalibrationTypeFormData;
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

interface ListCalibrationTypeFormData {
  name: string;
  id: string;
}

const ListCalibration: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [calibrations, setCalibrations] = useState<ListCalibrationFormData[]>(
    [],
  );
  const [equipaments, setEquipaments] = useState<ListEquipamentFormData[]>([]);
  const [employees, setEmployees] = useState<ListEmployeeFormData[]>([]);
  const [calibrationTypes, setCalibrationTypes] = useState<
    ListCalibrationTypeFormData[]
  >([]);

  const handleLoadEquipaments = useCallback(async () => {
    const response = await api.get('/equipaments');
    setEquipaments(response.data);
  }, []);

  const handleLoadEmployees = useCallback(async () => {
    const response = await api.get('/employees');
    setEmployees(response.data);
  }, []);

  const handleLoadCalibrationTypes = useCallback(async () => {
    const response = await api.get('/calibrationTypes');
    setCalibrationTypes(response.data);
  }, []);

  useEffect(() => {
    handleLoadEquipaments();
    handleLoadEmployees();
    handleLoadCalibrationTypes();
  }, [handleLoadEquipaments, handleLoadEmployees, handleLoadCalibrationTypes]);

  const handleSubmit = useCallback(
    async ({
      calibrationType_id,
      date,
      employee_id,
      equipament_id,
    }: ListCalibrationFormData) => {
      try {
        const response = await api.get('/calibrations', {
          params: { calibrationType_id, date, employee_id, equipament_id },
        });

        setCalibrations(response.data);
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

  const handleEditCalibration = useCallback(
    (id: string, e: React.FormEvent) => {
      e.preventDefault();

      try {
        history.push({ pathname: '/editCalibration', state: { id } });
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
              <h1>Pesquisa de Calibrações</h1>
            </Header>
            <Link to="/calibration">
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

            <Select name="calibrationType_id" icon={FiGrid}>
              <option value="">Tipo de Calibração</option>

              {calibrationTypes.map(calibrationType => (
                <option value={calibrationType.id}>
                  {calibrationType.name}
                </option>
              ))}
            </Select>

            <Button style={{ marginLeft: '20px' }} type="submit">
              Pesquisar
            </Button>
          </Form>

          <hr />
          <br />

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
                  <tr
                    key={calibration.id}
                    onClick={e => handleEditCalibration(calibration.id, e)}
                  >
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
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ListCalibration;
