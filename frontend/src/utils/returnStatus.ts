const returnStatus = (value: string): string => {
  switch (value) {
    case 'P':
      return 'Pendente';
      break;

    case 'C':
      return 'Cancelado';
      break;

    case 'R':
      return 'Realizado';
      break;

    default:
      return '';
      break;
  }
};

export default returnStatus;
