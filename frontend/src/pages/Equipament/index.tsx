import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FiArrowLeft, FiPackage, FiGrid, FiDollarSign } from 'react-icons/fi';
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

interface EquipamentFormData {
  name: string;
}

interface ListGroupFormData {
  name: string;
  id: string;
}

interface ListSubGroupFormData {
  name: string;
  id: string;
}

interface ListDepartamentFormData {
  name: string;
  id: string;
}

const Equipament: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [groups, setGroups] = useState<ListGroupFormData[]>([]);
  const [subGroups, setSubGroups] = useState<ListSubGroupFormData[]>([]);
  const [departaments, setDepartaments] = useState<ListDepartamentFormData[]>(
    [],
  );

  async function loadGroups() {
    const response = await api.get('/groups');
    setGroups(response.data);
  }

  async function loadSubGroups() {
    const response = await api.get('/subgroups');
    setSubGroups(response.data);
  }

  async function loadDepartaments() {
    const response = await api.get('/departaments');
    setDepartaments(response.data);
  }

  useEffect(() => {
    loadGroups();
    loadSubGroups();
    loadDepartaments();
  }, []);

  const handleSubmit = useCallback(
    async (data: EquipamentFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/equipaments', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Equipamento cadastrado!',
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
            <h1>Cadastro de Equipamentos</h1>

            <Input name="name" icon={FiPackage} placeholder="Nome" />

            <Select name="group_id" icon={FiGrid}>
              <option value="">Grupo</option>

              {groups.map(group => (
                <option value={group.id}>{group.name}</option>
              ))}
            </Select>

            <Select name="subgroup_id" icon={FiGrid}>
              <option value="">SubGrupo</option>
              Valor
              {subGroups.map(subGroup => (
                <option value={subGroup.id}>{subGroup.name}</option>
              ))}
            </Select>

            <Select name="departament_id" icon={FiGrid}>
              <option value="">Departamento</option>

              {departaments.map(departament => (
                <option value={departament.id}>{departament.name}</option>
              ))}
            </Select>

            <Input name="value" icon={FiDollarSign} placeholder="Valor" />

            <Input name="code" icon={FiPackage} placeholder="Chapa" />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/listEquipament">
            <FiArrowLeft />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Equipament;
