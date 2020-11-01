import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FiArrowLeft, FiGrid, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

// import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

interface CalibrationFormData {
  date: Date;
}

interface ListEquipamentFormData {
  id: string;
  name: string;
  departament: {
    name: string;
  };
}

interface ListEmployeeFormData {
  name: string;
  id: string;
}

interface ListCalibrationTypeFormData {
  name: string;
  id: string;
}

const Calibration: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

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
    async (data: CalibrationFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          date: Yup.string().required('Data obrigatória'),
          equipament_id: Yup.string().required('Equipamento obrigatório'),
          employee_id: Yup.string().required('Funcionário obrigatório'),
          calibrationType_id: Yup.string().required('Tipo obrigatório'),
          value: Yup.number()
            .typeError('Valor precisa ser numérico')
            .required('Valor obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/calibrations', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Calibração cadastrada!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastro de Calibrações</h1>

            <Input name="date" icon={FiCalendar} placeholder="Data" />

            <Select name="equipament_id" icon={FiGrid}>
              <option value="">Equipamento</option>

              {equipaments.map(equipament => (
                <option value={equipament.id}>
                  {`${equipament.name} - ${equipament.departament.name}`}
                </option>
              ))}
            </Select>

            <Select name="employee_id" icon={FiGrid}>
              <option value="">Funcionário</option>

              {employees.map(employee => (
                <option value={employee.id}>{employee.name}</option>
              ))}
            </Select>

            <Select name="calibrationType_id" icon={FiGrid}>
              <option value="">Tipo</option>

              {calibrationTypes.map(calibrationType => (
                <option value={calibrationType.id}>
                  {calibrationType.name}
                </option>
              ))}
            </Select>

            <Input name="value" icon={FiDollarSign} placeholder="Valor" />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/listCalibration">
            <FiArrowLeft />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Calibration;
