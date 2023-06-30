import { Box, Container, Grid } from "@mui/material";
import LoginCard from "../components/login-card/LoginCard";
function Login() {
    return (<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
    >
        <LoginCard />
    </Box>)
}

export default Login;