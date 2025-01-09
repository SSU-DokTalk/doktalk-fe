import userReducer from "@/stores/user";

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


export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsSlice.reducer,
  },
});

export const { toggleUpdateFlag } = postsSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
