import { Card, CardContent, Typography, CardActions, Button, Box, Divider, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextfieldQWW from "../textfield-qww/TextfieldQWW";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "../../store/api/wines-qww-api";
import store from "../../store/store";
import { showSnackbar } from "../../store/slices/overlay-slice";
import { Severity } from "../feedback-overlays-qww/snackbar-qww/SnackbarQWW";
import useLoginSession from "../../hooks/useLoginSession";


function LoginCard() {
    const navigate = useNavigate();

    const [setSession] = useLoginSession();

    const useFormObj = useForm({ mode: 'onChange', defaultValues: { email: '', password: '' } });

    const [showLoading, setShowLoading] = useState(false);

    const onSubmit = (data: { email: string; password: string; }) => {
        loginUser(data);
    }

    const [loginUser, response] = useLoginUserMutation();

    useEffect(() => {

        if (response.endpointName === 'loginUser') {
            setShowLoading(response.isLoading);

            if (response.isSuccess) {
                store.dispatch(showSnackbar({ message: `User ${response.data.username} logged successfully`, severity: Severity.SUCCESS }));
                console.log('response loggin ', response);
                setSession(response.data.authentication.sessionToken);
                setTimeout(() => console.log('redirecting...'),3000)
                navigate('/measurements');

            } else if (response.isError && 'status' in response.error) {
                const errMsg = 'error' in response.error ? response.error.error : response.error.data
                store.dispatch(showSnackbar({ message: `Error: "${errMsg}"`, severity: Severity.ERROR }));
            }
        }


    }, [response]);

    return (
        <Card sx={{ maxWidth: 345 }}>
            <form onSubmit={useFormObj.handleSubmit(onSubmit)}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Add your email and password to login
                    </Typography>
                    <Box >
                        <TextfieldQWW
                            registerObj={{
                                name: "email",
                                registerOptions: {
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "invalid email address"
                                    }
                                }
                            }}
                            useFormObj={useFormObj}
                        />

                        <TextfieldQWW
                            registerObj={{
                                name: "password",
                                registerOptions: {
                                    required: true
                                }
                            }}
                            textfieldParams={{
                                type: 'password'
                            }}
                            useFormObj={useFormObj}
                        />
                    </Box>
                </CardContent>
                <Divider />
                {showLoading && <LinearProgress />}
                <CardActions>
                    <Button size="small" color="primary" type="submit">
                        Login
                    </Button>
                    <Button size="small" color="secondary" onClick={() => navigate('/registry')}>
                        Register
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
}

export default LoginCard;