import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { SchemaLike } from "yup/lib/types"


function useForm<T extends object>(initialState: T): [T, ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>, Function] {
    const [formData, setFormData] = useState<T>(initialState);

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setFormData((prevFormState): T => {
            return {
                ...prevFormState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onValidateSubmitHandler = async (schema: SchemaLike): Promise<T | string> => {
        try {
            return await schema.validate(formData);
        } catch (err) {
            return err.errors[0];
        }
    }

    return [
        formData,
        onInputChangeHandler,
        onValidateSubmitHandler,
    ]
}

export default useForm;