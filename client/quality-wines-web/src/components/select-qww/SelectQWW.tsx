import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import './SelectQWW.scss'
import { capitalizeFirstLetter } from '../../utils/utils';
import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

export interface SELECT_PARAMS {
    inputLabel?: any,
    select?: any,
    menuItem?: any
}

export default function SelectQWW<T extends FieldValues>({
    registerObj,
    selectParams,
    useFormObj,
    label,
    options
}: { registerObj: Path<T> | { name: Path<T>, registerOptions: RegisterOptions }; selectParams?: SELECT_PARAMS, useFormObj: UseFormReturn<T, any, undefined>; label?: string; options: { label: string, value: string }[] }) {

    const getMessageError = (errors: FieldErrors<FieldValues>, fieldName: string): string => {
        if (!errors || !errors[fieldName]) return '';
        return errors[fieldName]?.message as string;
    }


    const { register, formState: { errors }, getValues
    } = useFormObj;

    const [showError, setShowError] = useState(true);



    const registerName = (typeof registerObj === 'string') ? registerObj : registerObj.name;

    const inputLabelDefaultParams = {};//add here any default params
    const inputLabelParams = { ...inputLabelDefaultParams, ...selectParams?.inputLabel };

    const selectDefaultParams = {};//add here any default params
    const selectParamsCmp = { ...selectDefaultParams, ...selectParams?.select };

    const menuItemDefatultParams = {};//add here any default params
    const menuItemParams = { ...menuItemDefatultParams, ...selectParams?.menuItem };


    const defaultRegisterOptions = (typeof registerObj === 'string') ? {} : {
        required: registerObj.registerOptions.required === true ? 'This field is required' : registerObj.registerOptions.required

    };
    const registerOptions = (typeof registerObj === 'string') ? {} :
        {
            ...registerObj.registerOptions,
            ...defaultRegisterOptions,
        }

    const onChange = () => {
        setShowError(!(!!getValues()[registerName]))
    }

    return (
        <Box sx={{ minWidth: 120 }} className="select-form" >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={''}
                    label="Age"
                    onChange={() => { }}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel {...inputLabelParams} id="demo-simple-select-label" >{label || capitalizeFirstLetter(registerName)}</InputLabel>
                <Select
                    {...register(registerName, registerOptions)}
                    {...selectParamsCmp}
                    onChange={() => onChange()}
                    error={!!(errors && errors[registerName])}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                >
                    {options.map(option => <MenuItem key={option.value} value={option.value} {...menuItemParams}>{option.label}</MenuItem>)}

                </Select>
                {showError && <FormHelperText error>{getMessageError(errors, registerName)}</FormHelperText>}
            </FormControl>
        </Box >
    );
}