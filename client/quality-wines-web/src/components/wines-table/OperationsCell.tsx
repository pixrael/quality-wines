import { Button, CircularProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function OperationsCell({ id, onDelete, onEdit, showLoading = false }: { id: string; onDelete: (id: string) => void; onEdit: (id: string) => void; showLoading?: boolean }) {
    return (<>
        {showLoading && <CircularProgress />}
        {!showLoading && <>
            <Button onClick={() => onDelete(id)} ><DeleteIcon /></Button >
            <Button onClick={() => onEdit(id)}><EditIcon /></Button>
        </>}
    </>);
}

export default OperationsCell;