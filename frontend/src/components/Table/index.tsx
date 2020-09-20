import React, { TableHTMLAttributes } from 'react';

import { AppTable } from './styles';

type TableProps = TableHTMLAttributes<HTMLTableElement>;

const Table: React.FC<TableProps> = ({ children, ...rest }) => {
  return <AppTable {...rest}>{children}</AppTable>;
};

export default Table;
