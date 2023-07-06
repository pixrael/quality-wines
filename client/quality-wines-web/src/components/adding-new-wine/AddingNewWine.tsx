import { useForm } from "react-hook-form";
import DialogQWW from "../dialog-qww/DialogQWW";
import NewWineForm, { newWineFormValues } from "../new-wine-form/NewWineForm";
import { useAddWineMutation } from "../../store/api/wines-qww-api";
import { useEffect, useState } from 'react';
import store from "../../store/store";
import { showSnackbar } from "../../store/slices/overlay-slice";
import { Severity } from "../feedback-overlays-qww/snackbar-qww/SnackbarQWW";
import { CircularProgress } from "@mui/material";


function AddingNewWine({ onCancelAddNewWine }: { onCancelAddNewWine: () => void }) {

    const [addWine, response] = useAddWineMutation();
    const [addWineLoading, setAddWineLoading] = useState(false);

    const useFormObj = useForm({ mode: 'onChange', defaultValues: newWineFormValues });
    const onSubmitNewWine = () => {
        useFormObj.handleSubmit((wine) => {
            setAddWineLoading(true);
            addWine(wine);
        }, (d) => {
            console.log('err: ', d)
        })()
    }


    useEffect(() => {

        if (response.endpointName === 'addWine') {

            if (response.isSuccess) {
                store.dispatch(showSnackbar({ message: `Wine ${response.data.name} added successfully`, severity: Severity.SUCCESS }));
                onCancelAddNewWine();                
            } else if (response.isError && 'status' in response.error) {
                const errMsg = 'error' in response.error ? response.error.error : response.error.data
                store.dispatch(showSnackbar({ message: `Error: "${errMsg}"`, severity: Severity.ERROR }));
            }

            setAddWineLoading(false);
        }


    }, [response]);



    const onCancelNewWine = () => onCancelAddNewWine()

    return (<DialogQWW open={true} onSubmit={onSubmitNewWine} handleClose={onCancelNewWine} title='New wine' >
        <>
            {addWineLoading && <CircularProgress />}
            {!addWineLoading && <NewWineForm useFormObj={useFormObj} />}
        </>

    </DialogQWW>)
}

export default AddingNewWine;