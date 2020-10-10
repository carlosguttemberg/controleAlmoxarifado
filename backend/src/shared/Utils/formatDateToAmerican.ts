const formatDate = (value: Date): Date => {
  const date = value.toString().split('/');

  const dateAmerican = new Date(`${date[2]}-${date[1]}-${date[0]}T12:00:00Z`);

  return dateAmerican;
};

export default formatDate;
