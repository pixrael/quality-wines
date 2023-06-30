import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";


function RegisterCard() {
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Add email, username and password to register in the system
                </Typography>
                <Box >
                    <TextField id="filled-basic" fullWidth label="Email" variant="outlined" />
                    <TextField id="filled-basic" fullWidth label="Username" variant="outlined" />
                    <TextField id="filled-basic" fullWidth label="Password" variant="outlined" type="password" />
                    <TextField id="filled-basic" fullWidth label="Confirm password" variant="outlined" type="password" />

                </Box>
            </CardContent>

            <CardActions>
                <Button size="small" color="primary">
                    Send
                </Button>
                <Button size="small" color="primary" onClick={() => navigate('/')} >
                    Go back
                </Button>
            </CardActions>
        </Card>
    );
}

export default RegisterCard;