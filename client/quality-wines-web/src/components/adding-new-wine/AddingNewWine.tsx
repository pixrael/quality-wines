import { useForm } from "react-hook-form";
import DialogQWW from "../dialog-qww/DialogQWW";
import NewWineForm, { newWineFormValues } from "../new-wine-form/NewWineForm";
import { useAddWineMutation } from "../../store/api/wines-qww-api";
import { useEffect, useState } from 'react';
import useLoginSession from "../../hooks/useLoginSession";


function AddingNewWine({ onCancelAddNewWine }: { onCancelAddNewWine: () => void }) {

    const [addWine, response] = useAddWineMutation()

    const useFormObj = useForm({ mode: 'onChange', defaultValues: newWineFormValues });
    const onSubmitNewWine = () => {
        useFormObj.handleSubmit((wine) => {
            
            addWine(wine);
        }, (d) => {
            console.log('err: ', d)
        })()
    }

    useEffect(() => {

        console.log('response ', response);
        let timeout: any;
        if (response.endpointName === 'addWine' && response.isSuccess) {


            /* setHideSuccessMsg(false);
            timeout = setTimeout(() => {
                setHideSuccessMsg(true);
                store.dispatch(allowExit());
            }, 1500); */
        }

        return () => { timeout && clearTimeout(timeout); }


    }, [response])

    const onCancelNewWine = () => onCancelAddNewWine()

    return (<DialogQWW open={true} onSubmit={onSubmitNewWine} handleClose={onCancelNewWine} title='New wine' >
        <NewWineForm useFormObj={useFormObj} />
    </DialogQWW>)
}

export default AddingNewWine;