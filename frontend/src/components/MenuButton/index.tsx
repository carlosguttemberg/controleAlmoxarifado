import React from 'react';

import { LinkProps } from 'react-router-dom';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface LinkAppProps extends LinkProps {
  icon?: React.ComponentType<IconBaseProps>;
}

const MenuButton: React.FC<LinkAppProps> = ({
  children,
  icon: Icon,
  ...rest
}) => (
  <Container {...rest}>
    {Icon && <Icon size={20} style={{ marginRight: '8px' }} />}
    {children}
  </Container>
);

export default MenuButton;
