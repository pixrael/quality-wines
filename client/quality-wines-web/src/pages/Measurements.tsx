import { Box } from "@mui/material";
import WinesTable from "../components/wines-table/WinesTable";

function Measurements() {
    return (<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
    >
        <WinesTable />
    </Box>)
}

export default Measurements;