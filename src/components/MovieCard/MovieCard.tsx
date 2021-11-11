import { Link } from 'react-router-dom';
import React from 'react';

import { useAppSelector, useAuthDetails } from '../../store/index';

import Image from '../../UI/Image';
import Button from '../../UI/Button';

import './_movieCard.scss';
import useCreateCartItem from '../hooks/react-query-hooks/cart/useCreateCartItem';
import { QueryClient, useQueryClient } from 'react-query';
import { CartType, ReturnCartType } from '../../services/requests';
import useGetCart from '../hooks/react-query-hooks/cart/useGetCart';
import Loader from '../Loader/Loader';

type MovieCardProps = {
    title: string;
    price: number;
    _id: string;
    img: string;
    description: string;
}


const MovieCard: React.FC<MovieCardProps> = ({ _id, img, price, title, description }) => {
    const mutation = useCreateCartItem();
    
    const { data: items } = useGetCart();
    const selectedItem = items?.find(item => item.title === title);
    

    const isAuthenticated = useAppSelector(state => state.isAuthenticated);

    const onAddToCart = () => {
        mutation.mutate({
            title,
            price,
            description,
            img,
            quantity: 1,
        });
    }

    return (
        <div className="CardWrapper">
            <div className="Card Front">
                <article>
                    <Image
                        className="CardImage"
                        imageSrc={img}
                        alt="Movie Card"
                    />
                    <h3 className="CardTitle">{title}</h3>
                </article>
                <article className="card-footer">
                    <Link to={`/movies/details/${_id}`} className="CardButton">Details</Link>
                </article>
            </div>
            <div className="Card Back">
                <span className="Back__price">{price}$</span>
                <div className="Back__buttons">
                    {isAuthenticated && !selectedItem && <Button
                        type="button"
                        className={`${(!isAuthenticated || selectedItem) && 'Back__detBtn--incorrect'} Back__cartBtn`}
                        textContent="Add To Cart"
                        onClickHandler={onAddToCart}
                    />
                    }
                    <Link to={`/movies/details/${_id}`} className={`${!isAuthenticated && 'Back__detBtn--incorrect'} Back__detBtn`}>Check Details</Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;