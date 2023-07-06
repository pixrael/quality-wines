import { useEffect, useState } from "react";
import WinesTable from "../components/wines-table/WinesTable";
import AddingNewWine from "../components/adding-new-wine/AddingNewWine";
import EditingWine from "../components/editing-wine/EditingWine";
import { useDeleteWineMutation, useGetWinesQuery } from "../store/api/wines-qww-api";
import { CircularProgress } from "@mui/material";
import store from "../store/store";
import { showSnackbar } from "../store/slices/overlay-slice";
import { Severity } from "../components/feedback-overlays-qww/snackbar-qww/SnackbarQWW";

function Measurements() {
    const [isAddingNewWine, setIsAddingNewWine] = useState(false);
    const [isEditingWine, setIsEditingWine] = useState<{ isEditing: boolean, idWine: string }>({ isEditing: false, idWine: '' });

    const [idDeleteLoading, setIdDeleteLoading] = useState('');

    const {
        data: wines,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetWinesQuery();

    const [deleteWine, response] = useDeleteWineMutation();

    useEffect(() => {
        if (isError && 'status' in error) {
            const errMsg = 'error' in error ? error.error : error.data
            store.dispatch(showSnackbar({ message: `Error: "${errMsg}"`, severity: Severity.ERROR }));
        }

    }, [error]);

    useEffect(() => {

        if (response.endpointName === 'deleteWine') {

            if (response.isSuccess) {
                store.dispatch(showSnackbar({ message: `Wine ${response.data.name} delete successfully`, severity: Severity.SUCCESS }));

            } else if (response.isError && 'status' in response.error) {
                const errMsg = 'error' in response.error ? response.error.error : response.error.data
                store.dispatch(showSnackbar({ message: `Error: "${errMsg}"`, severity: Severity.ERROR }));
            }

            setIdDeleteLoading('');
        }


    }, [response]);

    const onAddWineClick = () => {
        setIsAddingNewWine(true);
        setIsEditingWine({ isEditing: false, idWine: '' });
    }

    const onEditWineClick = (id: string) => {
        setIsAddingNewWine(false);
        setIsEditingWine({ isEditing: true, idWine: id });
    }

    const onDeleteWineClick = (id: string) => {
        setIdDeleteLoading(id);
        deleteWine(id);
    }

    const onCancelEditing = () => {
        setIsEditingWine({ isEditing: false, idWine: '' });
    }


    return (<>
        {isSuccess && <WinesTable rows={wines} onAddWineClick={onAddWineClick} onEditWineClick={onEditWineClick} onDeleteWineClick={onDeleteWineClick} idDeleteLoading={idDeleteLoading} />}
        {isLoading && <CircularProgress />}
        {isAddingNewWine && <AddingNewWine onCancelAddNewWine={() => setIsAddingNewWine(false)} />}
        {isEditingWine.isEditing && <EditingWine idEditingWine={isEditingWine.idWine} onCancel={onCancelEditing} />}
    </>)
}

export default Measurements;