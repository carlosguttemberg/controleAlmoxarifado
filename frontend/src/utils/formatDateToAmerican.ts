const formatDate = (value: Date): string => {
  const date = new Date(value);
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);

  return `${year}/${month}/${day}`;
};

export default formatDate;
