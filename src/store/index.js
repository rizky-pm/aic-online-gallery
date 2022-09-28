import { configureStore } from '@reduxjs/toolkit';
import artworksReducer from './artworks.slice';
import tagReducer from './tag.slice';

const store = configureStore({
  reducer: {
    artworks: artworksReducer,
    tag: tagReducer,
  },
});

export default store;
