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


    const { register, formState: { errors } } = useFormObj;

    const registerName = (typeof registerObj === 'string') ? registerObj : registerObj.name;

    const inputLabelDefaultParams = {};//add here any default params
    const inputLabelParams = { ...inputLabelDefaultParams, ...selectParams?.inputLabel };

    const selectDefaultParams = {
        label: label || capitalizeFirstLetter(registerName)

    };//add here any default params
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

    const onChange = (value: any) => { }

    return (
        <Box sx={{ minWidth: 120 }} className="select-form" >
            <FormControl fullWidth>
                <InputLabel {...inputLabelParams} id="select-qww-label" >{label || capitalizeFirstLetter(registerName)}</InputLabel>
                <Select
                    {...register(registerName, registerOptions)}
                    {...selectParamsCmp}
                    onChange={(v) => onChange(v.target.value)}
                    error={!!getMessageError(errors, registerName)}
                    labelId="select-qww-label"
                    id="select-qww"
                >
                    {options.map(option => <MenuItem key={option.value} value={option.value} {...menuItemParams}>{option.label}</MenuItem>)}

                </Select>
                <FormHelperText error>{getMessageError(errors, registerName)}</FormHelperText>
            </FormControl>
        </Box >
    );
}