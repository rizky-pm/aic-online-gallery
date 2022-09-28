import axios from 'axios';

export const getAllArtworks = async (queryPayload) => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/artworks' + queryPayload,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getArtworkById = async (artworkId, query) => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/artworks/' + artworkId + query,
    });

    return response;
  } catch (error) {
    return error;
  }
};
