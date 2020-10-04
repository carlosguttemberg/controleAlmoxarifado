import React from 'react';

import { FiUser, FiGrid, FiPackage } from 'react-icons/fi';
import MenuButton from '../../components/MenuButton';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Content>
      <Container style={{ marginTop: '15%' }}>
        <h1>Menu de opções</h1>
      </Container>

      <Container>
        <MenuButton to="/listEmployees" icon={FiUser}>
          Funcionários
        </MenuButton>
        <MenuButton to="/listGroup" icon={FiGrid}>
          Grupos
        </MenuButton>
        <MenuButton to="/listSubGroup" icon={FiGrid}>
          SubGrupos
        </MenuButton>
        <MenuButton to="/listDepartament" icon={FiGrid}>
          Departamentos
        </MenuButton>
      </Container>
      <Container>
        <MenuButton to="/listEquipament" icon={FiPackage}>
          Equipamentos
        </MenuButton>

        <MenuButton to="/listMaintenanceTypes" icon={FiPackage}>
          Tipos de Manutenção
        </MenuButton>
      </Container>
    </Content>
  );
};

export default Dashboard;
