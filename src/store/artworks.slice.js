import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  page: 0,
  totalData: 1,
  totalPage: 0,
  refOffSet: 0,
};

const artworksSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {
    fetched: (state, action) => {
      state.data = [...state.data, ...action.payload];
      // state.page = 1;
    },
    clearArtworks: (state) => {
      state.data = [];
      state.page = 0;
    },
    fetchTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    addPage: (state) => {
      state.page = state.page + 1;
    },
    resetPage: (state) => {
      state.page = 0;
    },
    setRefOffSet: (state, action) => {
      state.refOffSet = action.payload;
    },
  },
});

export default artworksSlice.reducer;
export const {
  fetched,
  clearArtworks,
  fetchTotalPage,
  addPage,
  resetPage,
  setRefOffSet,
} = artworksSlice.actions;
