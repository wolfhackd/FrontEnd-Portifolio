export const dateFormater = (date: string) => {
  const createdDate = new Date(date);
  const formatedDate = createdDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return formatedDate;
};
