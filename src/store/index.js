import { configureStore } from '@reduxjs/toolkit';
import artworksReducer from './artworks.slice';

const store = configureStore({
  reducer: {
    artworks: artworksReducer,
  },
});

export default store;
