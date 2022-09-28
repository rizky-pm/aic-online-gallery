import axios from 'axios';

import { IIIF_URL } from '../constants';

export const getImageById = async (image_id) => {
  try {
    const response = await axios({
      method: 'GET',
      url: IIIF_URL + image_id + '/full/843,/0/default.jpg',
    });

    return response;
  } catch (error) {
    return error;
  }
};
