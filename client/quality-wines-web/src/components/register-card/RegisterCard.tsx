import { Card, CardContent, Typography, CardActions, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './RegisterCard.scss';
import TextfieldQWW from "../textfield-qww/TexfieldQWW";

function RegisterCard() {
    const navigate = useNavigate();
    const useFormObj = useForm({ mode: 'onChange', defaultValues: { username: '', email: '', password: '', confirmPassword: '' } });

    const onSubmit = (data: any) => {
        console.log(data);
    }

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

                <CardActions>
                    <Button size="small" color="primary" type="submit" >
                        Send
                    </Button>
                    <Button size="small" color="primary" onClick={() => navigate('/')} >
                        Go back
                    </Button>
                </CardActions>
            </form>
        </Card >
    );
}

export default RegisterCard;