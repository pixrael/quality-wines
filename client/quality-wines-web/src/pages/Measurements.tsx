import WinesTable from "../components/wines-table/WinesTable";

function Measurements() {

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


    return (<WinesTable rows={rowMock} />)
}

export default Measurements;