import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiPackage, FiPlus } from 'react-icons/fi';
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

import { Container, AnimationContainer, Header } from './styles';

interface CheckListMaintenanceFormData {
  name: string;
}

const CheckListMaintenance: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [checkListMaintenance, setCheckListMaintenance] = useState<
    CheckListMaintenanceFormData[]
  >([]);

  const handleSubmit = useCallback(
    async ({ name }: CheckListMaintenanceFormData) => {
      try {
        const response = await api.get('/checkListMaintenance', {
          params: { name },
        });

        setCheckListMaintenance(response.data);
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
      <AnimationContainer>
        <Header>
          <Header>
            <Link to="/">
              <FiArrowLeft size={30} />
            </Link>
            <h1>Pesquisa de CheckList de Manutenção</h1>
          </Header>
          <Link to="/checkListMaintenance">
            <h3>
              <FiPlus style={{ marginRight: '5px' }} />
              Novo
            </h3>
          </Link>
        </Header>

        <hr />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" icon={FiPackage} placeholder="Nome" />

          <Button style={{ marginLeft: '20px' }} type="submit">
            Pesquisar
          </Button>
        </Form>

        <hr />
        <br />

        {checkListMaintenance.length > 0 && (
          <Table>
            <thead>
              <tr>
                <th align="left">CheckList de Manuntenção</th>
              </tr>
            </thead>

            <tbody>
              {checkListMaintenance.map(checkList => (
                <tr>
                  <td>{checkList.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </AnimationContainer>
    </Container>
  );
};

export default CheckListMaintenance;
