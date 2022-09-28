export const splitArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
};

export const randomNumberWithMinMax = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const removeSlash = (string) => {
  return string.replace(/\//g, '');
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
