import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";
import { InitialUser } from "@/types/data";

// export interface UserState {
//   id?: number;
//   name?: string;
//   profile?: string;
//   role?: string;
// }

export interface UserState {
  id?: number;
  email?: string;
  profile?: string;
  name?: string;
  gender?: boolean;
  birthday?: Date;
  introduction?: string;
  follower_num?: number;
  following_num?: number;
  role?: "USER" | "ADMIN";
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;
}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    unsetUser: () => {
      return {};
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
