import { useHistory } from 'react-router';
import { useState } from 'react';

import useForm from '../../../hooks/useForm';
import { createValidationSchema } from '../../../../schema/createSchema';

import '../_decorate.scss';
import { FormEvent } from 'react';
import { DecorateType } from '../Decorate.types';
import Input from '../../../../UI/Input';
import Button from '../../../../UI/Button';

import useCreateMovie from '../../../hooks/react-query-hooks/movies/useCreateMovie';

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
        <section className="Create">
            <div className="CreateWrapper">
                <h2 className="FormTitle">CREATE MOVIE ARTICLE</h2>
                <form className="Form" onSubmit={onCreateSubmitHandler}>
                    {error && <div className="error">{error}</div>}
                    <Input
                        className="Form__title"
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
                        className="Form__image"
                        type="text"
                        placeholder="ENTER MOVIE IMAGE URL"
                        onChange={onInputChangeHandler}
                        value={createFormData.img}
                        name="img"
                    />
                    <Input
                        className="Form__price"
                        type="number"
                        placeholder="ENTER MOVIE PRICE"
                        onChange={onInputChangeHandler}
                        value={createFormData.price}
                        name="price"
                    />
                    <Button
                        type="submit"
                        className="Form__btn"
                        textContent="CREATE"
                    />
                </form>
            </div>
        </section>
    );
}

export default Create;
