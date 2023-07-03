import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth-api';
import snackbarSlice from './slices/overlay-slice';

export default configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        snackbar: snackbarSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
})