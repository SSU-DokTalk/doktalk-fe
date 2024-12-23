import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";

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
  role: string;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;
}

const initialState: UserState = {
  role: "USER",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    unsetUser: () => {
      return {
        role: "USER",
      };
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
