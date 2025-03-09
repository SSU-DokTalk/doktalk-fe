import userReducer from '@/stores/user'
import globalStateReducer from '@/stores/globalStates'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        user: userReducer,
        globalState: globalStateReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
