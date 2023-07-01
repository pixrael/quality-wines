import { TextField } from "@mui/material";
import { FieldErrors, FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";
import { capitalizeFirstLetter } from "../../utils/utils";

function TextfieldQWW({ registerObj, textfieldParams, useFormObj }: { registerObj: string | { name: string, registerOptions: RegisterOptions }, textfieldParams?: any, useFormObj: UseFormReturn<FieldValues, any, undefined> }) {
    const getMessageError = (errors: FieldErrors<FieldValues>, fieldName: string): string => {
        if (!errors || !errors[fieldName]) return '';
        return errors[fieldName]?.message as string;
    }
    const { register, formState: { errors }
    } = useFormObj;

    const registerName = (typeof registerObj === 'string') ? registerObj : registerObj.name;

    const defaultRegisterOptions = (typeof registerObj === 'string') ? {} : {
        required: registerObj.registerOptions.required === true ? 'This field is required' : registerObj.registerOptions.required
        
    };
    const registerOptions = (typeof registerObj === 'string') ? {} :
        {
            ...registerObj.registerOptions,
            ...defaultRegisterOptions,
        }


    const defaultTextfieldParams = {
        label: capitalizeFirstLetter(registerName),
        variant: 'outlined',
        fullWidth: true,
    }

    const textfParams = {
        ...defaultTextfieldParams,
        ...textfieldParams
    }

    return (
        <TextField  {...register(registerName, registerOptions)} error={!!errors?.email} helperText={getMessageError(errors, registerName)} className="textfield-form" {...textfParams} />
    );
}

export default TextfieldQWW;