import { FormEvent } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import Button from '../../../../UI/Button';

import '../_decorate.scss';
import Loader from '../../../Loader/Loader';
import useGetSpecificMovieArticle from '../../../hooks/react-query-hooks/movies/useGetSpecificMovieArticle';
import useUpdateMovie from '../../../hooks/react-query-hooks/movies/useUpdateMovie';


function Edit() {
    const { movieId } = useParams();
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
                    _ownerId: new Date().toString()
                }
            });
            history.push(`/movies/details/${movieId}`);
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="Create">
            <div className="CreateWrapper">
                <h2 className="FormTitle">EDIT MOVIE ARTICLE</h2>
                <form className="Form" onSubmit={onEditMovieArticleSubmitHandler}>
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
                        className="Form__btn"
                        textContent="EDIT"
                    />
                </form>
            </div>
        </section>
    )
}

export default Edit;
