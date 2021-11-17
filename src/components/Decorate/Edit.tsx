import { FormEvent } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import Button from '../../UI/Button';


import Loader from '../Loader/Loader';
import useGetSpecificMovieArticle from '../../hooks/react-query-hooks/movies/useGetSpecificMovieArticle';
import useUpdateMovie from '../../hooks/react-query-hooks/movies/useUpdateMovie';
import Form from '../../UI/Form';


function Edit() {
    const { movieId }: { movieId: string; } = useParams();
    const history = useHistory();

    const { data, isLoading } = useGetSpecificMovieArticle(movieId);
    const mutation = useUpdateMovie();

    const onEditMovieArticleSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (event.target) {
            const { title, description, img, price } = event.target as any;

            //console.log({ title: title.value, description: description.value, img: img.value, price: price.value })
            mutation.mutate({
                movieId,
                updatedMovieArticle: {
                    title: title.value,
                    description: description.value,
                    price: price.value,
                    img: img.value,
                    _id: movieId,
                    _ownerId: Math.random().toString()
                }
            });
            history.push(`/movies/details/${movieId}`);
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <Form formTitle="Edit Movie Article" onSubmitHandler={onEditMovieArticleSubmitHandler}>
            <input
                className="Form__title"
                type="text"
                name="title"
                placeholder="ENTER MOVIE TITLE"
                defaultValue={data.title}
            />
            <textarea className="Form__description"
                name="description"
                placeholder="ENTER MOVIE DESCRIPTION"
                defaultValue={data.description}
            >
            </textarea>
            <input
                className="Form__image"
                type="text"
                name="img"
                placeholder="ENTER MOVIE IMAGE URL"
                defaultValue={data.img}
            />
            <input
                className="Form__price"
                type="number"
                name="price"
                placeholder="ENTER MOVIE PRICE"
                defaultValue={data.price}
            />
            <Button
                type="submit"
                textContent="EDIT"
            />
        </Form>
    )
}

export default Edit;
