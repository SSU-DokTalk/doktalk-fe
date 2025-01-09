import { createSlice, configureStore } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    updateFlag: false,
  },
  reducers: {
    toggleUpdateFlag: (state) => {
      state.updateFlag = !state.updateFlag;
    },
  },
});

export const { toggleUpdateFlag } = postsSlice.actions;

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

export default store;
