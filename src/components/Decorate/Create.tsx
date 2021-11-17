import { useHistory } from 'react-router';
import { useState, FormEvent } from 'react';

import useForm from '../../hooks/useForm';
import { createValidationSchema } from '../../schema/createSchema';

import { DecorateType } from './Decorate.types';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

import useCreateMovie from '../../hooks/react-query-hooks/movies/useCreateMovie';
import Form from '../../UI/Form';

function Create() {
    const [createFormData, onInputChangeHandler, onCreateSchemaValidate] = useForm<DecorateType>({} as DecorateType);
    const [error, setError] = useState<string | null>(null);

    const mutation = useCreateMovie();

    const history = useHistory();

    const onCreateSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const result: typeof createFormData | string = await onCreateSchemaValidate(createValidationSchema);

        if (typeof result !== 'object') {
            setError(error);
        } else {
            const { title, description, price, img } = result;

            mutation.mutate({
                title,
                description,
                price,
                img
            });
            history.push('/');
        }
    }

    return (
        <Form formTitle="Create Movie Article" onSubmitHandler={onCreateSubmitHandler}>
            {error && <div className="error">{error}</div>}
            <Input
                type="text"
                placeholder="ENTER MOVIE TITLE"
                onChange={onInputChangeHandler}
                value={createFormData.title}
                name="title"
            />
            <textarea className="Form__description"
                name="description"
                placeholder="ENTER MOVIE DESCRIPTION"
                onChange={onInputChangeHandler}
                value={createFormData.description}
            >
            </textarea>
            <Input
                type="text"
                placeholder="ENTER MOVIE IMAGE URL"
                onChange={onInputChangeHandler}
                value={createFormData.img}
                name="img"
            />
            <Input
                type="number"
                placeholder="ENTER MOVIE PRICE"
                onChange={onInputChangeHandler}
                value={createFormData.price}
                name="price"
            />
            <Button
                type="submit"
                textContent="CREATE"
            />
        </Form>
    );
}

export default Create;
