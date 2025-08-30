import {
    configureStore,
    type ThunkAction,
    type Action
} from '@reduxjs/toolkit';

import tableSlice from './slices/tableSlice';

// /. imports

export const store = configureStore({
    reducer: { tableSlice }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
