import React from 'react';

import { FiUser, FiGrid } from 'react-icons/fi';
import MenuButton from '../../components/MenuButton';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Content>
      <Container style={{ marginTop: '15%' }}>
        <h1>Menu de opções</h1>
      </Container>

      <Container>
        <MenuButton to="/employees" icon={FiUser}>
          Funcionários
        </MenuButton>
        <MenuButton to="/listGroup" icon={FiGrid}>
          Grupo
        </MenuButton>
        <MenuButton to="/subGroup" icon={FiGrid}>
          SubGrupo
        </MenuButton>
      </Container>
    </Content>
  );
};

export default Dashboard;
