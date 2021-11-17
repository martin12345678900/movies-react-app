// import { useState } from 'react';
import React from 'react';
import { ImSad } from 'react-icons/im';

import MoviesForum from './MoviesForum/MoviesForum';
import MovieCard from '../MovieCard/MovieCard';

import classes from './Home.module.css';
import useGetMovieArticles from '../../hooks/react-query-hooks/movies/useMovieArticles';
import Loader from '../Loader/Loader';
import { filter } from '../../utilities/filter';

const Home: React.FC<{ searchParam: string; }> = ({ searchParam }) => {
    const { data: movieArticles, isLoading } = useGetMovieArticles();

    if (isLoading) {
        return <Loader />
    }

    const filtered = filter(movieArticles, searchParam);

    return (
        <>
            <MoviesForum />
            <section>
                <div>
                    <h1 className={classes.heading}>Movie Articles</h1>
                    <div className={classes.cardwrapper}>
                        {
                            filtered.map((movieArticle) =>
                                <MovieCard key={movieArticle._id} {...movieArticle} />)
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
