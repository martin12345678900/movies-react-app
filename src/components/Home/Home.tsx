// import { useState } from 'react';
import React, { useCallback } from 'react';

import MoviesForum from './MoviesForum/MoviesForum';
import MovieCard from '../MovieCard/MovieCard';

import classes from './Home.module.css';
import useGetMovieArticles from '../../hooks/react-query-hooks/movies/useMovieArticles';
import Loader from '../Loader/Loader';

const Home: React.FC<{ searchParam: string; }> = ({ searchParam }) => {
    const { data: movieArticles, isLoading } = useGetMovieArticles(searchParam);

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <MoviesForum />
            <section>
                <div>
                    <h1 className={classes.heading}>Movie Articles</h1>
                    <div className={classes.cardwrapper}>
                        {
                            movieArticles.map((movieArticle) =>
                                <MovieCard key={movieArticle._id} {...movieArticle} />)
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
