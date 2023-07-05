import { useState } from "react";
import WinesTable from "../components/wines-table/WinesTable";
import AddingNewWine from "../components/adding-new-wine/AddingNewWine";
import EditingWine from "../components/editing-wine/EditingWine";

function Measurements() {
    const [isAddingNewWine, setIsAddingNewWine] = useState(false);
    const [isEditingWine, setIsEditingWine] = useState<{ isEditing: boolean, idWine: string }>({ isEditing: false, idWine: '' });

    const rowMock = [
        {
            "_id": "649d6fd83c97d82b3ba255a9",
            "name": "Wine50",
            "year": "1900",
            "variety": "variety3",
            "type": "type1",
            "color": "white",
            "temperature": 38,
            "graduation": 1,
            "ph": 50,
            "observations": "observation of this wine",
            "__v": 0
        },
        {
            "_id": "64a32c90b6bed6a2d5045479",
            "name": "Wine2",
            "year": "1970",
            "variety": "variety1",
            "type": "type1",
            "color": "black",
            "temperature": 38,
            "graduation": 1,
            "ph": 50,
            "observations": "observation of this wine2",
            "__v": 0
        }
    ];

    const onAddWineClick = () => {
        setIsAddingNewWine(true);
        setIsEditingWine({ isEditing: false, idWine: '' });
    }

    const onEditWineClick = (id: string) => {
        setIsAddingNewWine(false);
        setIsEditingWine({ isEditing: true, idWine: id });
    }

    return (<>
        <WinesTable rows={rowMock} onAddWineClick={onAddWineClick} onEditWineClick={onEditWineClick} />
        {isAddingNewWine && <AddingNewWine onCancelAddNewWine={() => setIsAddingNewWine(false)} />}
        {isEditingWine.isEditing && <EditingWine />}
    </>)
}

export default Measurements;