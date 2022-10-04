import { configureStore } from '@reduxjs/toolkit';
import artworksReducer from './artworks.slice';
import tagReducer from './tag.slice';
import pageReducer from './page.slice';

const store = configureStore({
  reducer: {
    artworks: artworksReducer,
    tag: tagReducer,
    page: pageReducer,
  },
});

export default store;
