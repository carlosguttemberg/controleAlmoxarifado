import styled from 'styled-components';
import { shade } from 'polished';

export const AppTable = styled.table`
  table,
  th,
  td {
    background-color: #232129;
    border-radius: 10px;
    border: 2px solid #232129;
  }

  th,
  td {
    padding: 15px;
    text-align: left;

    transition: border-color 0.2s;

    &:hover {
      border-color: ${shade(0.2, '#ff9000')};
    }
  }
`;
