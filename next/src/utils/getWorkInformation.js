const getWorkInformation = (PIB, data) => {
  const filterFile = data
    .flatMap((row, index) => row[0] === PIB && [row, data[index + 1]])
    .filter((item) => item);
  const concat = []
    .concat(...filterFile)
    .filter((item) => item.length !== 1 && item !== PIB)
    .map((time) => {
      const [from, to] = time.split(/[,\-|]/);

      if (+from && +to) {
        return +to - +from;
      }

      return 0;
    });

  return {
    days: concat.length,
    hours: concat.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    ),
  };
};

export default getWorkInformation;
