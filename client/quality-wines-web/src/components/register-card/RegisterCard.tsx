import { Card, CardContent, Typography, CardActions, Button, Box, LinearProgress, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './RegisterCard.scss';
import TextfieldQWW from "../textfield-qww/TextfieldQWW";
import { useRegisterUserMutation } from "../../store/api/wines-qww-api";
import { useEffect, useState } from "react";
import { showSnackbar } from "../../store/slices/overlay-slice";
import store from "../../store/store";
import { Severity } from "../feedback-overlays-qww/snackbar-qww/SnackbarQWW";

function RegisterCard() {
    const navigate = useNavigate();
    const [registerUser, response] = useRegisterUserMutation()
    const useFormObj = useForm({ mode: 'onChange', defaultValues: { username: '', email: '', password: '', confirmPassword: '' } });

    const [showLoading, setShowLoading] = useState(false);

    const onSubmit = (data: { email: string; password: string; confirmPassword: string; username: string }) => {
        registerUser(data);
    }

    useEffect(() => {

        if (response.endpointName === 'registerUser') {
            setShowLoading(response.isLoading);

            if (response.isSuccess) {
                store.dispatch(showSnackbar({ message: `User ${response.data.username} register successfully`, severity: Severity.SUCCESS }));
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
                        Add email, username and password to register in the system
                    </Typography>
                    <Box className="register-form-container" >
                        <TextfieldQWW
                            registerObj={{
                                name: "username",
                                registerOptions: { required: true }
                            }}
                            useFormObj={useFormObj}
                        />

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

                        <TextfieldQWW
                            registerObj={{
                                name: "confirmPassword",
                                registerOptions: {
                                    required: true,
                                    validate: (val: string) => {
                                        if (useFormObj.watch('password') != val) {
                                            return "Your passwords do no matchss";
                                        }
                                    }
                                }
                            }}
                            textfieldParams={{
                                label: 'Confirm password',
                                type: 'password'
                            }}
                            useFormObj={useFormObj}
                        />

                    </Box>
                </CardContent>
                <Divider />
                {showLoading && <LinearProgress />}
                <CardActions >

                    <Button size="small" color="primary" type="submit" >
                        Send
                    </Button>
                    <Button size="small" color="primary" onClick={() => navigate('/')} >
                                            Cancel
                    </Button>
                </CardActions>
            </form>
        </Card >
    );
}

export default RegisterCard;