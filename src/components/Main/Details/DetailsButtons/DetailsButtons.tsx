import { useHistory, Link } from 'react-router-dom';
import React from 'react';

import { useAppSelector } from '../../../../store';

import './_detailsButtons.scss';
import { MovieArticle } from '../types';
import Button from '../../../../UI/Button';

import useGetLikes from '../../../hooks/react-query-hooks/likes/useGetLikes';
import useCreateLike from '../../../hooks/react-query-hooks/likes/useCreateLike';
import useDeleteMovie from '../../../hooks/react-query-hooks/movies/useDeleteMovie';
import Loader from '../../../Loader/Loader';
import useCreateCartItem from '../../../hooks/react-query-hooks/cart/useCreateCartItem';
import { useQueryClient } from 'react-query';
import { ReturnCartType } from '../../../../services/requests';
import useGetCart from '../../../hooks/react-query-hooks/cart/useGetCart';

type DetailsButtonsType = {
    movieArticle: MovieArticle,
}

const DetailsButtons: React.FC<DetailsButtonsType> = React.memo((props) => {
    const { userAuthState, isAuthenticated } = useAppSelector(state => state);

    const { data, isLoading } = useGetLikes(props.movieArticle._id);
    const { data: items } = useGetCart();

    const createLikeMutation = useCreateLike();
    const deleteMovieMutation = useDeleteMovie();
    const createCartItemMutation = useCreateCartItem();
    const history = useHistory();

    const selectedItem = items.find(item => item.title === props.movieArticle.title);

    const onAddToCartClickHandler = () => {
        createCartItemMutation.mutate({
            ...props.movieArticle,
            quantity: 1,
        });
    };

    if (!isAuthenticated) { return <></>; };

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="ButtonsWrapper">
            {
                userAuthState._id !== props.movieArticle._ownerId
                    ?
                    <div className="User">
                        {
                            data.length === 0 &&
                            <>
                                <Button
                                    type="button"
                                    className="User__like User__btn"
                                    textContent="Like &#128077;"
                                    onClickHandler={() => createLikeMutation.mutate(props.movieArticle._id)}
                                />
                            </>
                        }
                        {
                            !selectedItem && <Button
                                type="button"
                                className="User__add"
                                textContent="Add"
                                onClickHandler={onAddToCartClickHandler}
                            />
                        }
                    </div>
                    :
                    <div className="Owner">
                        <Button
                            type="button"
                            className="Owner__delete Owner__btn"
                            textContent="&#10060; Delete"
                            onClickHandler={() => {
                                deleteMovieMutation.mutate(props.movieArticle._id);
                                history.push('/');
                            }}
                        />
                        <Link
                            to={`/movies/edit/${props.movieArticle._id}`}
                            className="Owner__edit Owner__btn"
                        >
                            &#9997; Edit
                        </Link>
                    </div>
            }
        </div>
    );
});

export default DetailsButtons;
