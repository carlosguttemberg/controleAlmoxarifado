import React, { useCallback, useRef, useState } from 'react';
import {
  FiArrowLeft,
  FiUser,
  FiPlus,
  FiMail,
  FiBriefcase,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Table from '../../components/Table';

import { Container, AnimationContainer, Header, Content } from './styles';

interface ListEmployeesFormData {
  name: string;
  email: string;
  attribution: string;
}

const ListEmployees: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [employees, setEmployees] = useState<ListEmployeesFormData[]>([]);

  const handleSubmit = useCallback(
    async ({ name, attribution, email }: ListEmployeesFormData) => {
      try {
        const response = await api.get('/employees', {
          params: { name, attribution, email },
        });

        setEmployees(response.data);
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
              <h1>Pesquisa de Funcionario</h1>
            </Header>
            <Link to="/employees">
              <h3>
                <FiPlus style={{ marginRight: '5px' }} />
                Novo
              </h3>
            </Link>
          </Header>

          <hr />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" icon={FiUser} placeholder="Nome" />

            <Input name="email" icon={FiMail} placeholder="Email" />

            <Input name="attribution" icon={FiBriefcase} placeholder="Função" />

            <Button style={{ marginLeft: '20px' }} type="submit">
              Pesquisar
            </Button>
          </Form>

          <hr />
          <br />

          {employees.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th align="left">Funcionários</th>
                  <th align="left">Email</th>
                  <th align="left">Função</th>
                </tr>
              </thead>

              <tbody>
                {employees.map(employee => (
                  <tr>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.attribution}</td>
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

export default ListEmployees;
