import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenuOpen: false,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export default pageSlice.reducer;
export const { toggleMenu } = pageSlice.actions;
