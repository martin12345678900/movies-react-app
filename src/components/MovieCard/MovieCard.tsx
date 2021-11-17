import { Link } from 'react-router-dom';
import React from 'react';

import { useAppSelector  } from '../../store/index';

import Image from '../../UI/Image';
import Button from '../../UI/Button';

import useCreateCartItem from '../../hooks/react-query-hooks/cart/useCreateCartItem';
import useGetCart from '../../hooks/react-query-hooks/cart/useGetCart';

import classes from './MovieCard.module.css';


type MovieCardProps = {
    title: string;
    price: number;
    _id: string;
    img: string;
    description: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ _id, img, price, title, description }) => {
    return (
        <div className={classes.cardwrapper}>
            <div className={classes.front}>
                <article>
                    <Image
                        className={classes.cardimg}
                        src={img}
                        alt="Movie Card"
                    />
                    <div className={classes.details}>
                        <h3 className={classes.cardtitle}>{title}</h3>
                        <p>{description.slice(0, 130)}...</p>
                    </div>
                </article>
            </div>
            <div className={classes.back}>
                <span className={classes.price}>{price}$</span>
                <div>
                    <Link to={`/movies/details/${_id}`} className={classes.detBtn}>Check Details</Link>
                </div>
            </div> 
        </div>
    );
};

export default MovieCard;