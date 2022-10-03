import axios from 'axios';

export const getAllArtworkTypes = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/artwork-types?limit=44',
    });

    return response;
  } catch (error) {
    return error;
  }
};
