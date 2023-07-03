import { configureStore } from '@reduxjs/toolkit';
import { winesQWWApi } from './api/wines-qww-api';
import snackbarSlice from './slices/overlay-slice';

export default configureStore({
    reducer: {
        [winesQWWApi.reducerPath]: winesQWWApi.reducer,
        snackbar: snackbarSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(winesQWWApi.middleware)
})