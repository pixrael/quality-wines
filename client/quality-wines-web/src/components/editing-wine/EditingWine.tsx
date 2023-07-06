import { useEffect, useState } from "react";
import { useGetWineByIdQuery, useUpdateWineMutation } from "../../store/api/wines-qww-api";
import DialogQWW from "../dialog-qww/DialogQWW";
import NewWineForm, { NEW_WINE, newWineFormValues } from "../new-wine-form/NewWineForm";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import store from "../../store/store";
import { Severity } from "../feedback-overlays-qww/snackbar-qww/SnackbarQWW";
import { showSnackbar } from "../../store/slices/overlay-slice";

function EditingWine({ onCancel, idEditingWine }: { onCancel: () => void, idEditingWine: string }) {
    const [editingLoading, setEditingLoading] = useState(false);
    const useFormObj = useForm({ mode: 'onChange', defaultValues: newWineFormValues });
    const {
        data: wine,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetWineByIdQuery(idEditingWine);
    const [updateWine, response] = useUpdateWineMutation();

    useEffect(() => {
        if (isError && 'status' in error) {
            const errMsg = 'error' in error ? error.error : error.data
            store.dispatch(showSnackbar({ message: `Error: "${errMsg}"`, severity: Severity.ERROR }));
        }

    }, [error]);

    const onSubmit = () => {
        useFormObj.handleSubmit((wine) => {
            updateWine({ id: wine._id, body: wine })
            setEditingLoading(true);
        }, (d) => {
            console.log('err: ', d)
        })()
    }

    useEffect(() => {
        if (isSuccess) {

            Object.keys(wine as NEW_WINE).forEach(k => {
                const key = k as keyof NEW_WINE;
                useFormObj.setValue(key, wine[key]);
            })
        }

    }, [wine])

    useEffect(() => {

        if (response.endpointName === 'updateWine') {

            if (response.isSuccess) {
                store.dispatch(showSnackbar({ message: `Wine ${response.data.name} updated successfully`, severity: Severity.SUCCESS }));
                onCancel();
                
            } else if (response.isError && 'status' in response.error) {
                const errMsg = 'error' in response.error ? response.error.error : response.error.data
                store.dispatch(showSnackbar({ message: `Error: "${errMsg}"`, severity: Severity.ERROR }));
            }
            setEditingLoading(false);
        }


    }, [response]);

    return (
        <>
            {isLoading && <CircularProgress />}
            {isSuccess &&
                <>
                    <DialogQWW open={true} onSubmit={onSubmit} handleClose={onCancel} title={`Edit wine ${wine.name}`}>
                        <>
                            {editingLoading && <CircularProgress />}
                            {!editingLoading && <NewWineForm useFormObj={useFormObj} />}
                        </>
                    </DialogQWW>
                </>
            }</>
    )
}

export default EditingWine;