import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Severity } from '../../components/feedback-overlays-qww/snackbar-qww/SnackbarQWW';

const initialState = { isShown: false, message: '', severity: 'success' };

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: initialState,
    reducers: {
        showSnackbar(state, action: PayloadAction<{
            message: string, severity: Severity
        }>) {
            state.isShown = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        hideSnackbar(state) {
            state.isShown = false;
            state.message = '';
            state.severity = 'success';
        }
    },
})

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions
export default snackbarSlice.reducer

export const selectSnackbar = (state: any) => {    
    return state.snackbar;
};