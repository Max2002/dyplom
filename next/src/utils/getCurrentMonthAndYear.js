const getCurrentMonthAndYear = () => {
  const date = new Date();
  const currentMonth = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    timeZone: 'UTC',
  }).format(date);
  const currentYear = date.getFullYear();

  return { currentMonth, currentYear };
};

export default getCurrentMonthAndYear;
