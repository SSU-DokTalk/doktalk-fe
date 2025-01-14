import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";

export interface GlobalStateType {
  isFollowerUpdated?: boolean;
  isLibraryUpdated?: boolean;
}

const initialState: GlobalStateType = {
  isFollowerUpdated: true,
  isLibraryUpdated: true,
};

export const globalStateSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    updateGlobalState: (state, action: PayloadAction<GlobalStateType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateGlobalState } = globalStateSlice.actions;
export const selectGlobalState = (state: RootState) => state.globalState;
export default globalStateSlice.reducer;
