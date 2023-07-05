import { useEffect, useState } from "react";
import WinesTable from "../components/wines-table/WinesTable";
import AddingNewWine from "../components/adding-new-wine/AddingNewWine";
import EditingWine from "../components/editing-wine/EditingWine";
import { useGetWinesQuery } from "../store/api/wines-qww-api";
import { CircularProgress } from "@mui/material";
import store from "../store/store";
import { showSnackbar } from "../store/slices/overlay-slice";
import { Severity } from "../components/feedback-overlays-qww/snackbar-qww/SnackbarQWW";

function Measurements() {
    const [isAddingNewWine, setIsAddingNewWine] = useState(false);
    const [isEditingWine, setIsEditingWine] = useState<{ isEditing: boolean, idWine: string }>({ isEditing: false, idWine: '' });

    const {
        data: wines,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetWinesQuery();

    const onAddWineClick = () => {
        setIsAddingNewWine(true);
        setIsEditingWine({ isEditing: false, idWine: '' });
    }

    const onEditWineClick = (id: string) => {
        setIsAddingNewWine(false);
        setIsEditingWine({ isEditing: true, idWine: id });
    }

    useEffect(() => {
        if (isError && 'status' in error) {
            const errMsg = 'error' in error ? error.error : error.data
            store.dispatch(showSnackbar({ message: `Error: "${errMsg}"`, severity: Severity.ERROR }));
        }

    }, [error]);

    return (<>
        {isSuccess && <WinesTable rows={wines} onAddWineClick={onAddWineClick} onEditWineClick={onEditWineClick} />}
        {isLoading && <CircularProgress />}
        {isAddingNewWine && <AddingNewWine onCancelAddNewWine={() => setIsAddingNewWine(false)} />}
        {isEditingWine.isEditing && <EditingWine />}
    </>)
}

export default Measurements;