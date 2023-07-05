import { useForm } from "react-hook-form";
import DialogQWW from "../dialog-qww/DialogQWW";
import NewWineForm, { newWineFormValues } from "../new-wine-form/NewWineForm";
import { useState } from "react";

function AddingNewWine({ onCancelAddNewWine }: { onCancelAddNewWine: () => void }) {

    //const [openModal, setOpenModal] = useState(false);

    const useFormObj = useForm({ mode: 'onChange', defaultValues: newWineFormValues });
    const onSubmitNewWine = () => {
        useFormObj.handleSubmit((d) => { console.log('d !: ', d) }, (d) => {
            console.log('values ', useFormObj.getValues())
            console.log('err: ', d)
        })()
    }

    const onError = (err: any) => {
        console.log(err)
    }

    const onCancelNewWine = () => { /* setOpenModal(false); */ onCancelAddNewWine(); }

    return (<DialogQWW open={true} onSubmit={onSubmitNewWine} handleClose={onCancelNewWine} title='New wine' >
        <NewWineForm useFormObj={useFormObj} />
    </DialogQWW>)
}

export default AddingNewWine;