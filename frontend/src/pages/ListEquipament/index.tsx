import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FiArrowLeft, FiPackage, FiPlus, FiGrid } from 'react-icons/fi';
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
import Select from '../../components/Select';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, AnimationContainer, Header, Content } from './styles';

interface ListEquipamentFormData {
  name: string;
  code: string;
  value: number;
  group_id: string;
  subgroup_id: string;
  departament_id: string;
  created_at: Date;
}

interface IEquipament {
  name: string;
  code: string;
  value: number;
  group: ListGroupFormData;
  subgroup: ListSubGroupFormData;
  departament: ListDepartamentFormData;
  created_at: Date;
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

const ListEquipament: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [equipaments, setEquipaments] = useState<IEquipament[]>([]);
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
    async ({
      name,
      group_id,
      subgroup_id,
      departament_id,
    }: ListEquipamentFormData) => {
      try {
        const response = await api.get('/equipaments', {
          params: { name, group_id, subgroup_id, departament_id },
        });

        setEquipaments(response.data);
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
              <h1>Pesquisa de Equipamentos</h1>
            </Header>
            <Link to="/equipament">
              <h3>
                <FiPlus style={{ marginRight: '5px' }} />
                Novo
              </h3>
            </Link>
          </Header>

          <hr />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" icon={FiPackage} placeholder="Nome" />

            <Select name="group_id" icon={FiGrid}>
              <option value="">Grupo</option>

              {groups.map(group => (
                <option value={group.id}>{group.name}</option>
              ))}
            </Select>

            <Select name="subgroup_id" icon={FiGrid}>
              <option value="">SubGrupo</option>

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

            <Button style={{ marginLeft: '20px' }} type="submit">
              Pesquisar
            </Button>
          </Form>

          <hr />
          <br />

          {equipaments.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th align="left">Equipamentos</th>
                  <th align="left">Chapa</th>
                  <th align="left">Valor</th>
                  <th align="left">Grupo</th>
                  <th align="left">SubGrupo</th>
                  <th align="left">Departamento</th>
                  <th align="left">Aquisição</th>
                </tr>
              </thead>

              <tbody>
                {equipaments.map(equipament => (
                  <tr>
                    <td>{equipament.name}</td>
                    <td>{equipament.code}</td>
                    <td>{formatValue(equipament.value)}</td>
                    <td>{equipament.group.name}</td>
                    <td>{equipament.subgroup.name}</td>
                    <td>{equipament.departament.name}</td>
                    <td>{formatDate(equipament.created_at)}</td>
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

export default ListEquipament;
