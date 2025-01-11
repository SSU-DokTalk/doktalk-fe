import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";

export interface UserState {
  id?: number;
  name?: string;
  profile?: string;
  role?: "USER" | "ADMIN";
}

const initialState: UserState = {
  id: 0,
  name: undefined,
  profile: undefined,
  role: "USER",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    unsetUser: () => {
      return initialState;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { unsetUser, setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
