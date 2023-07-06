import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, DialogActions } from '@mui/material';
import { FieldValues, UseFormReturn } from 'react-hook-form';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function DialogQWW<T extends FieldValues>({ open, onSubmit, handleClose, title, children }: { open: boolean; onSubmit: (vals: any) => void; handleClose: () => void; title: string; children: JSX.Element }) {

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="dialog-qww-title"
            open={open}
            scroll='paper'
        >
            <BootstrapDialogTitle id="dialog-qww-title" onClose={handleClose}>
                {title}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button data-testid='save-form-button' autoFocus onClick={onSubmit}>
                    Save changes
                </Button>
            </DialogActions>
        </BootstrapDialog>

    );
}