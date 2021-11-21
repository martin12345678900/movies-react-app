import { useHistory, Link } from 'react-router-dom';
import React from 'react';

import { useAppSelector } from '../../../store';

import classes from './DetailsButtons.module.css';
import { MovieArticle } from '../types';
import Button from '../../../UI/Button';

import useGetLikes from '../../../hooks/react-query-hooks/likes/useGetLikes';
import useCreateLike from '../../../hooks/react-query-hooks/likes/useCreateLike';
import useDeleteMovie from '../../../hooks/react-query-hooks/movies/useDeleteMovie';
import Loader from '../../Loader/Loader';
import useCreateCartItem from '../../../hooks/react-query-hooks/cart/useCreateCartItem';

import useGetCart from '../../../hooks/react-query-hooks/cart/useGetCart';

import { AiFillDelete } from 'react-icons/ai';

type DetailsButtonsType = {
    movieArticle: MovieArticle,
}

const DetailsButtons: React.FC<DetailsButtonsType> = React.memo((props) => {
    const { userAuthState, isAuthenticated } = useAppSelector(state => state);

    const { data: likes, isLoading: isLikeLoading } = useGetLikes(props.movieArticle._id);
    const { data: items, isLoading: isCartLoading } = useGetCart();

    const createLikeMutation = useCreateLike();
    const deleteMovieMutation = useDeleteMovie();
    const createCartItemMutation = useCreateCartItem();

    const history = useHistory();

    if (!isAuthenticated) { return <></>; };

    if (isLikeLoading || isCartLoading) {
        return <Loader />
    }
    
    const selectedItem = items.find(item => item.title === props.movieArticle.title);

    const onAddToCartClickHandler = () => {
        createCartItemMutation.mutate({
            ...props.movieArticle,
            quantity: 1,
        });
    };

    return (
        <div className={classes.buttonsWrapper}>
            {
                userAuthState._id !== props.movieArticle._ownerId
                    ?
                    <div className={classes.user}>
                        {
                            likes.length === 0 &&
                            <>
                                <Button
                                    type="button"
                                    textContent="Like &#128077;"
                                    className={`${classes.userlike} ${classes.userbtn}`}
                                    onClick={() => createLikeMutation.mutate(props.movieArticle._id)}
                                />
                            </>
                        }
                        {
                            !selectedItem && <Button
                                type="button"
                                textContent="Add"
                                className={classes.useradd}
                                onClick={onAddToCartClickHandler}
                            />
                        }
                    </div>
                    :
                    <div className={classes.owner}>
                        <Button
                            type="button"
                            textContent="&#10060; Delete"
                            className={`${classes.ownerdelete} ${classes.ownerbtn}`}
                            onClick={() => {
                                deleteMovieMutation.mutate(props.movieArticle._id);
                                history.push('/');
                            }}
                        />
                        <Link
                            to={`/movies/edit/${props.movieArticle._id}`}
                            className={`${classes.owneredit} ${classes.ownerbtn}`}
                        >
                            &#9997; Edit
                        </Link>
                    </div>
            }
        </div>
    );
});

export default DetailsButtons;
