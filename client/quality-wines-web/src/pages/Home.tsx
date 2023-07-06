import { Box } from "@mui/material";
import HomeCard from "../components/home-card/HomeCard";
function Home() {
    return (<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
    >
        <HomeCard />
    </Box>)
}

export default Home;