import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selectedData: null,
};

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    selectTag: (state, action) => {
      state.selectedData = action.payload;
    },
    removeTag: (state) => {
      state.selectedData = null;
    },
    fetchTagData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default tagSlice.reducer;
export const { selectTag, fetchTagData } = tagSlice.actions;
