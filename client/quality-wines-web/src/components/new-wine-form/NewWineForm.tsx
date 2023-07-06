import { CardContent, Box, InputAdornment } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import TextfieldQWW from "../textfield-qww/TextfieldQWW";
import SelectQWW from "../select-qww/SelectQWW";
import TextAreaQWW from "../text-area-qww/TextAreaQWW";

export interface NEW_WINE {
    _id: string;
    name: string;
    year: string;
    variety: string;
    type: string;
    color: string;
    temperature: number;
    graduation: number;
    ph: number;
    observations: string;
}


export const newWineFormValues: NEW_WINE = {
    _id: '',
    name: '',
    year: '',
    variety: '',
    type: '',
    color: '',
    temperature: 0,
    graduation: 0,
    ph: 0,
    observations: '',
}

function NewWineForm({ useFormObj }: { useFormObj: UseFormReturn<NEW_WINE, any, undefined> }) {

    const varietyOptions = [
        { label: 'Variety 1', value: 'variety1' },
        { label: 'Variety 2', value: 'variety2' },
        { label: 'Variety 3', value: 'variety3' },
    ];

    const typeOptions = [
        { label: 'type 1', value: 'type1' },
        { label: 'type 2', value: 'type2' },
        { label: 'type 3', value: 'type3' },
    ];


    return (<CardContent>
        <Box className="register-form-container" >
            <TextfieldQWW
                registerObj={{
                    name: "name",
                    registerOptions: {
                        required: true,
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
                            value: /^[1-9]\d{2,3}$/,
                            message: "lowest year 100 and max year 9999"
                        }
                    }
                }}
                useFormObj={useFormObj}
            />

            <SelectQWW
                registerObj='variety'
                useFormObj={useFormObj} options={varietyOptions} selectParams={
                    {
                        select: { defaultValue: varietyOptions[0].value },
                    }
                } />

            <SelectQWW
                registerObj='type'
                useFormObj={useFormObj} options={typeOptions} selectParams={
                    {
                        select: { defaultValue: typeOptions[0].value },
                    }
                } />

            <TextfieldQWW
                registerObj={{
                    name: "color",
                    registerOptions: {
                        required: true
                    }
                }}
                useFormObj={useFormObj}
            />

            <TextfieldQWW
                registerObj={{
                    name: "temperature",
                    registerOptions: {
                        required: true,
                        min: { value: 1, message: 'Min value is 1' },
                        max: { value: 100, message: 'Max value is 100 ' }
                    }
                }}
                useFormObj={useFormObj}
                textfieldParams={
                    {
                        input: 'number',
                        InputProps: {
                            endAdornment: <InputAdornment position="end">F°</InputAdornment>
                        }
                    }
                }
            />

            <TextfieldQWW
                registerObj={{
                    name: "graduation",
                    registerOptions: {
                        required: true,
                        min: { value: 0, message: 'Min value is 0' },
                        max: { value: 100, message: 'Max value is 100 ' }
                    }
                }}
                useFormObj={useFormObj}
                textfieldParams={
                    {
                        InputProps: {
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }
                    }
                }
            />

            <TextfieldQWW
                registerObj={{
                    name: "ph",
                    registerOptions: {
                        required: true,
                        min: { value: 1, message: 'Min value is 1' },
                        max: { value: 10, message: 'Max value is 10 ' }
                    }
                }}
                useFormObj={useFormObj}
                textfieldParams={
                    {
                        InputProps: {
                            endAdornment: <InputAdornment position="end">g/l</InputAdornment>
                        }
                    }
                }
            />
            <TextAreaQWW
                registerObj="observations"
                useFormObj={useFormObj}
                textareaParams={
                    {
                        minRows: 3,
                        ['aria-label']: 'observations',
                        placeholder: "Observations..."
                    }
                }
            />
        </Box>
    </CardContent>);
}

export default NewWineForm;