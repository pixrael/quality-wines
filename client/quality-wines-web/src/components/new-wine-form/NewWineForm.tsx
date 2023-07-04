import { CardContent, Typography, CardActions, Button, Box, LinearProgress, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
/* import './RegisterCard.scss'; */
import TextfieldQWW from "../textfield-qww/TextfieldQWW";
import { useRegisterUserMutation } from "../../store/api/wines-qww-api";
import { useEffect, useState } from "react";
import { showSnackbar } from "../../store/slices/overlay-slice";
import store from "../../store/store";
import { Severity } from "../feedback-overlays-qww/snackbar-qww/SnackbarQWW";
import SelectQWW from "../select-qww/SelectQWW";

interface NEW_WINE {
    name: string;
    year: number;
    variety: string;
    type: string;
    color: string;
    temperature: number;
    graduation: number;
    ph: string;
    observations: string;
}


const newWineFormValues: NEW_WINE = {
    name: '',
    year: 99,
    variety: 'variety1',
    type: '',
    color: '',
    temperature: 0,
    graduation: 0,
    ph: '',
    observations: '',
}

function NewWineForm({ onCancel }: { onCancel: () => void }) {
    const navigate = useNavigate();
    const [registerUser, response] = useRegisterUserMutation()
    const useFormObj = useForm({ mode: 'onChange', defaultValues: newWineFormValues });

    const [showLoading, setShowLoading] = useState(false);

    const onSubmit = (data: NEW_WINE) => {
        //registerUser(data);
        console.log('data ', data);
        //addNewWine
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

    const varietyOptions = [
        { label: 'Variety 1', value: 'variety1' },
        { label: 'Variety 2', value: 'variety2' },
        { label: 'Variety 3', value: 'variety3' },
    ];

    return (
        <form onSubmit={useFormObj.handleSubmit(onSubmit)}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Add wine properties
                </Typography>
                <Box className="register-form-container" >
                    <TextfieldQWW
                        registerObj={{
                            name: "name",
                            registerOptions: {
                                required: true,
                                pattern: {
                                    value: /^[a-zA-Z][a-zA-Z0-9]*$/,
                                    message: "should start with a letter and the rest could be alphanumeric"
                                }
                            }
                        }}
                        useFormObj={useFormObj}
                        textfieldParams={{ label: 'Name of the wine' }}
                    />

                    <TextfieldQWW
                        registerObj={{
                            name: "year",
                            registerOptions: {
                                required: true,
                                pattern: {
                                    value: /^(9\d{2}|[1-9]\d{3})$/,
                                    message: "lowest year 99 and max year 9999"
                                }
                            }
                        }}
                        useFormObj={useFormObj}
                    />
                    <SelectQWW registerObj={{
                        name: 'variety',
                        registerOptions: {
                            required: true
                        }
                    }}


                        useFormObj={useFormObj} options={varietyOptions} selectParams={
                            {
                                select: { defaultValue: '' },
                            }
                        } />

                    

                </Box>
            </CardContent>
            <Divider />
            {showLoading && <LinearProgress />}
            <CardActions >

                <Button size="small" color="primary" type="submit" >
                    Add wine
                </Button>
                <Button size="small" color="primary" onClick={onCancel} >
                    Cancel
                </Button>
            </CardActions>
        </form>
    );
}

export default NewWineForm;