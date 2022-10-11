export const randomNumberWithMinMax = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const uniqueRandomNumber = (min, max, array, setArray) => {
  let randomNumber = randomNumberWithMinMax(min, max);

  while (array.indexOf(randomNumber) > -1) {
    randomNumber = randomNumberWithMinMax(min, max);
  }
  setArray([...array, randomNumber]);

  return randomNumber;
};
