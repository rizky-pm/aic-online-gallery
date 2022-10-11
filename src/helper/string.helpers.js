import { FIELDS_PARAM } from '../constants';

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
  let locationTag = location.substring(0, 15);

  switch (locationTag) {
    case '/art-gallery/t/':
      return `/search?${FIELDS_PARAM}&query${getQueryMatch(
        'artwork_type_title',
        tag
      )}&${getQueryExists('image_id')}&page=${page}&limit=9`;

    case '/art-gallery/s/':
      return `/search?${FIELDS_PARAM}&query${getQueryExists(
        'image_id'
      )}&page=${page}&q=${removeString(searchQuery)}&limit=9`;

    default:
      return `/search?${FIELDS_PARAM}&query${getQueryExists(
        'image_id'
      )}&page=${page}&limit=9`;
  }
};
