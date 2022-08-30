import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import appReducer from './slices/AppSlice';
import { postAPI } from '@/services/post';

export const store = configureStore({
    reducer: {
        app: appReducer,
        [postAPI.reducerPath]: postAPI.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
