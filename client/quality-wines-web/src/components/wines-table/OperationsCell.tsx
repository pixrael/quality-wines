import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function OperationsCell({ id, onDelete, onEdit }: { id: string; onDelete: (id: string) => void; onEdit: (id: string) => void }) {
    return (<>
        <Button onClick={() => onDelete(id)} ><DeleteIcon /></Button >
        <Button onClick={() => onEdit(id)}><EditIcon /></Button>
    </>);
}

export default OperationsCell;