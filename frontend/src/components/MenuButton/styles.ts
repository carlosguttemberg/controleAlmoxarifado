import styled from 'styled-components';
import { shade } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  background: #232129;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 200px;
  height: 110px;
  font-weight: 500;
  margin-top: 16px;
  transition: border-color 0.2s;
  border: 2px solid #232129;
  color: #666360;
  margin-right: 8px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    border-color: ${shade(0.2, '#ff9000')};
  }
`;
