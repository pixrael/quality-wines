import { Box } from "@mui/material";
import RegisterCard from "../components/register-card/RegisterCard";
function Register() {
    return (<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
    >
        <RegisterCard />
    </Box>)
}

export default Register;