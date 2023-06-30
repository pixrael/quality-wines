import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LoginCard() {
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Add your email and password to login
                </Typography>
                <Box >
                    <TextField id="filled-basic" fullWidth label="Email" variant="outlined" />
                    <TextField id="filled-basic" fullWidth label="Password" variant="outlined" type="password" />
                </Box>
            </CardContent>

            <CardActions>
                <Button size="small" color="primary" >
                    Login
                </Button>
                <Button size="small" color="secondary" onClick={() => navigate('/register')}>
                    Register
                </Button>
            </CardActions>
        </Card>
    );
}

export default LoginCard;