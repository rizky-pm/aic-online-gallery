import { FIELDS_PARAM } from '../constants';

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

export const removeString = (string, remove) => {
  return string.replace(remove, '');
};

export const includeString = (string, include) => {
  return string.includes(include);
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getQueryArtworkTypeImageId = (artworkType) => {
  return `&query[match][artwork_type_title]=${artworkType}&[exists][field]=image_id`;
};

export const getQueryExists = (field_name) => {
  return `[exists][field]=${field_name}`;
};

export const getQueryMatch = (field_name, field_value) => {
  return `[match][${field_name}]=${field_value}`;
};

export const querySelector = (location, tag, searchQuery, page) => {
  let locationTag = location.substring(0, 3);

  switch (locationTag) {
    case '/t/':
      return `/search?${FIELDS_PARAM}&query${getQueryMatch(
        'artwork_type_title',
        tag
      )}&${getQueryExists('image_id')}&page=${randomNumberWithMinMax(
        1,
        100
      )}&limit=9`;

    case '/s/':
      return `/search?${FIELDS_PARAM}&query${getQueryExists(
        'image_id'
      )}&page=${page}&q=${removeString(searchQuery)}&limit=9`;

    default:
      return `/search?${FIELDS_PARAM}&page=${randomNumberWithMinMax(
        1,
        100
      )}&limit=9`;
  }
};
