import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    selectTag: (state, action) => {
      state.data = action.payload;
    },
    removeTag: (state) => {
      state.data = null;
    },
  },
});

export default tagSlice.reducer;
export const { selectTag } = tagSlice.actions;
