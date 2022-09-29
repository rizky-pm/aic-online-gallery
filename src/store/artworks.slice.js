import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  page: 0,
  totalData: 0,
  totalPage: 0,
};

const artworksSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {
    fetched: (state, action) => {
      state.data = [...state.data, ...action.payload];
      state.page += 1;
    },
    clearArtworks: (state) => {
      state.data = [];
      state.page = 0;
    },
    fetchTotalData: (state, action) => {
      state.totalData = action.payload;
    },
    fetchTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
  },
});

export default artworksSlice.reducer;
export const { fetched, clearArtworks, fetchTotalData, fetchTotalPage } =
  artworksSlice.actions;
