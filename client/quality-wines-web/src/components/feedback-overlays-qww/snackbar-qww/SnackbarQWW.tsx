import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export enum Severity {
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
    SUCCESS = "success",
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarQWW({ message, severity, openSnackbar, onClose }: {
    message: string, severity: Severity, openSnackbar: boolean, onClose: Function
}) {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        onClose();
    };

    return (<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>{message}</Alert>
    </Snackbar>
    )
}